// src/app/api/app1/GetProvincias/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const comunidad = searchParams.get('comunidad');

  const result = await pool.query(`
    SELECT DISTINCT provincia FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
    WHERE comunidad = $1
    ORDER BY provincia ASC
  `, [comunidad]);

  return NextResponse.json(result.rows.map(row => row.provincia));
}
