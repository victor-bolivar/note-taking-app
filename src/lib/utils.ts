import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTitleFromNote(html: string) {
  const match = html.match(/<h1>(.*?)<\/h1>/i);
  return match ? match[1] : "";
}

export function getContentFromNote(html: string) {
  // TODO checkout how Evernote does this
  let text = html.replace(/<h1>.*?<\/h1>/i, ""); // Remove first <h1> occurrence
  text = text.replace(/<[^>]+>/g, "").trim(); // Remove all tags and extra spaces
  return text.slice(0, 300); // Truncate to 300 characters
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