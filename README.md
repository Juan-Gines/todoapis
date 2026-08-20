# TodoApis

TodoApis compara distintas implementaciones del mismo dominio: productos de una cesta. Un único frontend permite seleccionar una API y un motor de persistencia para consultar el listado, mientras las APIs exponen el mismo conjunto de rutas CRUD sobre MySQL, PostgreSQL, SQL Server o MongoDB.

## Alcance comprobado

| Capa | Implementación |
| --- | --- |
| Frontend | Astro con componentes React y Tailwind CSS (`client/`) |
| APIs | Node.js/Express, Laravel y ASP.NET 8 (`apis/`) |
| Persistencia | MySQL, PostgreSQL, SQL Server y MongoDB |
| Recurso | `products`: listado, alta, actualización de `onbasket` y eliminación |

La selección de base de datos se transmite con el encabezado `x-db-type`. Los valores aceptados por las APIs son `mysql`, `postgres`, `sqlserver` y `mongodb`.

## Flujo y límite actual del cliente

El formulario del frontend permite elegir `node`, `laravel` o `net`, junto con una de las cuatro bases de datos. Esa combinación determina la **consulta del listado** (`GET`), que se envía a la URL configurada para la API seleccionada y con `x-db-type`.

Las operaciones de alta, actualización y eliminación que implementa hoy el cliente están dirigidas explícitamente a `PUBLIC_NODE_SERVER`, aunque se haya elegido Laravel o ASP.NET para el listado. Por lo tanto, el selector no ejecuta todavía el CRUD completo contra cualquier combinación API/base de datos desde la interfaz. Las tres APIs sí definen sus propios endpoints CRUD y seleccionan la conexión mediante `x-db-type`.

## Endpoints de productos

Las tres implementaciones exponen el recurso en `/api/products`:

| Operación | Ruta |
| --- | --- |
| Listar | `GET /api/products` |
| Crear | `POST /api/products` |
| Actualizar estado | `PATCH /api/products/{id}` |
| Eliminar | `DELETE /api/products/{id}` |

Incluye el encabezado `x-db-type` en cada solicitud. Por ejemplo:

```http
GET /api/products
x-db-type: postgres
```

## Estructura

```text
client/        Aplicación Astro/React y sus variables públicas de servidores
apis/node/     API Express
apis/laravel/  API Laravel
apis/net/      API ASP.NET
BBDD/          Scripts de creación para MySQL, PostgreSQL y SQL Server
```

Para MongoDB no hay script: crea una base `basket` en tu instancia. Los scripts SQL están en `BBDD/`.

## Ejecución local

Antes de iniciar servicios, crea los archivos `.env` a partir de los ejemplos disponibles y completa exclusivamente tus credenciales locales. No publiques ni subas esos archivos.

### 1. Preparar las bases de datos

1. Crea las instancias de MySQL, PostgreSQL, SQL Server y/o MongoDB que vayas a utilizar.
2. Ejecuta el script correspondiente de `BBDD/` para las bases SQL.
3. Configura las credenciales de cada motor en los `.env` de las APIs que vayas a arrancar.

La API Node no incluye un `.env.example`; requiere estas variables: `MONGODB_URI`, `MYSQL_HOST`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`, `POSTGRES_URI`, `SQLSERVER_USER`, `SQLSERVER_PASSWORD`, `SQLSERVER_HOST` y `SQLSERVER_DATABASE`. Opcionalmente, `PORT` define su puerto; por defecto usa `3000`.

### 2. Configurar e iniciar las APIs

**Node/Express**

```bash
cd apis/node
npm install
npm start
```

**Laravel**

```bash
cd apis/laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

Completa las conexiones MySQL, PostgreSQL, SQL Server y MongoDB en `apis/laravel/.env` antes de usar cada valor de `x-db-type`.

**ASP.NET**

```bash
cd apis/net
cp .env.example .env
dotnet restore
dotnet run
```

El `.env.example` de ASP.NET declara `MYSQL_CONNECTION`, `SQLSERVER_CONNECTION`, `POSTGRES_CONNECTION` y `MONGODB_CONNECTION`.

Para probar la comparación de lecturas desde la interfaz, inicia la API que vayas a elegir y Node (este último es necesario para las mutaciones actuales). Inicia las tres APIs si quieres alternar entre todas sin reiniciarlas.

### 3. Configurar e iniciar el cliente

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

`client/.env.example` define las URLs locales esperadas:

```dotenv
PUBLIC_NODE_SERVER=http://localhost:3000/api/products
PUBLIC_LARAVEL_SERVER=http://localhost:8000/api/products
PUBLIC_NET_SERVER=http://localhost:5000/api/products
```

Adáptalas a los puertos que informen los servicios antes de abrir la URL que muestre Astro. Elige una API y una base de datos en el formulario para cargar productos.

## Requisitos

- Node.js y npm para el cliente y la API Express.
- PHP 8.2+ y Composer para Laravel.
- .NET SDK 8 para ASP.NET.
- Instancias accesibles de las bases de datos que se quieran probar.
