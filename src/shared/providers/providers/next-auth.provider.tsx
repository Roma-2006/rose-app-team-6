import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { Session } from "next-auth";

/**
 * Wraps the application with NextAuth's {@link SessionProvider}, making the
 * session available to all child components via `useSession`.
 *
 * Should be placed as high as possible in the component tree, typically in
 * the root layout.
 *
 * @param children - The child components that require session access.
 *
 * @example
 * // app/layout.tsx
 * export default function RootLayout({ children }: { children: React.ReactNode }) {
 *   return (
 *     <html>
 *       <body>
 *         <NextAuthProvider>{children}</NextAuthProvider>
 *       </body>
 *     </html>
 *   );
 * }
 */

interface Props {
  children: React.ReactNode;
  session: Session | null; 
}

export default function NextAuthProvider({ children, session }: Props) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}