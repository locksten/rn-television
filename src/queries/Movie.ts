import { tmdb, ApiList } from "@queries/tmdb"
import { useQuery } from "react-query"

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

const fetchMovieDetail = (id: number) =>
  tmdb.get(`movie/${id}`).json<MovieDetail>()

export const useMovieDetail = (id: number) =>
  useQuery(["movie", id, "detail"], () => fetchMovieDetail(id))

export type MovieDetail = Partial<{
  adult: boolean
  backdrop_path: string
  belongs_to_collection: object
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    name: string
    id: number
    logo_path: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    iso_639_1: string
    name: string
  }[]
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
