import { ProductionList } from "@components/ProductionList"
import { SeparatedBy } from "@components/SeparatedBy"
import { movieListTypes } from "@queries/movie"
import {
  Production,
  ProductionListType,
  productionListTypeToTitle,
  ProductionType,
  useProductionLists,
} from "@queries/production"
import { tvListTypes } from "@queries/tv"
import React, { VFC } from "react"
import { ScrollView, View } from "react-native"
import tailwind from "tailwind-rn"

export const TVProductionLists: VFC<{
  onPress?: (id: number, production: Production) => void
}> = ({ onPress }) => (
  <ProductionLists type="tv" listTypes={tvListTypes} onPress={onPress} />
)

export const MovieProductionLists: VFC<{
  onPress?: (id: number, production: Production) => void
}> = ({ onPress }) => (
  <ProductionLists type="movie" listTypes={movieListTypes} onPress={onPress} />
)

const ProductionLists: VFC<{
  type: ProductionType
  listTypes: readonly ProductionListType[]
  onPress?: (id: number, production: Production) => void
}> = ({ type, listTypes, onPress }) => {
  const lists = useProductionLists(type, listTypes)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SeparatedBy separator={<View style={tailwind("h-8")} />} start end>
        {lists.map(({ data }) => {
          return data?.listType ? (
            <ProductionList
              title={productionListTypeToTitle(data.listType)}
              productions={data?.listPage?.results}
              onPress={onPress}
              key={type + data.listType}
            />
          ) : null
        })}
      </SeparatedBy>
    </ScrollView>
  )
}
