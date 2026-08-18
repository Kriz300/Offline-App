import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const typesDir = path.join(__dirname, "types");
const files = await readdir(typesDir);

const functions = {};

for (const file of files) {
  if (!file.endsWith(".js")) {
    continue;
  }

  const name = path.basename(file, ".js");
  const filePath = path.join(typesDir, file);

  console.log(`Cargando: ${name}`);
  console.log(`Ruta: ${filePath}`);

  const module = await import(pathToFileURL(filePath).href);

  if (typeof module.default !== "function") {
    throw new TypeError(
      `El archivo "${file}" debe exportar una función por default`
    );
  }

  functions[name] = module.default;
}

export default functions;