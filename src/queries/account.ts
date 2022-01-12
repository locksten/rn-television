import { Session, useAuth } from "@queries/auth"
import { ProductionList, ProductionType } from "@queries/production"
import { sessionParam, tmdb } from "@queries/tmdb"
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

const accountProductionLists: {
  type: ProductionType
  name: string
  uriFn: (id: number) => string
}[] = [
  {
    type: "tv",
    name: "Show Watchlist",
    uriFn: (id: number) => `account/${id}/watchlist/tv`,
  },
  {
    type: "movie",
    name: "Movie Watchlist",
    uriFn: (id: number) => `account/${id}/watchlist/movies`,
  },
  {
    type: "tv",
    name: "Favorite Shows",
    uriFn: (id: number) => `account/${id}/favorite/tv`,
  },
  {
    type: "movie",
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
    .json<ProductionList | undefined>()

export const useAccountProductionLists = () => {
  const session = useAuth().getSession()
  return useQueries(
    accountProductionLists.map(({ type, name, uriFn }) => ({
      queryKey: ["account", "productionList", name],
      queryFn: async () => {
        if (!session) return
        const productions = (await fetchAccountProductionList(uriFn, session))
          ?.results
        return productions?.length === 0
          ? undefined
          : {
              type,
              name,
              productions,
            }
      },
    })),
  )?.map((list) => list.data)
}

export const fetchSetProductionFavoriteOrWatchlistState = async (
  session: Session,
  type: "favorite" | "watchlist",
  productionType: ProductionType,
  id: number,
  state: boolean,
) => {
  try {
    await tmdb
      .post(`account/${session.id}/${type}`, {
        searchParams: sessionParam(session.token),
        throwHttpErrors: true,
        json: { media_type: productionType, media_id: id, [type]: state },
      })
      .json()
    return true
  } catch {
    return false
  }
}

export type ProductionAccountStates = Partial<{
  id: number
  favorite: boolean
  rated:
    | boolean
    | {
        value: number
      }
  watchlist: boolean
}>
