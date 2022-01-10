import { Movie, MovieList, MovieListType } from "@queries/Movie"
import { tmdb } from "@queries/TMDB"
import { TV, TVList, TVListType } from "@queries/TV"
import { useQuery } from "react-query"

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

export const useProductionList = (
  productionType: ProductionType,
  listType: ProductionListType,
) =>
  useQuery([productionType, listType], () =>
    fetchProductionList(productionType, listType),
  )

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
