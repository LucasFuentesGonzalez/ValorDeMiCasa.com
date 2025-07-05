// src/components/Footer.jsx
'use client'

import Link from 'next/link'

export default function Footer() {
   return (
      <footer className="fixed bottom-0 right-0 flex space-x-6 p-4 bg-transparent text-[#A3A3A3]">
         <Link href="#blog" className="hover:text-white">Blog</Link>
         <Link href="#ayuda" className="hover:text-white">Ayuda</Link>
         <Link href="#terminos" className="hover:text-white">Términos</Link>
         <Link href="#privacidad" className="hover:text-white">Privacidad</Link>
      </footer>
   )
}
