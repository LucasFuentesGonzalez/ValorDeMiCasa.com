// src/app/api/app1/GetDatosBarrio/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const barrio = searchParams.get('barrio');

  const result = await pool.query(`
    SELECT 
      prealquilerm2barrio, 
      precompram2barrio, 
      rentabilidad
    FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
    WHERE barrio = $1
    LIMIT 1
  `, [barrio]);

  if (result.rows.length === 0) {
    return NextResponse.json({ error: 'Barrio no encontrado' }, { status: 404 });
  }

  return NextResponse.json(result.rows[0]);
}
