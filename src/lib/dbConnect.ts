import mongoose from 'mongoose';

/**
 * Interfaz para el objeto de caché de la conexión a Mongoose.
 * Almacena la conexión activa y la promesa de conexión en curso.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extensión del objeto global de NodeJS para incluir nuestra caché de Mongoose.
 * Esto es necesario para evitar errores de tipado en TypeScript al acceder a global.mongoose.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

/**
 * Variable que almacena la cadena de conexión a la base de datos.
 * Se obtiene de las variables de entorno definidas en el archivo .env.local.
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Por favor define la variable de entorno MONGODB_URI dentro de .env.local'
  );
}

/**
 * Inicializamos la caché en el objeto global si no existe.
 * Esto previene que se creen múltiples conexiones durante el "Hot Reload" en desarrollo.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establece una conexión con la base de datos MongoDB.
 * 
 * Esta función implementa el patrón Singleton para reutilizar la conexión existente
 * si ya está abierta, lo cual es crítico en entornos Serverless y durante el desarrollo.
 * 
 * @returns {Promise<typeof mongoose>} Una promesa que se resuelve con la instancia de conexión a Mongoose.
 * 
 * @example
 * // Uso dentro de una función de servidor o API Route
 * import dbConnect from '@/lib/dbConnect';
 * 
 * async function handler() {
 *   await dbConnect();
 *   // ... lógica de base de datos
 * }
 */
async function dbConnect(): Promise<typeof mongoose> {
  // Si ya tenemos una conexión activa, la devolvemos inmediatamente.
  if (cached!.conn) {
    return cached!.conn;
  }

  // Si no hay una promesa de conexión en curso, creamos una nueva.
  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Creamos la promesa de conexión y la almacenamos en caché.
    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Esperamos a que la promesa se resuelva y guardamos la conexión.
    cached!.conn = await cached!.promise;
  } catch (e) {
    // Si falla, limpiamos la promesa para permitir reintentos y lanzamos el error.
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export default dbConnect;
