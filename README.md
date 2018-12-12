# API

API para HRM

## Instalación

Clonar repositorio y ejecutar

```bash
npm install
npm install -g grunt
```

## Iniciar

```bash
adonis serve --dev
```

## API Ejemplo
    http://localhost:3334/Core/Users/find?nombre=s

## Coneccion a BD
Las conecciones se encuentran en config/database.js
en .env se deben quitar todas las variables DB_* en caso de que existan de lo contrario la aplicación siempre elijirá la configuración de .env por sobre database.js.

## Documentación
Para generar la documentación ejecuta lo siguiente 
```bash
grunt jsdoc
```