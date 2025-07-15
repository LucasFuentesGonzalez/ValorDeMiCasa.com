// src/Components/Header.jsx
'use client'

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import Link from 'next/link'

export default function Header() {
   return (
      <header className="w-full fixed top-0 left-0 z-50 bg-transparent py-4">
         <div className="flex items-center justify-between w-full px-4">

         {/* Bloque: Logo */}
         <div className="flex items-center justify-start basis-1/3">
            <Link href="/">
               <span className="text-2xl font-bold text-white">ValorDeMiCasa</span>
            </Link>
         </div>

         {/* Bloque: Navegación (centrado) */}
         <nav className="hidden md:flex justify-center basis-1/3 space-x-6 text-[#A3A3A3] font-medium">
            <Link href="#inicio" className="hover:text-white transition">Inicio</Link>
            <Link href="#servicios" className="hover:text-white transition">Servicios</Link>
            <Link href="#sobre" className="hover:text-white transition">Sobre Nosotros</Link>
            <Link href="/contacto" className="hover:text-white transition">Contacto</Link>
         </nav>

         {/* Bloque: Redes sociales */}
         <div className="flex items-center justify-end basis-1/3 space-x-4 text-[#A3A3A3]">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
               <FaFacebookF size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
               <FaTwitter size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
               <FaInstagram size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
               <FaLinkedinIn size={22} />
            </a>
         </div>

         </div>
      </header>
   )
}