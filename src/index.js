
// //testeo 2 EJS ////////////////////////////////////////////////////////////////////////////
import 'dotenv/config';
import mongoose from 'mongoose';
import { envs } from "./config/envs.js";
import app from "./app.js";  // ← Aquí estaba el error
import { initProducer, closeProducer } from "ds-logging-producer-kit";

mongoose.set('strictQuery', true);

// Manejadores de eventos de MongoDB
mongoose.connection.on('error', (err) => {
  console.error('❌ Error de conexión a MongoDB:', err);
  process.exit(1);
});

mongoose.connection.on('connected', () => {
  console.log('✅ Conexión exitosa a MongoDB');
});

// Función principal para iniciar el servidor
const main = async () => {
    try {
        // 1. Conectar a MongoDB
        await mongoose.connect(envs.MONGODB_URI);
        
        // 2. Inicializar Producer de Logs (ds-logging-producer-kit)
        await initProducer();
        console.log('✅ Logger Producer inicializado');

        // 3. Iniciar el servidor Express
        const port = envs.PORT;
        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        });

    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }

    // Función para cierre correcto de servicios
    const safeClose = async () => {
        try {
            console.log('\n🛑 Cerrando servidor...');
            await closeProducer();
            await mongoose.disconnect();
        } catch (err) {
            console.error('Error al cerrar servicios:', err);
        }
        process.exit(0);
    };

    process.once("SIGINT", safeClose);
    process.once("SIGTERM", safeClose);
};

// Iniciar la aplicación
main();