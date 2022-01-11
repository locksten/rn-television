import { ProductionTile } from "@components/ProductionTile"
import {
  ProductionListType,
  productionListTypeToTitle,
  ProductionType,
  useProductionList,
} from "@queries/Production"
import React, { VFC } from "react"
import { FlatList, Text, View } from "react-native"
import tailwind from "tailwind-rn"

export const ProductionList: VFC<{
  productionType: ProductionType
  productionListType: ProductionListType
}> = ({ productionType, productionListType }) => {
  const { data } = useProductionList(productionType, productionListType)
  return (
    <View>
      <Text style={tailwind("pl-4 pb-2 font-bold text-2xl")}>
        {productionListTypeToTitle(productionListType)}
      </Text>
      <FlatList
        style={tailwind("h-40")}
        data={data?.results}
        horizontal
        renderItem={({ item }) => (
          <ProductionTile key={item.id} production={item} />
        )}
        ItemSeparatorComponent={() => <View style={tailwind("w-2")} />}
        ListHeaderComponent={() => <View style={tailwind("w-4")} />}
        ListFooterComponent={() => <View style={tailwind("w-4")} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  )
}
