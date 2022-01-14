import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { OnProductionPress, ProductionTile } from "@components/ProductionTile"
import React, { ComponentType } from "react"

export const ProductionList: <
  T extends { poster_path?: string; id?: number },
>(props: {
  title: string
  productions?: T[]
  onPress?: OnProductionPress
  RenderDescription?: ComponentType<{ production: T }>
}) => React.ReactElement | null = ({
  title,
  productions,
  RenderDescription,
  onPress,
}) => (
  <HorizontalFlatList
    title={title}
    data={productions}
    renderItem={({ item }) => (
      <ProductionTile
        production={item}
        RenderDescription={RenderDescription}
        onPress={onPress}
      />
    )}
    keyExtractor={(item) => `${item.id}`}
  />
)
