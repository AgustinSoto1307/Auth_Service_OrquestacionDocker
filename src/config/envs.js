// import Joi from "joi";

// // Usamos el mismo regex que ya tenías, aunque no lo aplicamos a las nuevas variables.
// const durationRegex = /^(\d+[smhd])+$/; 

// // Todas las variables obligatorias de CTI que definimos en el paso anterior.
// const envsSchema = Joi.object({
//     // --- VARIABLES ORIGINALES DEL MÓDULO ---
//     MONGODB_URI: Joi.string().required().description('URL de conexión a MongoDB.'),
//     PORT: Joi.number().required().description('Puerto de la aplicación.'),
//     JWT_SECRET: Joi.string().min(32).required().description('Clave secreta para firmar tokens JWT.'),
//     JWT_EXPIRATION: Joi.string().required().description('Tiempo de expiración de los JWT (e.g., 1h, 7d).'),
//     NODE_ENV: Joi.string().valid('development', 'production', 'test').required().description('Entorno de ejecución.'),

//     // =======================================================
//     // --- VARIABLES CRÍTICAS DE INTEGRACIÓN (CTI) ---
//     // =======================================================

//     // 1. Integración con Microservicio CORE (Listado de Preinscripción)
//     CORE_SERVICE_URL: Joi.string().uri().required().description('URL base del Microservicio CORE.'),
//     CORE_API_KEY: Joi.string().required().description('Clave secreta (X-API-KEY) para CORE.'),
    
//     // 2. Integración con Microservicio NOTIFICACIONES (Envío de Emails)
//     NOTIFICATION_SERVICE_URL: Joi.string().uri().required().description('URL base del Microservicio NOTIFICACIONES.'),

//     // 3. Integración con LOGS (AMQP/RabbitMQ)
//     AMQP_USER: Joi.string().required().description('Usuario de RabbitMQ para Logs.'),
//     AMQP_PASS: Joi.string().required().description('Contraseña de RabbitMQ para Logs.'),
//     AMQP_HOST: Joi.string().required().description('Host/IP de RabbitMQ para Logs.'),
//     AMQP_PORT: Joi.number().required().description('Puerto de RabbitMQ (5672).'),
//     AMQP_VHOST: Joi.string().required().description('Virtual Host de RabbitMQ (típicamente /).'),
//     AMQP_EXCHANGE: Joi.string().required().description('Nombre del Exchange para logs (logs.exchange).'),
//     AMQP_ROUTING_KEY: Joi.string().required().description('Routing Key por defecto para logs (logs.info).'),
//     MODULE_NAME: Joi.string().required().description('Nombre del Módulo/Servicio para trazabilidad de logs (e.g., auth-service).'),
//     VALIDATE: Joi.boolean().required().description('Flag de validación para el servicio de logs CTI.'),
//     LOG_LEVEL: Joi.string()
//         .valid('debug', 'info', 'warn', 'error', 'fatal')
//         .default('info')
//         .description('Nivel de severidad para los logs (ej: debug, info, warn, error).'),

// }).unknown(true);

// const { value, error} = envsSchema.validate(process.env);
// if(error) {
//     throw new Error(`❌ Error de validación en variables de entorno: ${error.message}`);
// }

// export const envs = {
//     // Variables originales
//     MONGODB_URI: value.MONGODB_URI,
//     PORT: value.PORT,
//     JWT_SECRET: value.JWT_SECRET,
//     JWT_EXPIRATION: value.JWT_EXPIRATION,
//     NODE_ENV: value.NODE_ENV,

//     // Variables CTI - CORE
//     CORE_SERVICE_URL: value.CORE_SERVICE_URL,
//     CORE_API_KEY: value.CORE_API_KEY,

//     // Variables CTI - NOTIFICACIONES
//     NOTIFICATION_SERVICE_URL: value.NOTIFICATION_SERVICE_URL,
//     amqpUser: value.AMQP_USER,          // Era AMQP_USER
//     amqpPass: value.AMQP_PASS,          // Era AMQP_PASS
//     amqpHost: value.AMQP_HOST,          // Era AMQP_HOST
//     amqpPort: value.AMQP_PORT,          // Era AMQP_PORT
//     amqpVhost: value.AMQP_VHOST,        // Era AMQP_VHOST
//     amqpExchange: value.AMQP_EXCHANGE,  // Era AMQP_EXCHANGE
//     amqpRoutingKey: value.AMQP_ROUTING_KEY, // Era AMQP_ROUTING_KEY
//     moduleName: value.MODULE_NAME,      // Era MODULE_NAME
//     logLevel: value.LOG_LEVEL,          // Era LOG_LEVEL
//     validateLogs: value.VALIDATE,       // Era VALIDATE
//     nodeEnv: value.NODE_ENV,            // Para usar en AmqpLogger
// };
//////////////////////////////////////////////////////////////////////////////////
// src/config/envs.js
import dotenv from 'dotenv';
import Joi from 'joi';

// Cargar .env antes de validar
dotenv.config();

// Regex opcional que ya usabas
const durationRegex = /^(\d+[smhd])+$/;

// Schema: variables críticas required; AMQP opcional
const envsSchema = Joi.object({
  MONGODB_URI: Joi.string().required().description('URL de conexión a MongoDB.'),
  PORT: Joi.number().required().description('Puerto de la aplicación.'),
  JWT_SECRET: Joi.string().min(32).required().description('Clave secreta para firmar tokens JWT.'),
  JWT_EXPIRATION: Joi.string().required().description('Tiempo de expiración de los JWT.'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required().description('Entorno de ejecución.'),

  CORE_SERVICE_URL: Joi.string().uri().required().description('URL base del Microservicio CORE.'),
  CORE_API_KEY: Joi.string().required().description('Clave secreta (X-API-KEY) para CORE.'),
  NOTIFICATION_SERVICE_URL: Joi.string().uri().required().description('URL base del Microservicio NOTIFICACIONES.'),

  // AMQP/RabbitMQ: opcional. Si VALIDATE=true entonces el app puede decidir exigirlas.
  AMQP_USER: Joi.string().optional(),
  AMQP_PASS: Joi.string().optional(),
  AMQP_HOST: Joi.string().optional(),
  AMQP_PORT: Joi.number().optional().default(5672),
  AMQP_VHOST: Joi.string().optional().default('/'),
  AMQP_EXCHANGE: Joi.string().optional().default('logs.exchange'),
  AMQP_ROUTING_KEY: Joi.string().optional().default('logs.info'),

  MODULE_NAME: Joi.string().required().description('Nombre del Módulo/Servicio (e.g., auth-service).'),
  VALIDATE: Joi.boolean().default(false),
  LOG_LEVEL: Joi.string().valid('debug', 'info', 'warn', 'error', 'fatal').default('info'),
}).unknown(true);

const { value, error } = envsSchema.validate(process.env, { abortEarly: false });
if (error) {
  throw new Error(`❌ Error de validación en variables de entorno: ${error.message}`);
}

export const envs = {
  MONGODB_URI: value.MONGODB_URI,
  PORT: value.PORT,
  JWT_SECRET: value.JWT_SECRET,
  JWT_EXPIRATION: value.JWT_EXPIRATION,
  NODE_ENV: value.NODE_ENV,

  CORE_SERVICE_URL: value.CORE_SERVICE_URL,
  CORE_API_KEY: value.CORE_API_KEY,
  NOTIFICATION_SERVICE_URL: value.NOTIFICATION_SERVICE_URL,

  // AMQP mapeado a nombres más amigables
  amqpUser: value.AMQP_USER,
  amqpPass: value.AMQP_PASS,
  amqpHost: value.AMQP_HOST,
  amqpPort: value.AMQP_PORT,
  amqpVhost: value.AMQP_VHOST,
  amqpExchange: value.AMQP_EXCHANGE,
  amqpRoutingKey: value.AMQP_ROUTING_KEY,

  moduleName: value.MODULE_NAME,
  validateLogs: value.VALIDATE,
  logLevel: value.LOG_LEVEL,
  nodeEnv: value.NODE_ENV,
};

