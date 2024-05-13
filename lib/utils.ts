import http from "http";
import nodeMailer from "nodemailer";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const paths_opted_out_of_main_layout = [
  "/login",
  "/dashboard",
  "/education",
  "/signup",
  "/skills",
];

export function is_opted_path(pathname: string) {
  return paths_opted_out_of_main_layout.find((path: string) =>
    pathname.includes(path)
  );
}

export function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const CTC = {
  "scroll-bar":
    "scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300",
};

export function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(dateString);
  const day = date.getDate();
  const monthName = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][date.getDay()];

  return `${dayOfWeek}, ${day} ${monthName} ${year}`;
}
