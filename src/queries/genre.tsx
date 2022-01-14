import { ProductionType } from "@queries/production"
import { tmdb } from "@queries/tmdb"
import { createContext, FC, useContext } from "react"
import { useQuery } from "react-query"

export type Genre = Partial<{
  id: number
  name: string
}>

const fetchProductionTypeGenres = async (type: ProductionType) =>
  (await tmdb.get(`genre/${type}/list`).json<{ genres?: Genre[] }>()).genres

export const useFetchProductionGenres = (type: ProductionType) =>
  useQuery([type, "genres"], () => fetchProductionTypeGenres(type))

type GenreContextType = {
  tv?: Genre[]
  movie?: Genre[]
}

const defaultValue: GenreContextType = {
  tv: undefined,
  movie: undefined,
}

const GenreContext = createContext<GenreContextType>(defaultValue)

export const useProductionGenres = (type: ProductionType) =>
  useContext(GenreContext)[type]

export const GenreProvider: FC = ({ children }) => (
  <GenreContext.Provider
    value={{
      tv: useFetchProductionGenres("tv").data,
      movie: useFetchProductionGenres("movie").data,
    }}
  >
    {children}
  </GenreContext.Provider>
)
