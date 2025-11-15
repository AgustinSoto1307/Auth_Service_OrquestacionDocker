
<div align="center">

# 🤓 APP ITS Cipolletti - Microservicio: Authentication Service - Backend  

Microservicio de autenticación backend desarrollado en **Node.js + Express**, encargado de gestionar y validar la identidad de los usuarios dentro del ecosistema institucional. Su función principal es garantizar que solo usuarios autorizados accedan a los distintos módulos del sistema, verificando credenciales y generando tokens seguros para la comunicación entre servicios.

Este servicio forma parte del ecosistema de microservicios del proyecto **APP ITS Cipolletti**, desarrollado en conjunto con el grupo **DIV < H1>**, integrándose como capa fundamental de seguridad. El módulo se encuentra contenerizado en Docker para asegurar portabilidad, escalabilidad y un entorno de ejecución homogéneo dentro de la asignatura **Laboratorio II FSD**.

Además, este microservicio implementa prácticas modernas de arquitectura backend, incluyendo separación por capas (rutas, controladores, servicios y modelos), manejo centralizado de errores y validación estricta de datos, permitiendo una comunicación fiable con otros servicios mediante **HTTP + JSON**, autenticación con **JWT** y persistencia mediante **MongoDB / Mongoose**.

![Node.js](https://img.shields.io/badge/Node.js-v20+-green?style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-Framework-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

</div>

---

## 📚 Tabla de Contenidos
- [🤓 APP ITS Cipolletti - Microservicio: Authentication Service - Backend](#-app-its-cipolletti---microservicio-authentication-service---backend)
  - [📚 Tabla de Contenidos](#-tabla-de-contenidos)
  - [🎓 Contexto Académico](#-contexto-académico)
  - [📋 Descripción General](#-descripción-general)
  - [🏗️ Arquitectura y Tecnologías](#️-arquitectura-y-tecnologías)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [🐋 Instalación y Ejecución con Docker](#-instalación-y-ejecución-con-docker)

---

## 🎓 Contexto Académico

Este módulo fue desarrollado como parte de la evaluación práctica de la asignatura, donde se requiere implementar un microservicio funcional utilizando contenedores Docker y las herramientas del ecosistema Node.js. El objetivo académico incluye aplicar buenas prácticas, documentar correctamente el proyecto y comprender la arquitectura basada en microservicios dentro del contexto de la aplicación APP ITS Cipolletti.

| Rol | Información |
|:---|:---|
| **Asignatura:** | **Laboratorio II Full Stack** |
| **Profesor:** | **Javier Parra** |
| **Alumno:** | **Soto Agustín** |
| **Módulo Principal:** | **Auth-Service** |


---

## 📋 Descripción General

Este backend implementa un microservicio de **autenticación y gestión de identidad**, encargado de administrar el acceso de usuarios dentro del ecosistema APP ITS Cipolletti. Brinda servicios **RESTful** orientados al control de identidad, la validación de credenciales y la emisión de tokens seguros.

Las funciones principales incluyen:

* **Registro y Login:** Permite registrar nuevos usuarios e iniciar sesión mediante credenciales válidas.  
  **Este módulo sirve para el alta de usuarios y para el login.**
* Verificación de identidad del usuario para autorizar el acceso a otros servicios del sistema.
* Validación estricta de credenciales enviadas por el cliente.
* Generación y gestión de **tokens JWT**, utilizados para mantener sesiones seguras.
* Habilita el acceso a recursos protegidos dentro del ecosistema de microservicios.
* Comunicación interna entre servicios mediante **HTTP + JSON** para integración y escalabilidad.

El microservicio está diseñado siguiendo los principios de **Clean Architecture**, con una estructura bien separada en capas: **routes**, **controllers**, **services**, **models**, **middlewares** y **utils**, permitiendo fácil mantenibilidad y extensibilidad.

---

## 🏗️ Arquitectura y Tecnologías

| Tecnología | Descripción |
|-------------|--------------|
| **Node.js** | Entorno de ejecución JavaScript, orientado a APIs escalables |
| **Express.js** | Framework ligero para creación de servicios REST |
| **MongoDB / Mongoose** | Base de datos NoSQL y ODM para modelar documentos |
| **Docker** | Contenerización del entorno utilizando **docker-compose** |
| **Dotenv** | Manejo seguro de variables de entorno |
| **Jest / Supertest** | Suite de pruebas para testear endpoints y lógica interna |

📐 **Patrón de diseño aplicado:** `MVC / Clean Architecture`

---

## 📁 Estructura del Proyecto

```bash
src/
 ├── config/          # Configuración general, carga de variables y conexión a MongoDB
 ├── controllers/     # Controladores: orquestan peticiones y respuestas
 ├── middleware/      # Middlewares personalizados (autenticación, autorización, validaciones)
 ├── models/          # Modelos y esquemas de Mongoose (User, Roles, Tokens, etc.)
 ├── routes/          # Endpoints públicos del servicio (login, register, validate-token)
 ├── services/        # Lógica de negocio y acceso a la base de datos
 ├── utils/           # Helpers, manejo de errores, formateadores, herramientas JWT
 ├── validation/      # Validadores para sanitizar y asegurar integridad de datos
 ├── app.js           # Configuración principal de Express
 ├── index.js         # Punto de inicio del servidor


```

## 🐋 Instalación y Ejecución con Docker

1️⃣ **Clonar el repositorio del proyecto con el link de GitHub**  
Antes de comenzar, descargá el código fuente utilizando Git. Esto te permitirá trabajar con la última versión disponible.

```bash
git clone https://github.com/AgustinSoto1307/Auth_Service_OrquestacionDocker.git
```

2️⃣ Ingresar al directorio del proyecto
Dentro de esta carpeta vas a encontrar el código del microservicio, el archivo docker-compose.yml y toda la estructura necesaria para ejecutarlo en contenedores.

``` bash
cd Auth_Service_OrquestacionDocker
```
3️⃣ Instalar dependencias del backend
Es importante instalar los módulos de Node.js antes de levantar el entorno Docker, ya que algunas herramientas utilizan el contenido de node_modules para validar el proyecto.
``` bash

npm i
```
4️⃣ Crear y configurar variables de entorno en el archivo **.env**

* Crea un archivo **.env** en la raíz del proyecto. 
``` bash
JWT_SECRET=
PORT=
NODE_ENV=
# Conexión a Mongo dentro de Docker Compose (servicio llamado "mongo")
MONGODB_URI=mongodb://mongo:27017/AuthService
JWT_EXPIRATION=30m
CORE_SERVICE_URL=http://core-service:4000
CORE_API_KEY=
NOTIFICATION_SERVICE_URL=http://notifications-service:5000
MODULE_NAME=auth-service
VALIDATE=false

JWT_SECRET: usá un valor largo y aleatorio para tokens más seguros.
PORT: puede ser 3000, 4000 u otro puerto no utilizado.
NODE_ENV: generalmente development durante la etapa de pruebas.
```

5️⃣ Reiniciar el entorno Docker y construir los servicios. 
Antes de iniciar los contenedores, es recomendable limpiar cualquier ejecución previa para evitar conflictos con volúmenes o imágenes antiguas usando los siguientes comandos:

``` bash
docker-compose down -v
```
``` bash
docker-compose up --build
```
Este proceso:
Descarga y levanta la base de datos MongoDB
Crea la imagen del Auth-Service
Inicia ambos contenedores y los conecta en una misma red interna

6️⃣ Registrar usuarios mediante Postman
Con el servicio funcionando, podés utilizar Postman para crear usuarios nuevos a través del endpoint de registro.

Roles permitidos en el sistema backend:
- admin
- secretaria
- profesor
- alumno

<br/> <img src="./assets/1.jpg" width="800" />
<br/><br/>

7️⃣ Una vez registrado un usuario con los roles, utiliza el endpoint en Postman para iniciar sesion correctamente, utilizando el metodo POST, ingresando:
- DNI del usuario
- Contraseña establecida en el registro </br></br>

![Inicio de sesion de usuario](./assets/2.jpg)


