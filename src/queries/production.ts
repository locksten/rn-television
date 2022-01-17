import { ProductionAccountStates } from "@queries/account"
import { Session, useAuth } from "@queries/auth"
import { Credits } from "@queries/credit"
import {
  Movie,
  MovieDetail,
  MovieList,
  MovieListType,
  movieListTypes,
} from "@queries/movie"
import { sessionParam, tmdb } from "@queries/tmdb"
import { TV, TVDetail, TVList, TVListType, tvListTypes } from "@queries/tv"
import { Videos } from "@queries/video"
import { useQueries, useQuery } from "react-query"

export type Production = Movie | TV

export type ProductionType = "movie" | "tv"

export type ProductionList = MovieList | TVList

export type ProductionDetail = MovieDetail | TVDetail

export type ProductionDetailExtra = MovieDetailExtra | TVDetailExtra

export type ProductionListType = MovieListType | TVListType

const fetchProductionList = <T extends ProductionType>(
  productionType: T,
  listType: ProductionListType,
) =>
  tmdb
    .get(`${productionType}/${listType}`)
    .json<T extends "movie" ? MovieList : TVList>()

const globalProductionListsQueryFn = async (
  type: ProductionType,
  listType: ProductionListType,
) => ({
  type,
  name: productionListTypeToTitle(listType),
  productions: (await fetchProductionList(type, listType))?.results,
})

export const useGlobalProductionLists = (type: ProductionType) => {
  return useQueries(
    (type === "movie" ? movieListTypes : tvListTypes).map((listType) => {
      return {
        queryKey: [type, listType],
        queryFn: () => globalProductionListsQueryFn(type, listType),
      }
    }),
  )?.map((list) => list.data)
}

export const productionListTypeToTitle = (type: ProductionListType) => {
  switch (type) {
    case "airing_today":
      return "Airing Today"
    case "now_playing":
      return "Now Playing"
    case "on_the_air":
      return "On the Air"
    case "popular":
      return "Popular"
    case "top_rated":
      return "Top Rated"
    case "upcoming":
      return "Upcoming"
  }
}

const fetchProductionAccountStates = (
  type: ProductionType,
  id: number,
  { token }: Session,
) =>
  tmdb
    .get(`${type}/${id}/account_states`, {
      searchParams: sessionParam(token),
    })
    .json<ProductionAccountStates>()

export const useProductionAccountStates = (
  type: ProductionType,
  id: number,
) => {
  const session = useAuth().getSession()
  return useQuery(
    [type, id, "accountStates"],
    () => session && fetchProductionAccountStates(type, id, session),
  )
}

const fetchProductionSimilar = (type: ProductionType, id: number) =>
  tmdb.get(`${type}/${id}/similar`).json<ProductionList>()

export const useProductionSimilar = (type: ProductionType, id: number) =>
  useQuery([type, id, "similar"], () => fetchProductionSimilar(type, id))

const fetchProductionRecommendations = (type: ProductionType, id: number) =>
  tmdb.get(`${type}/${id}/recommendations`).json<ProductionList>()

export const useProductionRecommendations = (
  type: ProductionType,
  id: number,
) =>
  useQuery([type, id, "recommendation"], () =>
    fetchProductionRecommendations(type, id),
  )

export type MovieDetailExtra = MovieDetail & { credits?: Credits } & {
  videos?: Videos
}

export type TVDetailExtra = TVDetail & { credits?: Credits } & {
  videos?: Videos
}

const fetchProductionDetailExtra = <T extends ProductionType>(
  type: T,
  id: number,
) =>
  tmdb
    .get(`${type}/${id}`, { searchParams: "append_to_response=credits,videos" })
    .json<T extends "movie" ? MovieDetailExtra : TVDetailExtra>()

export const useProductionDetailExtra = <T extends ProductionType>(
  type: T,
  id: number,
) =>
  useQuery([type, id, "detail", "extra"], () =>
    fetchProductionDetailExtra(type, id),
  )
