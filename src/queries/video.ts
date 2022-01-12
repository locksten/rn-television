import { shortDate } from "src/utils"

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
  return video?.published_at && shortDate(video.published_at)
}
