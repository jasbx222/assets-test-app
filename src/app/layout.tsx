// src/app/layout.tsx

import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import AuthLayout from './AuthLayout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body id="root">
        <AppWrappers>
          <AuthLayout>{children}</AuthLayout>
        </AppWrappers>
      </body>
    </html>
  );
}
