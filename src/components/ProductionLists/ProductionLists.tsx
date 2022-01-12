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
  <ProductionLists lists={useGlobalProductionLists("tv")} onPress={onPress} />
)

export const MovieProductionLists: VFC<{
  onPress?: OnProductionPress
}> = ({ onPress }) => (
  <ProductionLists
    lists={useGlobalProductionLists("movie")}
    onPress={onPress}
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
  onPress?: OnProductionPress
}> = ({ lists, onPress }) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SeparatedBy separator={<View style={tailwind("h-8")} />} start end>
        {lists.map((list) => {
          return list ? (
            <ProductionList
              title={list.name}
              productionType={list.type}
              productions={list.productions}
              onPress={onPress}
              key={list.name}
            />
          ) : null
        })}
      </SeparatedBy>
    </ScrollView>
  )
}
