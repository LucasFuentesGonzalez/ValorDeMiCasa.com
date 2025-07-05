// src/app/api/app1/GetDatosBarrio/route.js
import { NextResponse } from 'next/server';
import pool from '@/Lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const barrio = searchParams.get('barrio');

    if (!barrio) {
      return NextResponse.json({ error: 'Parámetro "barrio" requerido' }, { status: 400 });
    }

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
  } catch (error) {
    console.error('Error en GetDatosBarrio:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
