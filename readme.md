<div align="center">

# 🚀 APP ITS Cipolletti - Microservicio: Authentication Service - Backend and Mock Frontend  

Microservicio de autenticación backend desarrollado en **Node.js + Express**, encargado de verificar la identidad de un usuario para otorgarle acceso a un sistema, validando credenciales que el usuario proporciona. 
Forma parte del ecosistema de microservicios del proyecto **APP ITS Cipolletti**.

![Node.js](https://img.shields.io/badge/Node.js-v18.0+-green?style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-Framework-blue?style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

</div>

---

## 📚 Tabla de Contenidos
1. [Descripción General](#-descripción-general)
2. [Arquitectura y Tecnologías](#-arquitectura-y-tecnologías)
3. [Estructura del Proyecto](#-estructura-del-proyecto)
4. [Instalación y Ejecución](#️-instalación-y-ejecución)
5. [Configuración de Entorno](#-configuración-de-entorno)
6. [Endpoints Principales](#-endpoints-principales)
7. [Buenas Prácticas y Estilo](#-buenas-prácticas-y-estilo)
8. [Tests y Cobertura](#-tests-y-cobertura)
9. [Tu Contribución](#-tu-contribución)
10. [Contexto del Proyecto](#-contexto-del-proyecto)
11. [Licencia](#-licencia)
12. [Contacto](#-contacto)

---

## 📋 Descripción General

Este backend provee servicios **RESTful** para la gestión académica:

- <span style="font-weight:bold; color:red" >No corresponde a este módulo pero lo hace-> Registro de usuarios(alumnos, profesores,secretarias, administradores).</span>
- Verifica la identidad de un usuario para otorgarle acceso a un sistema.
- Validacion de credenciales que el usuario proporciona.
- El servicio emite tokens de acceso y gestiona sesiones de usuario.
- Permite que el usuario acceda a recursos y aplicaciones. 
- Comunicación entre servicios mediante **HTTP y JSON**.

Diseñado bajo principios de **Clean Architecture** y separación por capas (**routes, controllers, services, models**).

---

## 🏗️ Arquitectura y Tecnologías

| Tecnología | Descripción |
|-------------|--------------|
| **Node.js** | Entorno de ejecución JavaScript |
| **Express.js** | Framework para la creación de APIs REST |
| **MongoDB / Mongoose** | Base de datos NoSQL y ODM |
| **Docker** | Contenerización del entorno |
| **Dotenv** | Gestión de variables de entorno |
| **Jest / Supertest** | Pruebas unitarias y de integración |

📐 **Patrón de diseño aplicado:** `MVC / Clean Architecture`

---

## 📁 Estructura del Proyecto

```bash
src/
 ├── config/          # Configuración general, variables de entorno y conexión DB
 ├── controllers/     # Controladores (lógica de manejo de peticiones)
 ├── routes/          # Definición de rutas de API (endpoints)
 ├── services/        # Lógica de negocio y comunicación con la DB (core)
 ├── models/          # Modelos y esquemas de Mongoose
 ├── middlewares/     # Middlewares personalizados (Autenticación, Autorización)
 ├── utils/           # Funciones auxiliares y manejo de errores
 ├── index.js         # Punto de entrada del servidor

```

## ⚙️ Instalación y Ejecución (ejecutar comandos bash)

1️⃣ Clonar el repositorio.
``` bash
git clone https://github.com/Bitcrunchits/Auth_Service.git
```

2️⃣ Moverse al directorio Auth_Service.

``` bash
cd Auth_Service
```
3️⃣ Instalar dependencias.
``` bash
npm i
```
4️⃣ Configurar variables de entorno

* Crea un archivo .env en la raíz del proyecto.

    PORT=4000 </br>

    DB_URI=mongodb://localhost:27017/AuthService</br>

    JWT_SECRET=super_secreto_y_largo_aqui_la_que_elijas</br>

5️⃣ Ejecutar en desarrollo (el proyecto se encuentra en estado develop).

``` bash
npm run dev
```

## 🔒 Configuración de Entorno

El proyecto usa la librería dotenv para cargar variables de entorno y realiza una validación estricta al inicio de la aplicación para asegurar la disponibilidad y el formato correcto de las variables críticas (DB_URI, JWT_SECRET, etc.).

## 🌐 Endpoints Principales

| 🧩 Módulo | 🔧 Método | 🛣️ Ruta | 📝 Descripción | 👤 Rol Requerido | ⚙️ Estado |
|:-----------|:----------|:--------|:----------------|:----------------|:----------|
| **Auth** | POST | `/api/auth/register` | Registrar nuevo usuario | Público | ✅ |
| **Auth** | POST | `/api/auth/login` | Iniciar sesión y obtener JWT | Público | ✅ |
| **User** | GET | `/api/users/profile` | Obtener perfil del usuario autenticado | Usuario (Cualquier Rol) | ✅ |
| **User** | GET | `/api/users` | Listar todos los usuarios activos | Admin / Secretaria | ✅ |
| **User** | PUT | `/api/users/:id` | Actualizar datos de usuario | Admin / Self-Service | ✅ |
| **User** | DELETE | `/api/users/:id` | Borrado lógico de usuario | Admin / Self-Service | ✅ |
---

## 🧩 Buenas Prácticas y Estilo

✅ Código estructurado por capas y responsabilidades (Controller, Service, Model).</br>
✅ Controladores livianos y servicios reutilizables.</br>
✅ Validaciones de entrada con Joi o Express-validator.</br>
✅ Logs centralizados para depuración.</br>
✅ Cumple principios SOLID y Clean Code.</br>
✅ Manejo de seguridad basado en JWT y middlewares por rol.</br>

## 🧪 Tests y Cobertura

- Ejecutar los tests con:
```bash
npm test
```

- Si se incluyen pruebas unitarias y de integración utilizando Jest + Supertest, la cobertura puede generarse con:
```bash
npm run test:coverage
```
## 🤝Tu Contribución

1. Crea una rama nueva desde la rama develop en tu repositorio local. </br>
Ejemplo:
``` bash
git checkout -b feature/nueva-funcionalidad
```

2. Realiza tus cambios y ejecuta los tests.

3. Crea un Pull Request con descripción detallada.

4. Respeta las convenciones de commits y nombres de ramas del equipo de desarrollo.


---

## 📌 Contexto del Proyecto

<span style="background-color: yellow; color: black" >**Este proyecto fue desarrollado en el marco de la asignatura Desarrollo de software**.</span>

| Rol |Información||
|:-|:-|:-|
| **Asignatura:** | Desarrollo de Software|
| **Profesor:** |<span style="color:cyan">***Arriagada Alejandro***</span> |
| **Alumnos colaboradores:**  | ***Burdiles Adrián, Spagnolo Emiliano, Soto Agustín*** |


---
## 📄 Licencia

Este proyecto está bajo la licencia MIT.
Consulta el archivo LICENSE
 para más información.
</br></br>
<div align="center">
<span style="background-color:yellow; color:black; font-weight:bold">Contacto:</span> </br></br>
Ricardo Burdiles:
Desarrollador Backend | Node.js + Express
|📧 email: burdilesricardo407@gmail.com

🌐 GitHub: https://github.com/Bitcrunchits

</div> 





