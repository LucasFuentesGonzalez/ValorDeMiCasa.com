// src/app/api/app1/GetBarrios/route.js
import { NextResponse } from 'next/server';
import pool from '@/Lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const distrito = searchParams.get('distrito');

    if (!distrito) {
      return NextResponse.json({ error: 'Parámetro "distrito" requerido' }, { status: 400 });
    }

    const result = await pool.query(`
      SELECT DISTINCT barrio
      FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
      WHERE distrito = $1
      ORDER BY barrio ASC
    `, [distrito]);

    return NextResponse.json(result.rows.map(row => row.barrio));
  } catch (error) {
    console.error('Error en GetBarrios:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
