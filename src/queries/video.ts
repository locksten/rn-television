export type Video = Partial<{
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}>

export type Videos = Partial<{
  id: number
  results: Video[]
}>

export const videoToShortDate = (video?: Video) => {
  if (!video?.published_at) return undefined

  const date = new Date(video.published_at)
  const month = date?.toLocaleString("default", {
    month: "short",
  })
  const year = date?.toLocaleString("default", {
    year: "numeric",
  })

  return `${year} ${month}`
}
