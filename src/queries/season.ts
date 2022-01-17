import { Credits } from "@queries/credit"
import { tmdb } from "@queries/tmdb"
import { Videos } from "@queries/video"
import { useQuery } from "react-query"

export type Season = Partial<{
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}>

export type SeasonDetail = Partial<{
  _id: string
  air_date: string
  episodes: Episode[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
}>

export type Episode = Partial<{
  air_date: string
  episode_number: number
  crew: Partial<{
    department: string
    job: string
    credit_id: string
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
  }>[]
  guest_stars: Partial<{
    credit_id: string
    order: number
    character: string
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
  }>[]
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
}>

export type SeasonDetailExtra = SeasonDetail & { credits?: Credits } & {
  videos?: Videos
}

const fetchSeasonDetailExtra = (tvId: number, seasonNumber: number) =>
  tmdb
    .get(`tv/${tvId}/season/${seasonNumber}`, {
      searchParams: "append_to_response=credits,videos",
    })
    .json<SeasonDetailExtra>()

export const useSeasonDetailExtra = (tvId: number, seasonNumber: number) =>
  useQuery(["tv", tvId, "season", seasonNumber], () =>
    fetchSeasonDetailExtra(tvId, seasonNumber),
  )
