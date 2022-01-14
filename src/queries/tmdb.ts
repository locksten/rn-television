import Constants from "expo-constants"
import ky from "ky"

export const sessionParam = (sessionToken: string) => ({
  session_id: sessionToken,
})

const tmdbAccessToken = Constants.manifest?.extra?.tmdbAccessToken
if (!tmdbAccessToken) console.error("TMDB Access Token missing")

export const tmdb = ky.create({
  prefixUrl: "https://api.themoviedb.org/3",
  throwHttpErrors: false,
  headers: {
    Authorization: `Bearer ${tmdbAccessToken}`,
    "Content-Type": "application/json;charset=utf-8",
  },
})

export const tmdbImagePrefixUrl = "https://image.tmdb.org/t/p/"

export type ApiList<T> = Partial<{
  results: T[]
  page: number
  total_pages: number
  total_results: number
}>
