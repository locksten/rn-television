import { ApiList } from "@queries/tmdb"

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
  "now_playing",
  "upcoming",
  "popular",
  "top_rated",
] as const

export type MovieListType = typeof movieListTypes[number]

export type MovieDetail = Partial<{
  adult: boolean
  backdrop_path: string
  belongs_to_collection: object
  budget: number
  genres: Partial<{
    id: number
    name: string
  }>[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Partial<{
    name: string
    id: number
    logo_path: string
    origin_country: string
  }>[]
  production_countries: Partial<{
    iso_3166_1: string
    name: string
  }>[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Partial<{
    iso_639_1: string
    name: string
  }>[]
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Cancelled"
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}>
