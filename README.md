# Sistema de Gestión de Beneficiarios

Caso de Evaluación – Practicante Programador Full Stack  
Enero 2026

---

## a. Instrucciones de instalación

### Requisitos previos

- .NET SDK instalado
- SQL Server instalado
- Gestor de base de datos (SQL Server Management Studio)
- Navegador web moderno

---

## b. Instrucciones para ejecutar el proyecto

### Backend (.NET Web API)

1. Ingresar a la carpeta del backend:
```bash
cd backend
```
2. Configurar la cadena de conexión a SQL Server en el archivo 

```bash
appsettings.json
```
3. Restaurar dependencias y ejecutar la API:

```bash
dotnet restore
dotnet run
```

4. Verificar que la API se encuentre activa en la URL configurada (por ejemplo https://localhost:7142).

### Frontend (React + Vite)

1. Ingresar a la carpeta del frontend:
```bash

cd frontend
```

2. Instalar dependencias del proyecto:
```bash
npm install
```

3. Ejecutar la aplicación:
```bash
npm run dev
```

4. Acceder a la aplicación desde el navegador (por defecto http://localhost:5173).

---

## c. Scripts de base de datos

1. Crear una base de datos en SQL Server.

2. Ejecutar los scripts ubicados en la carpeta /database:

- Script de creación de tablas.

- Script de stored procedures.

- Script de inserción de datos de ejemplo para la tabla DocumentoIdentidad.

3. Verificar que los documentos de identidad se encuentren activos para su correcto consumo desde el frontend.


