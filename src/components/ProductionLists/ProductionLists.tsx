import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { OnProductionPress, ProductionTile } from "@components/ProductionTile"
import { SeparatedBy } from "@components/SeparatedBy"
import {
  Production,
  ProductionType,
  useGlobalProductionLists,
} from "@queries/production"
import React, { VFC } from "react"
import { ScrollView, View } from "react-native"
import tailwind from "tailwind-rn"

export const GlobalProductionLists: VFC<{
  type: ProductionType
  onPress?: OnProductionPress
}> = ({ type, onPress }) => (
  <ProductionLists
    lists={useGlobalProductionLists(type)}
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
            <HorizontalFlatList
              key={list.name}
              title={list.name}
              data={list.productions}
              renderItem={({ item }) => (
                <ProductionTile
                  height={160}
                  production={item}
                  onPress={(id, production) =>
                    onPress?.(list.type, id, production)
                  }
                />
              )}
              keyExtractor={(item) => `${item.id}`}
            />
          ) : null
        })}
      </SeparatedBy>
    </ScrollView>
  )
}
