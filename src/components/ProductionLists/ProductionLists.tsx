import { ProductionList } from "@components/ProductionList"
import { SeparatedBy } from "@components/SeparatedBy"
import { movieListTypes } from "@queries/Movie"
import {
  Production,
  ProductionListType,
  productionListTypeToTitle,
  ProductionType,
  useProductionList,
} from "@queries/Production"
import { tvListTypes } from "@queries/TV"
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
}> = ({ type, listTypes, onPress }) => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <SeparatedBy separator={<View style={tailwind("h-8")} />} start end>
      {listTypes.map((listType) => {
        const { data } = useProductionList(type, listType)
        return (
          <ProductionList
            title={productionListTypeToTitle(listType)}
            productions={data?.results}
            onPress={onPress}
            key={type + listType}
          />
        )
      })}
    </SeparatedBy>
  </ScrollView>
)
