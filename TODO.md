# Task TODO: Fix missing toast on forgot-password unregistered email

- [ ] Add temporary console logs in `src/features/auth/hooks/use-forgot-password-form.ts` to confirm flow reaches the else branch and shows toast.error.
- [ ] Fix `src/app/layout.tsx` so the Sonner `<Toaster />` is actually mounted (remove unreachable `return children;`).
- [ ] (Optional debug) Add HTTP status logging in `src/features/auth/apis/forgot-password.api.ts` to capture actual status/body for unregistered email.
- [ ] Re-test forgot-password with an unregistered email and confirm toast.error is visible.

