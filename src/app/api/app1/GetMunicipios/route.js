// src/app/api/app1/GetMunicipios/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const provincia = searchParams.get('provincia');

  const result = await pool.query(`
    SELECT DISTINCT municipio FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
    WHERE provincia = $1
    ORDER BY municipio ASC
  `, [provincia]);

  return NextResponse.json(result.rows.map(row => row.municipio));
}
