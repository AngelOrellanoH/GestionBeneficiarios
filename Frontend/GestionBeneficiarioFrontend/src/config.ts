export const API_URL = import.meta.env.VITE_API_URL as string;

if (!API_URL) {
  throw new Error("Falta definir VITE_API_URL en el archivo .env");
}
