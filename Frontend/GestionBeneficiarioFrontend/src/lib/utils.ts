import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toDateInputValue(value: unknown): string {
  if (!value) return "";

 
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

 
  if (typeof value === "string") return value.slice(0, 10);


  if (value instanceof Date && !isNaN(value.getTime())) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  return "";
}
