/*
 * Rift API playground.
 *
 * Key handling rules (do not weaken):
 *  - API keys and tokens live only in the two password <input> elements. They are read
 *    at send time into local variables and never assigned to any other variable that
 *    outlives the request, to storage, to the URL, to the console or to the DOM
 *    (except the masked input itself).
 *  - No localStorage / sessionStorage / IndexedDB / cookies are used by this file.
 *  - The only network destinations are the two fixed base URLs below (also enforced by
 *    the page's Content-Security-Policy connect-src) plus same-origin spec.json.
 *  - Generated cURL uses the placeholders $RIFT_API_KEY and $RIFT_TOKEN, never the value.
 *  - Anything echoed back in a response that equals the key or token is redacted.
 */
(function () {
  "use strict";

  var BASES = {
    sandbox: "https://sandbox.riftfi.com",
    production: "https://api.riftfi.com"
  };
  /**
   * The three audiences, in the order someone meets them. Mirrors the
   * reference at /docs/api/ so a reader moving between the two sees the same
   * structure and the same words.
   */
  var TIER_LABEL = {
    "public": "1. Public",
    "own-wallet": "2. Your own wallets",
    "rift-wallet": "3. Rift wallets",
    // Pre-tier specs called them this; kept so an old spec.json still renders.
    "core": "3. Rift wallets",
    "platform": "2. Your own wallets"
  };
  var TIER_RANK = { "1. Public": 1, "2. Your own wallets": 2, "3. Rift wallets": 3 };

  var env = "sandbox"; // sandbox is always the default
  var ops = [];
  var cur = null;

  var $ = function (id) { return document.getElementById(id); };
  var el = function (tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  var AUTH_LABEL = {
    none: "No authentication required",
    customer: "Customer access token (Authorization: Bearer)",
    key: "Project API key (X-API-Key)",
    owner: "Project owner's dashboard session (Authorization: Bearer). Not a psk_ key and not an end-user token — these routes refuse both, so that a platform key can never mint another.",
    "customer+key": "Customer access token, with the project API key",
    platform: "Platform secret key (psk_...) in X-API-Key. Server-side only",
    admin: "Rift internal"
  };

  /* ---------- environment ---------- */
  function setEnv(e) {
    env = e;
    $("env-sandbox").classList.toggle("on", e === "sandbox");
    $("env-prod").classList.toggle("on", e === "production");
    $("env-sandbox").setAttribute("aria-checked", String(e === "sandbox"));
    $("env-prod").setAttribute("aria-checked", String(e === "production"));
    $("base").textContent = BASES[e];
    $("prod-warn").hidden = e !== "production";
    refreshOp();
  }

  /* ---------- list ---------- */
  function buildList(filter) {
    var list = $("list");
    list.textContent = "";
    var f = (filter || "").toLowerCase().trim();
    var groups = {};
    ops.forEach(function (o, i) {
      if (o.auth === "admin") return;
      var hay = (o.method + " " + o.path + " " + o.summary + " " + o.tag).toLowerCase();
      if (f && hay.indexOf(f) === -1) return;
      var g = TIER_LABEL[o.tier || o.group] + " · " + o.tag;
      (groups[g] = groups[g] || []).push(i);
    });
    // Audience order, not alphabetical: public, your own wallets, Rift
    // wallets. Sorting by name would interleave the three tiers and lose the
    // one distinction the reader actually navigates by.
    Object.keys(groups).sort(function (a, b) {
      var ra = TIER_RANK[a.split(" · ")[0]] || 9;
      var rb = TIER_RANK[b.split(" · ")[0]] || 9;
      return ra !== rb ? ra - rb : a.localeCompare(b);
    }).forEach(function (g) {
      list.appendChild(el("div", "g", g));
      groups[g].forEach(function (i) {
        var o = ops[i];
        var b = el("button", "item");
        b.type = "button";
        b.setAttribute("role", "listitem");
        b.appendChild(el("span", "m " + o.method, o.method));
        b.appendChild(el("span", "p", o.path));
        b.title = o.summary;
        b.addEventListener("click", function () { select(i); });
        b.dataset.i = String(i);
        list.appendChild(b);
      });
    });
  }

  function select(i) {
    cur = ops[i];
    Array.prototype.forEach.call(document.querySelectorAll(".item"), function (n) {
      n.classList.toggle("sel", n.dataset.i === String(i));
    });
    $("op-empty").hidden = true;
    $("op").hidden = false;
    var m = $("op-method");
    m.textContent = cur.method;
    m.className = "m " + cur.method;
    $("op-path").textContent = cur.path;
    $("op-summary").textContent = cur.summary;
    $("op-auth").textContent = AUTH_LABEL[cur.auth] || cur.auth;
    $("op-desc").textContent = cur.description || "";
    $("op-desc-wrap").hidden = !cur.description;
    $("op-ref").href = cur.ref;

    var pg = $("params");
    pg.textContent = "";
    if (cur.params.length) {
      var grid = el("div", "pgrid");
      cur.params.forEach(function (p, idx) {
        var l = document.createElement("label");
        var s = el("span", null, p.name + " (" + p.in + ") ");
        if (p.required) s.appendChild(el("em", null, "required"));
        l.appendChild(s);
        var inp = document.createElement("input");
        inp.type = "text";
        inp.autocomplete = "off";
        inp.spellcheck = false;
        inp.dataset.idx = String(idx);
        inp.placeholder = p.description || (p.enum ? p.enum.join(" | ") : "");
        if (p.example !== undefined && p.example !== null) inp.value = String(p.example);
        inp.addEventListener("input", renderCurl);
        l.appendChild(inp);
        grid.appendChild(l);
      });
      pg.appendChild(grid);
    }

    var hasBody = cur.method !== "GET" && cur.method !== "DELETE" && cur.body !== undefined;
    $("body-wrap").hidden = !hasBody;
    $("body").value = hasBody ? JSON.stringify(cur.body, null, 2) : "";
    $("resp-panel").hidden = true;
    $("status").textContent = "";
    $("status").className = "status";
    refreshOp();
    $("op-panel").scrollIntoView({ block: "nearest" });
  }

  function mutating() { return cur && cur.method !== "GET"; }

  function refreshOp() {
    if (!cur) return;
    var need = env === "production" && mutating();
    $("confirm-wrap").hidden = !need;
    if (!need) $("confirm").checked = false;
    renderCurl();
  }

  /* ---------- request building ---------- */
  function buildUrl() {
    var path = cur.path;
    var q = [];
    var missing = [];
    Array.prototype.forEach.call($("params").querySelectorAll("input"), function (inp) {
      var p = cur.params[Number(inp.dataset.idx)];
      var v = inp.value.trim();
      if (!v) { if (p.required) missing.push(p.name); return; }
      if (p.in === "path") path = path.replace("{" + p.name + "}", encodeURIComponent(v));
      else q.push(encodeURIComponent(p.name) + "=" + encodeURIComponent(v));
    });
    if (/\{[^}]+\}/.test(path)) {
      (path.match(/\{[^}]+\}/g) || []).forEach(function (m) { missing.push(m.slice(1, -1)); });
    }
    return { url: BASES[env] + path + (q.length ? "?" + q.join("&") : ""), missing: missing };
  }

  function bodyText() {
    if ($("body-wrap").hidden) return null;
    var t = $("body").value.trim();
    return t ? t : null;
  }

  function renderCurl() {
    if (!cur) return;
    var u = buildUrl();
    var lines = ["curl -X " + cur.method + " '" + u.url + "'"];
    lines.push("  -H 'X-Rift-Mode: " + env + "'");
    if (cur.auth !== "none") lines.push("  -H \"X-API-Key: $RIFT_API_KEY\"");
    if (cur.auth === "customer" || cur.auth === "customer+key" || cur.auth === "owner") lines.push("  -H \"Authorization: Bearer $RIFT_TOKEN\"");
    var b = bodyText();
    if (b != null) {
      lines.push("  -H 'Content-Type: application/json'");
      lines.push("  -d '" + b.replace(/'/g, "'\\''").replace(/\s*\n\s*/g, " ") + "'");
    }
    $("curl").textContent = lines.join(" \\\n");
  }

  function redact(text, secrets) {
    secrets.forEach(function (s) {
      if (s && s.length >= 6) text = text.split(s).join("[redacted]");
    });
    return text;
  }

  function setStatus(msg, cls) {
    var s = $("status");
    s.textContent = msg;
    s.className = "status " + (cls || "");
  }

  /* ---------- send ---------- */
  function send() {
    if (!cur) return;
    var u = buildUrl();
    if (u.missing.length) { setStatus("Missing: " + u.missing.join(", "), "err"); return; }
    if (env === "production" && mutating() && !$("confirm").checked) {
      setStatus("Tick the production confirmation to send this request.", "err");
      return;
    }

    var key = $("key").value.trim();
    var token = $("token").value.trim();
    var headers = { "X-Rift-Mode": env, Accept: "application/json" };
    if (cur.auth !== "none") {
      if (!key) { setStatus("Enter an API key above first.", "err"); return; }
      if (/\s/.test(key) || /[^\x21-\x7e]/.test(key)) { setStatus("That key contains characters an API key never has.", "err"); return; }
      headers["X-API-Key"] = key;
    }
    if (token && (cur.auth === "customer" || cur.auth === "customer+key" || cur.auth === "owner")) {
      if (/[^\x21-\x7e]/.test(token)) { setStatus("The token contains invalid characters.", "err"); return; }
      headers["Authorization"] = "Bearer " + token;
    }
    var init = {
      method: cur.method,
      headers: headers,
      cache: "no-store",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      redirect: "error"
    };
    var b = bodyText();
    if (b != null) {
      try { JSON.parse(b); } catch (e) { setStatus("Body is not valid JSON.", "err"); return; }
      headers["Content-Type"] = "application/json";
      init.body = b;
    }
    var ctl = new AbortController();
    init.signal = ctl.signal;
    var timer = setTimeout(function () { ctl.abort(); }, 30000);

    $("send").disabled = true;
    setStatus("Sending...", "");
    var t0 = performance.now();
    var secrets = [key, token];

    fetch(u.url, init).then(function (res) {
      return res.text().then(function (txt) { return { res: res, txt: txt }; });
    }).then(function (r) {
      var ms = Math.round(performance.now() - t0);
      var res = r.res;
      var shown = r.txt;
      try { shown = JSON.stringify(JSON.parse(r.txt), null, 2); } catch (e) { /* not JSON */ }
      shown = redact(shown, secrets);
      var hdrs = [];
      res.headers.forEach(function (v, k) { hdrs.push(k + ": " + v); });
      $("resp-panel").hidden = false;
      $("resp-meta").textContent = res.status + " " + (res.statusText || "") + "  -  " + ms + " ms  -  " + BASES[env] +
        (res.headers.get("x-request-id") ? "  -  request id " + res.headers.get("x-request-id") : "");
      $("resp-headers").textContent = redact(hdrs.join("\n"), secrets) || "(no readable headers)";
      $("resp-body").textContent = shown || "(empty body)";
      setStatus(res.ok ? "OK" : "HTTP " + res.status, res.ok ? "ok" : "err");
      if (res.status === 402) {
        $("resp-meta").textContent += "  -  subscription required for this environment";
      }
    }).catch(function (e) {
      $("resp-panel").hidden = false;
      $("resp-meta").textContent = "Request did not complete";
      $("resp-headers").textContent = "";
      $("resp-body").textContent = (e && e.name === "AbortError")
        ? "Timed out after 30 s."
        : "The request did not reach the API from this page. Origin: " + location.origin + "  Target: " + BASES[env] + ". " + (location.hostname === "riftfi.com" ? "This page is on the apex domain; open https://www.riftfi.com" + location.pathname + " instead - that origin is allowed by the API." : "This is a network or CORS failure, not an API error: the API never saw the request, so there is no status code to show. The cURL command above has no origin and will work from your terminal.");
      setStatus("Failed", "err");
    }).then(function () {
      clearTimeout(timer);
      $("send").disabled = false;
      if (env === "production") $("confirm").checked = false;
    });
  }

  /* ---------- wire up ---------- */
  $("env-sandbox").addEventListener("click", function () { setEnv("sandbox"); });
  $("env-prod").addEventListener("click", function () { setEnv("production"); });
  $("send").addEventListener("click", send);
  $("body").addEventListener("input", renderCurl);
  $("filter").addEventListener("input", function (e) { buildList(e.target.value); });
  $("key-show").addEventListener("click", function (e) {
    var k = $("key");
    var show = k.type === "password";
    k.type = show ? "text" : "password";
    e.target.textContent = show ? "Hide" : "Show";
    e.target.setAttribute("aria-pressed", String(show));
  });
  $("key-clear").addEventListener("click", function () {
    $("key").value = "";
    $("token").value = "";
    setStatus("Key and token cleared.", "");
  });
  $("copy-curl").addEventListener("click", function () {
    var t = $("curl").textContent;
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { setStatus("cURL copied (uses $RIFT_API_KEY).", "ok"); });
  });
  // Drop the secrets if the page is restored from the back/forward cache.
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) { $("key").value = ""; $("token").value = ""; }
  });

  setEnv("sandbox");
  fetch("/docs/playground/spec.json", { cache: "no-cache", credentials: "omit" })
    .then(function (r) { return r.json(); })
    .then(function (s) {
      ops = s.operations;
      buildList("");
      $("quick").addEventListener("click", function () {
        var i = ops.findIndex(function (o) { return o.method === "GET" && o.path === "/v1/chains"; });
        if (i >= 0) select(i);
      });
    })
    .catch(function () { $("list").textContent = "Could not load the endpoint catalogue."; });
})();
