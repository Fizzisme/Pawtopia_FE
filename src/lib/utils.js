import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const buildUrl = (pathname) => window.location.protocol + "//" + window.location.host + pathname;
