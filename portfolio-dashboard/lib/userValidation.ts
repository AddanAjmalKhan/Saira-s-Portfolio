// Validation rules for creating/editing dashboard users.

/** Valid display name: letters (any language), spaces, . ' - ; 2–80 chars. */
export function validateName(name: string): string | null {
  const n = (name ?? "").trim();
  if (n.length < 2) return "Name must be at least 2 characters.";
  if (n.length > 80) return "Name is too long (max 80 characters).";
  if (!/^[\p{L}][\p{L}\p{M}\s.'-]*$/u.test(n)) {
    return "Name can only contain letters, spaces, hyphens, apostrophes and periods.";
  }
  return null;
}

/** Password: min 8 chars, with at least one letter, one number, one special char. */
export function validatePassword(pw: string): string | null {
  if (!pw || pw.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(pw)) return "Password must include at least one letter.";
  if (!/[0-9]/.test(pw)) return "Password must include at least one number.";
  if (!/[^A-Za-z0-9]/.test(pw)) return "Password must include at least one special character.";
  return null;
}
