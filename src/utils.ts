import { format } from "date-fns"

export const shortDate = (date: string | undefined) =>
  date && format(new Date(date), "yyyy MMM")
