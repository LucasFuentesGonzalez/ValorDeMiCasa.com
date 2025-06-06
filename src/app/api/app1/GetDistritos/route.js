// src/app/api/app1/GetDistritos/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const municipio = searchParams.get('municipio');

  const result = await pool.query(`
    SELECT DISTINCT distrito FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
    WHERE municipio = $1
    ORDER BY distrito ASC
  `, [municipio]);

  return NextResponse.json(result.rows.map(row => row.distrito));
}
