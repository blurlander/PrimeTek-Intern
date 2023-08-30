"use client";

import '/node_modules/primereact/resources/primereact.min.css';
import '/node_modules/primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { AuthContextProvider } from './AuthContext';



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link id="theme-link" rel="stylesheet" href="/themes/vela-blue/theme.css" />
      </head>
      <body>
        <AuthContextProvider>
        {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
