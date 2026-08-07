# Task: Fix Textarea border/focus style when wrapped with Controller

## Root Cause
The `Textarea` component applies `aria-invalid` danger styling (red border + red ring) whenever the `error` prop is truthy. In the address-form, the Controller-wrapped Textarea passes `error={errors.street?.message}`, which:
- Triggers the red border/ring danger styling (differs from the normal soft-border + maroon-focus design).
- Causes the error message to render TWICE (inside Textarea via its internal `<p>`, and in the form's separate `<span>`).
- The `aria-invalid` red ring overrides the maroon focus ring when both are active.

## Steps
- [x] 1. Read relevant files (textarea.tsx, address-form.tsx, input-group.tsx, globals.css).
- [x] 2. Create plan and get user approval.
- [x] 3. Remove duplicated error `<span>` for the street field in address-form.tsx (Textarea already renders it).
- [x] 4. Adjust textarea.tsx so focus styling takes precedence over the error/aria-invalid ring styling.
- [x] 5. Verify the Controller usage remains unchanged and the fix is complete.
