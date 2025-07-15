// src/app/page.jsx
"use client";

import Header from '@/Components/Header';
import CalcularPrecioVivienda from '@/app/calcular-precio-vivienda/page';
import Footer from '@/Components/Footer';
import LightRayBackground from '@/Components/LightRayBackground'

export default function HomePage() {
  return (
    <main className="h-screen flex flex-col justify-between">
      <Header />
      <LightRayBackground />

      <div className="flex-grow flex items-center justify-center">
        <CalcularPrecioVivienda />
      </div>

      <Footer />
    </main>
  );
}