## 2026-05-15 - [CRITICAL] Overly Permissive CORS Configuration
**Vulnerability:** The CORS configuration in `workers/order-handler/src/index.ts` allowed any origin ending in `.pages.dev` to bypass CORS (`origin.endsWith(".pages.dev")`). This means an attacker could host a malicious site on `attacker.pages.dev` and successfully bypass CORS to submit spam orders or abuse the endpoint.
**Learning:** Cloudflare Pages subdomains are assigned to any user, so allowing all `.pages.dev` domains is a critical security risk.
**Prevention:** Explicitly validate that preview domains are subdomains of the specifically allowed `.pages.dev` production domain, using `URL` parsing to prevent string manipulation bypasses. Ensure protocol matches as well.
