export const shortDate = (date: string | undefined) => {
  if (!date) return undefined
  const dateObj = new Date(date)
  const month = dateObj?.toLocaleString("default", {
    month: "short",
  })
  const year = dateObj?.toLocaleString("default", {
    year: "numeric",
  })
  return `${year} ${month}`
}
