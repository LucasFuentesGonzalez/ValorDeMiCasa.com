// src/app/layout.jsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
   subsets: ['latin'],
})

export const metadata = {
   title: "Valor de mi casa",
   description: "Calcula el valor estimado de tu vivienda en España",
};

export default function RootLayout({ children }) {
   return (
      <html lang="es" className={inter.className}>
         <body className="bg-[#101010] text-white">
            {children}
         </body>
      </html>
   );
}
