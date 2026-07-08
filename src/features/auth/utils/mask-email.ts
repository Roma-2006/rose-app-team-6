export function maskEmail(email: string) {
  if (!email.includes('@')) return email;

  const [name, domain] = email.split('@');

  return `${name.charAt(0)}***@${domain}`;
}
