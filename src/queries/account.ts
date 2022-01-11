import { useAuth } from "@queries/auth"
import { sessionParam, tmdb } from "@queries/tmdb"
import { useQuery } from "react-query"

export type AccountDetail = Partial<{
  avatar: { gravatar: { hash: string } }
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}>

export const fetchAccountDetail = (sessionToken: string) =>
  tmdb
    .get(`account`, { searchParams: sessionParam(sessionToken) })
    .json<AccountDetail>()

export const useAccountDetail = () => {
  const { getSessionToken } = useAuth()
  const token = getSessionToken()
  return useQuery(["account", "detail"], () =>
    token ? fetchAccountDetail(token) : undefined,
  )
}
