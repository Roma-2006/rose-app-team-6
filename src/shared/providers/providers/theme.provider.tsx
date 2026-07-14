'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import dynamic from 'next/dynamic';

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// 'use client';

// import * as React from 'react';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
// import type { ThemeProviderProps } from 'next-themes';

// export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   // نقوم بتعطيل نوع السكربت المسبب للمشكلة وتحويله لـ JSON حتى تحذفه React من حساباتها
//   const scriptProps = typeof window === 'undefined'
// ? undefined
//     : ({ type: 'application/json' } as const);

//   return (
//     <NextThemesProvider {...props} scriptProps={scriptProps}>
//       {children}
//     </NextThemesProvider>
//   );
// }
