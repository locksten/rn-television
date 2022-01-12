import { ProductionList } from "@components/ProductionList"
import { OnProductionPress } from "@components/ProductionTile"
import { SeparatedBy } from "@components/SeparatedBy"
import {
  Production,
  ProductionType,
  useGlobalProductionLists,
} from "@queries/production"
import React, { VFC } from "react"
import { ScrollView, View } from "react-native"
import tailwind from "tailwind-rn"

export const TVProductionLists: VFC<{
  onPress?: OnProductionPress
}> = ({ onPress }) => (
  <ProductionLists
    lists={useGlobalProductionLists("tv")}
    onPress={(_, id, production) => onPress?.(id, production)}
  />
)

export const MovieProductionLists: VFC<{
  onPress?: OnProductionPress
}> = ({ onPress }) => (
  <ProductionLists
    lists={useGlobalProductionLists("movie")}
    onPress={(_, id, production) => onPress?.(id, production)}
  />
)

export const ProductionLists: VFC<{
  lists: (
    | {
        type: ProductionType
        name: string
        productions: Production[] | undefined
      }
    | undefined
  )[]
  onPress?: (type: ProductionType, id: number, production: Production) => void
}> = ({ lists, onPress }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SeparatedBy separator={<View style={tailwind("h-8")} />} start end>
        {lists.map((list) => {
          return list ? (
            <ProductionList
              title={list.name}
              productions={list.productions}
              onPress={(id, production) => onPress?.(list.type, id, production)}
              key={list.name}
            />
          ) : null
        })}
      </SeparatedBy>
    </ScrollView>
  )
}
