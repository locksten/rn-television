import { ApiList } from "@queries/TMDB"

export type Movie = Partial<{
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}>

export type MovieList = ApiList<Movie>

export const movieListTypes = [
  "popular",
  "now_playing",
  "top_rated",
  "upcoming",
] as const

export type MovieListType = typeof movieListTypes[number]
