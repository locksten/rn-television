import { Session, useAuth } from "@queries/auth"
import { MovieList } from "@queries/movie"
import { sessionParam, tmdb } from "@queries/tmdb"
import { TVList } from "@queries/tv"
import { useQueries, useQuery } from "react-query"

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
  const token = useAuth().getSession()?.token
  return useQuery(["account", "detail"], () =>
    token ? fetchAccountDetail(token) : undefined,
  )
}

const accountProductionLists = [
  {
    name: "Show Watchlist ",
    uriFn: (id: number) => `account/${id}/watchlist/tv`,
  },
  {
    name: "Movie Watchlist ",
    uriFn: (id: number) => `account/${id}/watchlist/movies`,
  },
  {
    name: "Favorite Shows",
    uriFn: (id: number) => `account/${id}/favorite/tv`,
  },
  {
    name: "Favorite Movies",
    uriFn: (id: number) => `account/${id}/favorite/movies`,
  },
]

const fetchAccountProductionList = async (
  uriFn: (id: number) => string,
  { id, token }: Session,
) =>
  tmdb
    .get(uriFn(id), { searchParams: sessionParam(token) })
    .json<MovieList | TVList | undefined>()

export const useAccountProductionLists = () => {
  const session = useAuth().getSession()
  return useQueries(
    accountProductionLists.map(({ name, uriFn }) => ({
      queryKey: ["account", name],
      queryFn: async () => {
        if (!session) return
        const productions = (await fetchAccountProductionList(uriFn, session))
          ?.results
        return productions?.length === 0
          ? undefined
          : {
              name,
              productions,
            }
      },
    })),
  )?.map((list) => list.data)
}
