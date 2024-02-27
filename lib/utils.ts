import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const paths_opted_out_of_main_layout = ["/login", "/dashboard"];

export function is_opted_path(pathname: string) {
  return paths_opted_out_of_main_layout.find((path: string) =>
    pathname.includes(path)
  );
}
