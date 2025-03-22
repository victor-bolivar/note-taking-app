import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function timeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "s"],
    [3600, "min"],
    [86400, "h"],
    [604800, "d"],
    [2592000, "mo"],
    [31536000, "y"],
  ];

  for (let i = 0; i < intervals.length; i++) {
    const [limit, unit] = intervals[i];
    if (seconds < limit) {
      const value = Math.floor(seconds / (i === 0 ? 1 : intervals[i - 1][0]));
      return `${value}${unit}`;
    }
  }

  return date.toISOString().split("T")[0];
}