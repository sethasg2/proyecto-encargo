# Proyecto Encargo – Backend API

Este es un proyecto backend hecho con **Node.js**, **Express** y **Redis**.  
La idea es tener un sistema simple donde se pueda iniciar sesión, cerrar sesión y manejar recursos protegidos.  
Este README explica cómo ejecutar el proyecto localmente y también incluye documentación técnica.

---

## Requisitos antes de empezar

Para poder usar este proyecto necesitas tener instalado:

- Node.js (versión 18 o superior)
- Redis (para manejar sesiones)
- Visual Studio Code (opcional pero recomendado)
- Thunder Client o Postman (para probar la API)

---

## Cómo ejecutar el proyecto localmente

### 1. Descargar el proyecto
Usa este comando:

```bash
git clone https://github.com/sethasg2/proyecto-encargo
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Encender Redis

```bash
cd C:\redis
.\redis-server.exe
```

### 4. Crear archivo .env

```bash
PORT=4000
REDIS_URL=redis://127.0.0.1:6379
SESSION_SECRET=supersecret
```

### 5. Iniciar servidor en la terminal del proyecto

```bash
npm run dev
```

### Cómo probar la API

### 1. Login

POST  

http://localhost:4000/api/auth/login

Body:

```bash
{
  "username": "admin",
  "password": "adminpass"
}
```
### 2. Logout

POST  

http://localhost:4000/api/auth/logout

### 3. Obtener recursos (requiere login)

GET  

http://localhost:4000/api/resources

### 4. Crear recurso

POST  

http://localhost:4000/api/resources

Body:

```bash
{
  "name": "Primer recurso",
  "description": "Recurso de prueba"
}
```

### 5. Actualizar recurso

PUT  

http://localhost:4000/api/resources/1

Body:

```bash
{
  "name": "Recurso actualizado",
  "description": "Descripción nueva"
}

```

### Estructura del Proyecto

```bash
src/
 ├── controllers/      # Lógica de cada ruta
 ├── middlewares/      # Validaciones y protección de rutas
 ├── models/           # Datos o estructuras
 ├── routes/           # Endpoints de la API
 ├── services/         # Funciones auxiliares
 └── server.js         # Punto de entrada del servidor
```

###  Recursos

Cada recurso tiene:

id
name
description
createdAt
updatedAt (si se actualiza)

### Rutas Principales

Auth

```bash
POST /api/auth/login
POST /api/auth/logout
```

Resources

```bash
GET /api/resources
POST /api/resources
PUT /api/resources/:id
```


### Creado por Alejandro Soto G.
Estudiante Ingenieria Ciencias de Datos, Instituto Profesional IPG


