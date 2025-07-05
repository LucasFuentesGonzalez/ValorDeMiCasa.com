// src/app/api/app1/GetProvincias/route.js
import { NextResponse } from 'next/server';
import pool from '@/Lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const comunidad = searchParams.get('comunidad');

    if (!comunidad) {
      return NextResponse.json({ error: 'Parámetro "comunidad" requerido' }, { status: 400 });
    }

    const result = await pool.query(`
      SELECT DISTINCT provincia
      FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
      WHERE comunidad = $1
      ORDER BY provincia ASC
    `, [comunidad]);

    return NextResponse.json(result.rows.map(row => row.provincia));
  } catch (error) {
    console.error('Error en GetProvincias:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
