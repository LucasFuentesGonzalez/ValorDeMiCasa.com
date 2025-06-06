// src/app/api/app1/GetComunidades/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  const result = await pool.query(`
    SELECT DISTINCT comunidad FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
    ORDER BY comunidad ASC
  `);
  return NextResponse.json(result.rows.map(row => row.comunidad));
}
