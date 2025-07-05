// src/app/api/app1/GetDistritos/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const municipio = searchParams.get('municipio');

    if (!municipio) {
      return NextResponse.json({ error: 'Parámetro "municipio" requerido' }, { status: 400 });
    }

    const result = await pool.query(`
      SELECT DISTINCT distrito 
      FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
      WHERE municipio = $1
      ORDER BY distrito ASC
    `, [municipio]);

    return NextResponse.json(result.rows.map(row => row.distrito));
  } catch (error) {
    console.error('Error en GetDistritos:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}