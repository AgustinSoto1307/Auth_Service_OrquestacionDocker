# 🚀 Auth_Service: Guía de Arranque y Troubleshooting

Este documento describe cómo levantar el entorno de desarrollo y la aplicación del microservicio de autenticación.  
Utilizamos **Docker Compose** para orquestar la base de datos (MongoDB) y el cliente visual (mongo-client), mientras que el backend de Node.js se ejecuta de forma local para facilitar la depuración (`npm run dev`).

---

## 🛠️ 1. Requisitos y Configuración Previa

Asegúrate de tener instalados:

- Docker Desktop (para los servicios de contenedores)
- Node.js
- Dependencias del proyecto

### 1.1. Modificación Crítica del Archivo `.env`

Para que tu aplicación local (`npm run dev`) pueda conectarse al contenedor de MongoDB, la variable `MONGODB_URI` debe apuntar a tu máquina anfitriona (`localhost`), ya que el puerto `27017` está expuesto por Docker:

| Configuración | Valor Requerido |
|---------------|----------------|
| MONGODB_URI   | mongodb://localhost:27017/authdb |

### 1.2. Instalación de Dependencias

Ejecuta este comando una sola vez para instalar todas las dependencias del proyecto:

```bash
npm install
2. Flujo de Arranque
Sigue estos dos pasos para iniciar todo el entorno de desarrollo:

Paso 1: Levantar los Servicios de Docker
Ejecuta este comando en la raíz del proyecto para iniciar la base de datos (mongo-server) y el cliente visual (mongo-client):

bash
Copiar código
docker-compose up -d mongo-server mongo-client
Verificación: Asegúrate de que los contenedores estén en estado Up:

bash
Copiar código
docker-compose ps
Acceso a la Base de Datos: Puedes acceder al cliente visual Mongo Express en http://localhost:8082.

Paso 2: Arrancar el Backend (API de Node.js)
Una vez que los contenedores estén listos, inicia tu aplicación de Node.js en modo desarrollo:

bash
Copiar código
npm run dev
Tu API ahora está corriendo en http://localhost:3001 y conectada a MongoDB a través de localhost:27017.

3. Guía de Troubleshooting (Solución de Problemas Comunes)
3.1. Error de Conexión: ECONNREFUSED / ENOTFOUND
Error	Mensaje Visto	Causa Raíz	Solución
getaddrinfo ENOTFOUND mongo-server	La aplicación local no puede resolver el nombre del host mongo-server.	La API se ejecuta fuera de Docker, pero usa un host interno de Docker.	Corregir el .env para usar localhost (ver sección 1.1).
ECONNREFUSED 127.0.0.1:27017	La aplicación Node.js intenta conectarse, pero no hay un servicio escuchando.	El contenedor mongo-server no está levantado o no está exponiendo el puerto.	Asegurarse de que el docker-compose.yml mapee el puerto:
yaml ports: - "27017:27017"

3.2. Contenedor MongoDB Reiniciando (Restarting)
Si el contenedor mongo-server entra en un bucle de reinicio, es probable que haya datos o permisos corruptos en el volumen persistente.

Comando de Solución:

bash
Copiar código
docker-compose down -v
Nota: Esto eliminará los datos persistentes. Luego vuelve al Paso 1 del flujo de arranque para iniciar la base de datos de forma limpia.

3.3. Error de Conflicto de Nombres o Puertos
Conflicto de Nombres:
Si recibes errores como Conflict. The container name "/mongo-server" is already in use:

bash
Copiar código
docker rm -f <nombre-del-contenedor-en-conflicto>
Conflicto de Puertos:
Si el puerto está en uso (address already in use), detén el proceso conflictivo:

bash
Copiar código
sudo lsof -i :<puerto>
sudo kill <PID>
O cambia el puerto mapeado en docker-compose.yml:

yaml
Copiar código
ports:
  - "8083:8082"
4. Detener y Limpiar el Entorno
Detener únicamente los servicios de Docker:

bash
Copiar código
docker-compose stop
Detener y eliminar contenedores, redes y volúmenes:

bash
Copiar código
docker-compose down -v
✅ Listo! Ahora tienes un entorno funcional y limpio para desarrollo y debugging.

css
Copiar código

Si querés, puedo hacer también una **versión resumida tipo “chuleta” de comandos de Docker** para tenerla al lado del PC, incluyendo los errores más frecuentes y soluciones rápidas.  

¿Querés que haga esa versión?






