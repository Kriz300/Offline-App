# Offline-App
Aplicación web capaz de operar en un dispositivo o en una red de forma local y autonoma. Con capacidad de almacenar datos de forma local y enviarlos a un endpoint remoto de forma automatica y asincrona.
## Ejecución y Comandos 🔧

Instalar [Nodejs](https://nodejs.org/en/download)
Instalar [.Net8](https://dotnet.microsoft.com/es-es/download/dotnet/8.0)

### Ejecución de procesos
Frontend.
```
cd offline-app-Gosocket
npm install -y
npm run dev
```
Local Backend.
```
cd offline-app-Gosocket
npm run server
```
Remote Backend.
```
cd "Backend .Net\remoteApi"
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 8.0.30
dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.30
dotnet tool install --global dotnet-ef --version 8.0.30
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet watch run
```
## Estructura 🛠️
El sistema consta de tres elementos, un **Frontend**(React+Node.js), un **Backend Local**(Nodejs con SQLite) y un **Backend Remoto**(.Net). Todos los elementos son independientes entre si y pueden escalar de forma modular.

La idea de tener un Backend Local se basa en poder tener mayor control de la base de datos SQL, asegurando congruencia junto con persistencia, además, de concentrar los datos de toda una red local en caso de ser necesario.

### Construido con:

* **React**
* **Node.js**
* **.Net**
* **Typescript**
* **SQLite**
* **Javascript**
* **C#**

## Autores ✒️

* **Christian Muñoz I.** [Kriz](https://github.com/Kriz300)

## Licencia 📄

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.
