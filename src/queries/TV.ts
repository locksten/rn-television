import { ApiList } from "@queries/TMDB"

export type TV = Partial<{
  poster_path: string
  popularity: number
  id: number
  backdrop_path: string
  vote_average: number
  overview: string
  first_air_date: string
  origin_country: string[]
  genre_ids: number[]
  original_language: string
  vote_count: number
  name: string
  original_name: string
  total_results: number
}>

export type TVList = ApiList<TV>

export const tvListTypes = [
  "airing_today",
  "on_the_air",
  "popular",
  "top_rated",
] as const

export type TVListType = typeof tvListTypes[number]
