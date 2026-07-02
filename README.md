# Fusion — E-Commerce React

Aplicación de e-commerce desarrollada como proyecto final, utilizando exclusivamente los conceptos vistos en la materia.

## Stack utilizado

- React 18
- Vite
- React Router DOM v6
- Material UI (@mui/material, @mui/icons-material)
- Context API
- Hooks: useState, useEffect, useContext
- Custom Hooks propios
- Fetch API nativa
- JavaScript ES6+

## API utilizada

[Platzi Fake Store API](https://fakeapi.platzi.com/) — `https://api.escuelajs.co/api/v1`

## Funcionalidades

- Navegación de productos con paginado
- Filtro por categoría
- Buscador por nombre
- Detalle de producto
- Carrito de compras (agregar, quitar, modificar cantidad, vaciar)
- Login y registro de usuarios (conectado a la API real)
- Perfil de usuario
- Formulario de contacto
- Página 404

## Estructura de carpetas
src/
├── components/   → componentes reutilizables (Navbar, Footer, ProductCard)
├── pages/        → páginas asociadas a cada ruta
├── contexts/      → CartContext y UserContext (estado global)
├── hooks/        → custom hooks (useProducts, useCategories)
├── services/     → llamadas a la API con fetch
├── routes/       → configuración de React Router
├── utils/        → funciones auxiliares (parseo de imágenes)
└── theme.js      → tema visual de Material UI
## Cómo correr el proyecto

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`

## Usuario de prueba

Para probar el login sin registrarte:

- Email: `john@mail.com`
- Contraseña: `changeme`

También podés registrarte con tus propios datos desde `/registro`.