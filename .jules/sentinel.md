## 2026-05-15 - [CRITICAL] Overly Permissive CORS Configuration
**Vulnerability:** The CORS configuration in `workers/order-handler/src/index.ts` allowed any origin ending in `.pages.dev` to bypass CORS (`origin.endsWith(".pages.dev")`). This means an attacker could host a malicious site on `attacker.pages.dev` and successfully bypass CORS to submit spam orders or abuse the endpoint.
**Learning:** Cloudflare Pages subdomains are assigned to any user, so allowing all `.pages.dev` domains is a critical security risk.
**Prevention:** Explicitly validate that preview domains are subdomains of the specifically allowed `.pages.dev` production domain, using `URL` parsing to prevent string manipulation bypasses. Ensure protocol matches as well.

## 2026-05-18 - [MEDIUM] Insecure Randomness in Order IDs
**Vulnerability:** The order IDs in `workers/order-handler/src/index.ts` were generated using `Math.random()`, which is not a cryptographically secure random number generator (CSPRNG).
**Learning:** `Math.random()` can be predictable. If these IDs are used for security checks, tracking links, or are exposed in ways that an attacker could leverage, a predictable ID introduces a risk.
**Prevention:** Always use a CSPRNG like `crypto.randomUUID()` or `crypto.getRandomValues()` when generating any kind of unique identifier, token, or session ID, especially in security-sensitive contexts like order processing.
