import { OnProductionPress, ProductionTile } from "@components/ProductionTile"
import { SectionTitle } from "@components/SectionTitle"
import { Production, ProductionType } from "@queries/production"
import React, { VFC } from "react"
import { FlatList, View } from "react-native"
import tailwind from "tailwind-rn"

export const ProductionList: VFC<{
  title: string
  productionType: ProductionType
  productions?: Production[]
  onPress?: OnProductionPress
}> = ({ productionType, title, productions, onPress }) => {
  return productions && productions?.length !== 0 ? (
    <View>
      <SectionTitle title={title} />
      <FlatList
        style={tailwind("h-40")}
        data={productions}
        horizontal
        renderItem={({ item }) => (
          <ProductionTile
            key={item.id}
            type={productionType}
            production={item}
            onPress={onPress}
          />
        )}
        ItemSeparatorComponent={() => <View style={tailwind("w-2")} />}
        ListHeaderComponent={() => <View style={tailwind("w-4")} />}
        ListFooterComponent={() => <View style={tailwind("w-4")} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  ) : null
}
