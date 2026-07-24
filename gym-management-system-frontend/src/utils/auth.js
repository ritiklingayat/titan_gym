const AUTH_KEY = 'gms_admin_authed';

// Single admin login for the whole gym system.
// Change these credentials any time — this is the only account in the app.
const ADMIN_EMAIL = 'admin@titanfitness.com';
const ADMIN_PASSWORD = 'admin123';

export function loginAdmin(email, password) {
  const ok = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  if (ok) localStorage.setItem(AUTH_KEY, 'true');
  return ok;
}

export function logoutAdmin() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAdminAuthed() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export const ADMIN_CREDENTIALS_HINT = `${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`;
