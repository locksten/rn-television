import { tmdbImagePrefixUrl } from "@queries/tmdb"

export const stillImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "original" + path

export const posterImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w500" + path

export const creditImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w185" + path
