import { Credits } from "@queries/credit"
import { tmdb } from "@queries/tmdb"
import { Videos } from "@queries/video"
import { useQuery } from "react-query"

export type EpisodeDetail = Partial<{
  air_date: string
  crew: Partial<{
    id: number
    credit_id: string
    name: string
    department: string
    job: string
    profile_path: string
  }>[]
  episode_number: number
  guest_stars: Partial<{
    id: number
    name: string
    credit_id: string
    character: string
    order: number
    profile_path: string
  }>[]
  name: string
  overview: string
  id: number
  production_code: string
  season_number: number
  still_path: string
  vote_average: number
  vote_count: number
}>

export type EpisodeDetailExtra = EpisodeDetail & { credits?: Credits } & {
  videos?: Videos
}

const fetchEpisodeDetailExtra = (
  tvId: number,
  seasonNumber: number,
  episodeNumber: number,
) =>
  tmdb
    .get(`tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`, {
      searchParams: "append_to_response=credits,videos",
    })
    .json<EpisodeDetailExtra>()

export const useEpisodeDetailExtra = (
  tvId: number,
  seasonNumber: number,
  episodeNumber: number,
) =>
  useQuery(["tv", tvId, "season", seasonNumber, "episode", episodeNumber], () =>
    fetchEpisodeDetailExtra(tvId, seasonNumber, episodeNumber),
  )
