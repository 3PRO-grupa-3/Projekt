import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getUTCDate()).padStart(2, "0"); // Ensures two digits
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
}
