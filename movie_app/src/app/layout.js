"use client";

import '/node_modules/primereact/resources/primereact.min.css';
import '/node_modules/primeflex/primeflex.css';
//import '/node_modules/primereact/resources/themes/vela-blue/theme.css';
import 'primeicons/primeicons.css';
import { AuthContextProvider } from './AuthContext';



export const metadata = {
  title: 'Movie App',
  description: '',
}

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
