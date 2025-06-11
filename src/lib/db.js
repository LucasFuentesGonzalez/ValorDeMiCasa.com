// src/lib/db.js
import { Pool } from 'pg';

let pool;

if (process.env.VERCEL) {
   // Entorno de producción (Vercel)
   pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
      rejectUnauthorized: false,
      },
   });

} else {
   // Entorno local
   pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
   });
}

export default pool;
