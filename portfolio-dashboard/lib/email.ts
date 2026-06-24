// Email validation + optional authorization allowlist for dashboard users.

// Practical, reasonably strict email format check.
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function isValidEmail(email: string): boolean {
  const e = email.trim();
  if (e.length > 254) return false;
  return EMAIL_RE.test(e);
}

/**
 * Optional allowlist, configured via env vars:
 *   ALLOWED_EMAIL_DOMAINS="gmail.com,unsj-cuim.edu.ar"   (domain allowlist)
 *   ALLOWED_EMAILS="someone@x.com,other@y.com"            (exact-address allowlist)
 * If BOTH are empty/unset, any validly-formatted email is allowed.
 */
function parseList(value: string | undefined): string[] {
  return (value ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAuthorizedEmail(email: string): boolean {
  const e = email.trim().toLowerCase();
  const domains = parseList(process.env.ALLOWED_EMAIL_DOMAINS);
  const exact = parseList(process.env.ALLOWED_EMAILS);

  // No restrictions configured -> allow any valid email.
  if (domains.length === 0 && exact.length === 0) return true;

  if (exact.includes(e)) return true;
  const domain = e.split("@")[1] ?? "";
  if (domain && domains.includes(domain)) return true;
  return false;
}

/** Returns an error message if the email is not acceptable, otherwise null. */
export function validateUserEmail(email: string): string | null {
  if (!email || !email.trim()) return "Email is required.";
  if (!isValidEmail(email)) return "Please enter a valid email address.";
  if (!isAuthorizedEmail(email)) {
    return "This email is not authorized to be added. Ask an admin to allow its address or domain.";
  }
  return null;
}
