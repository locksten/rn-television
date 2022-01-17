import { Season } from "@queries/season"
import { ApiList } from "@queries/tmdb"

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
}>

export type TVList = ApiList<TV>

export const tvListTypes = [
  "airing_today",
  "on_the_air",
  "popular",
  "top_rated",
] as const

export type TVListType = typeof tvListTypes[number]

export type TVDetail = Partial<{
  backdrop_path: string
  created_by: Partial<{
    id: number
    credit_id: string
    name: string
    gender: number
    profile_path: string
  }>[]
  episode_run_time: number[]
  first_air_date: string
  genres: Partial<{
    id: number
    name: string
  }>[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: Partial<{
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    production_code: string
    season_number: number
    still_path: string
    vote_average: number
    vote_count: number
  }>
  name: string
  next_episode_to_air: null
  networks: Partial<{
    name: string
    id: number
    logo_path: string
    origin_country: string
  }>[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Partial<{
    id: number
    logo_path: string
    name: string
    origin_country: string
  }>[]
  production_countries: Partial<{
    iso_3166_1: string
    name: string
  }>[]
  seasons: Season[]
  spoken_languages: Partial<{
    english_name: string
    iso_639_1: string
    name: string
  }>[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}>
