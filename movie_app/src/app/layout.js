import { Inter } from 'next/font/google'
import '/node_modules/primereact/resources/primereact.min.css';
import '/node_modules/primeflex/primeflex.css';
import '/node_modules/primereact/resources/themes/vela-blue/theme.css';
import 'primeicons/primeicons.css';



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Movie App',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
