// Executed inside the installed web-check container. Source is mounted read-only; no credentials or
// network are available. Framework projects must include their build dependencies in vendor/node_modules.
import { cp, readFile, access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { resolve, extname } from "node:path";
import { pathToFileURL } from "node:url";

const checks = [];
const work = "/tmp/project";
const exists = async (path) => access(path).then(() => true, () => false);
const record = (name, passed, output, started = Date.now()) => checks.push({ name, passed, exitCode: passed ? 0 : 1, durationMs: Date.now() - started, output: output.slice(-16000) });
let server, browser;
try {
  await cp("/source", work, { recursive: true, filter: (path) => !path.split("/").includes(".git") });
  if (await exists(`${work}/package.json`)) {
    const manifest = JSON.parse(await readFile(`${work}/package.json`, "utf8"));
    if (manifest.scripts?.build) {
      if (await exists(`${work}/vendor/node_modules`)) await cp(`${work}/vendor/node_modules`, `${work}/node_modules`, { recursive: true });
      const started = Date.now();
      const build = spawn("npm", ["run", "build"], { cwd: work, env: { ...process.env, HOME: "/tmp", CI: "1" }, stdio: ["ignore", "pipe", "pipe"] });
      let output = "";
      const capture = (chunk) => { output = (output + chunk).slice(-16000); };
      build.stdout.on("data", capture); build.stderr.on("data", capture);
      const timer = setTimeout(() => build.kill("SIGKILL"), 180_000);
      const code = await new Promise((done) => { build.on("error", () => done(127)); build.on("close", done); });
      clearTimeout(timer);
      record("build", code === 0, output, started);
      if (code !== 0) throw new Error("website build failed");
    }
  }
  const roots = ["dist", "out", "public", ""].map((path) => resolve(work, path));
  let root;
  for (const candidate of roots) if (await exists(`${candidate}/index.html`)) { root = candidate; break; }
  if (!root) throw new Error("web@1 requires a static export containing index.html in dist/, out/, public/, or the root");
  const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".json": "application/json" };
  server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://127.0.0.1");
      const file = resolve(root, "." + decodeURIComponent(url.pathname), url.pathname.endsWith("/") ? "index.html" : "");
      if (!file.startsWith(root + "/")) { res.writeHead(403).end(); return; }
      const data = await readFile(file); res.setHeader("content-type", mime[extname(file)] ?? "application/octet-stream"); res.end(data);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise((done) => server.listen(4173, "127.0.0.1", done));
  const { chromium } = await import(pathToFileURL(process.env.IMD_PLAYWRIGHT).href);
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("requestfailed", (request) => errors.push(`resource failed: ${request.url()}`));
  page.on("response", (response) => { if (response.url().startsWith("http://127.0.0.1:4173/") && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.route("**/*", (route) => new URL(route.request().url()).origin === "http://127.0.0.1:4173" ? route.continue() : route.abort());
  const response = await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle", timeout: 20_000 });
  record("page", response?.ok() === true && (await page.locator("body").innerText()).trim().length > 0, "entry page renders nonempty content");
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const fits = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
    record(`viewport-${width}`, fits, fits ? "no horizontal overflow" : "content overflows the viewport");
  }
  // Optional data-only behavior checks: no repository-authored Playwright code runs in the checker.
  const specPath = `${work}/web.checks.json`;
  if (await exists(specPath)) {
    const spec = JSON.parse(await readFile(specPath, "utf8"));
    if (!Array.isArray(spec) || spec.length > 8) throw new Error("web.checks.json must contain at most eight checks");
    for (const [index, step] of spec.entries()) {
      if (typeof step.selector !== "string" || step.selector.length > 512) throw new Error("invalid selector");
      if (step.action === "click") await page.locator(step.selector).click({ timeout: 5000 });
      else if (step.action === "fill" && typeof step.value === "string") await page.locator(step.selector).fill(step.value, { timeout: 5000 });
      else if (step.action === "visible") { if (!(await page.locator(step.selector).isVisible())) throw new Error(`check ${index} is not visible`); }
      else throw new Error("unsupported web check action");
      if (step.visible !== undefined && (typeof step.visible !== "string" || !(await page.locator(step.visible).isVisible()))) throw new Error(`check ${index}: expected result is not visible`);
      record(`interaction-${index}`, true, `${step.action} ${step.selector}`);
    }
  }
  record("browser-errors", errors.length === 0, errors.join("\n") || "no JavaScript errors or missing local resources");
} catch (error) { record("web", false, String(error)); }
finally { await browser?.close(); if (server) await new Promise((done) => server.close(done)); }
process.stdout.write(JSON.stringify({ checks }));
