// src/app/api/app1/GetMunicipios/route.js
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const provincia = searchParams.get('provincia');

    if (!provincia) {
      return NextResponse.json({ error: 'Parámetro "provincia" requerido' }, { status: 400 });
    }

    const result = await pool.query(`
      SELECT DISTINCT municipio 
      FROM "RealEstateExplorer"."tDatosAuxiliaresESP"
      WHERE provincia = $1
      ORDER BY municipio ASC
    `, [provincia]);

    return NextResponse.json(result.rows.map(row => row.municipio));
  } catch (error) {
    console.error('Error en GetMunicipios:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
