# Offline-App
Aplicación web capaz de operar en un dispositivo o en una red de forma local y autonoma. Con capacidad de almacenar datos de forma local y enviarlos a un endpoint remoto de forma automatica y asincrona.
## Ejecución y Comandos 🔧

Instalar [Nodejs](https://nodejs.org/en/download)
Instalar [.Net8](https://dotnet.microsoft.com/es-es/download/dotnet/8.0)

### Ejecución de procesos
Frontend.
```
cd offline-app-Gosocket
npm run dev
```
Local Backend.
```
cd offline-app-Gosocket
npm run server
```
Remote Backend.
```
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet watch run
```
## Estructura 🛠️

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
