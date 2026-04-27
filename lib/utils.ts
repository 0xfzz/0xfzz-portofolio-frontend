import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.0xfzz.my.id';
  return url.endsWith('/') ? url.slice(0, -1) : url;
}
