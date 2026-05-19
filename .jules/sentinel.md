## 2026-05-15 - [CRITICAL] Overly Permissive CORS Configuration
**Vulnerability:** The CORS configuration in `workers/order-handler/src/index.ts` allowed any origin ending in `.pages.dev` to bypass CORS (`origin.endsWith(".pages.dev")`). This means an attacker could host a malicious site on `attacker.pages.dev` and successfully bypass CORS to submit spam orders or abuse the endpoint.
**Learning:** Cloudflare Pages subdomains are assigned to any user, so allowing all `.pages.dev` domains is a critical security risk.
**Prevention:** Explicitly validate that preview domains are subdomains of the specifically allowed `.pages.dev` production domain, using `URL` parsing to prevent string manipulation bypasses. Ensure protocol matches as well.
## 2026-05-17 - [MEDIUM] Insecure Random Number Generation for Order IDs
**Vulnerability:** The Cloudflare Worker `workers/order-handler/src/index.ts` used `Math.random()` to generate the `id` for new orders. `Math.random()` is not cryptographically secure and the resulting values can be predicted.
**Learning:** For identifiers generated for transaction tracking, predictability might allow unauthorized users to guess other order IDs, creating a security/privacy risk.
**Prevention:** Use secure random number generators like `crypto.randomUUID()` instead of `Math.random()` when creating unique identifiers or tokens.
## 2026-05-19 - [MEDIUM] Reverse Tabnabbing via window.open
**Vulnerability:** The application used `window.open(url, "_blank")` without specifying `noopener,noreferrer`. This exposes the `window.opener` object to the newly opened tab, which could potentially navigate the original application window to a malicious URL (reverse tabnabbing).
**Learning:** `window.open` behavior is similar to `<a target="_blank">` but requires explicit mitigation via the third argument `features` string or by setting `noopener` explicitly.
**Prevention:** Always pass `"noopener,noreferrer"` as the third parameter when opening external links using `window.open` with `"_blank"`.
