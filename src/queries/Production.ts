import { Movie, MovieList, MovieListType, movieListTypes } from "@queries/movie"
import { tmdb } from "@queries/tmdb"
import { TV, TVList, TVListType, tvListTypes } from "@queries/tv"
import { useQueries } from "react-query"

export type ProductionType = "movie" | "tv"

export type Production = Movie | TV

export type ProductionListType = MovieListType | TVListType

const fetchProductionList = (
  productionType: ProductionType,
  listType: ProductionListType,
) =>
  tmdb
    .get(`${productionType}/${listType}`)
    .json<ProductionType extends "movie" ? MovieList : TVList>()

const globalProductionListsQueryFn = async (
  type: ProductionType,
  listType: ProductionListType,
) => ({
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
