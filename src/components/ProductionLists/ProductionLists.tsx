import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { PosterTile } from "@components/PosterTile"
import { SeparatedBy } from "@components/SeparatedBy"
import { productionImageHeight } from "@components/theme"
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
  onPress: (type: ProductionType, id: number, production?: Production) => void
}> = ({ type, onPress }) => (
  <ProductionLists lists={useGlobalProductionLists(type)} onPress={onPress} />
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
              renderItem={({ item }) => {
                const productionId = item.id
                return (
                  <PosterTile
                    height={productionImageHeight}
                    uri={item.poster_path}
                    onPress={
                      productionId
                        ? () => onPress?.(list.type, productionId, item)
                        : undefined
                    }
                  />
                )
              }}
              keyExtractor={(item) => `${item.id}`}
            />
          ) : null
        })}
      </SeparatedBy>
    </ScrollView>
  )
}
