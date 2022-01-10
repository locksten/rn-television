import { ProductionList } from "@components/ProductionList"
import { movieListTypes } from "@queries/Movie"
import { ProductionType } from "@queries/Production"
import { tvListTypes } from "@queries/TV"
import React, { VFC } from "react"
import { FlatList, View } from "react-native"
import tailwind from "tailwind-rn"

export const ProductionLists: VFC<{ type: ProductionType }> = ({ type }) => {
  return (
    <FlatList
      data={type === "movie" ? movieListTypes : tvListTypes}
      renderItem={({ item }) => (
        <ProductionList
          key={item}
          productionType={type}
          productionListType={item}
        ></ProductionList>
      )}
      ItemSeparatorComponent={() => <View style={tailwind("h-8")} />}
      ListHeaderComponent={() => <View style={tailwind("h-8")} />}
      ListFooterComponent={() => <View style={tailwind("h-8")} />}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item}
    />
  )
}
