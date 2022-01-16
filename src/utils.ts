import { format } from "date-fns"

export const shortDate = (date: string | undefined) => {
  try {
    return date && format(new Date(date), "yyyy MMM")
  } catch {
    return undefined
  }
}

export const withNonBreakingSpaces = (string?: string) =>
  string?.replace(/\s/g, "\u00a0")
