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

### Creado por Alejandro Soto G.
Estudiante Ingenieria Ciencias de Datos, Instituto Profesional IPG


