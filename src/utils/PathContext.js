import { createContext } from "react";

export const PathContext = createContext(null);

export function updateNavbar(path, setSArr) {
  if (!path) return;

  if (path.includes("dashboard")) setSArr([true, false, false, false]);
  else if (path.includes("stake")) setSArr([false, true, false, false]);
  else if (path.includes("referral")) setSArr([false, false, true, false]);
  else if (path.includes("profile")) setSArr([false, false, false, true]);
}
