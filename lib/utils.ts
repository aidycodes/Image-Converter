import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type Formats = 'jpg' | 'png' | 'webp' | 'gif' | 'jp2' | 'tiff' | 'avif' | 'heif' | 'jxl' | 'raw' 

export function isValidFormat(format: string): format is Formats {
  return ['jpg', 'png', 'webp', 'gif', 'jp2', 'tiff', 'avif', 'heif', 'jxl', 'raw'].includes(format)
}