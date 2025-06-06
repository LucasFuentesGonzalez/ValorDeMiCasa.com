// src/app/api/app1/GetBarrios/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const distrito = searchParams.get('distrito');

  const result = await pool.query(`
    SELECT DISTINCT barrio FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
    WHERE distrito = $1
    ORDER BY barrio ASC
  `, [distrito]);

  return NextResponse.json(result.rows.map(row => row.barrio));
}
