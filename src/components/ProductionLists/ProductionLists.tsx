import { ProductionList } from "@components/ProductionList"
import { SeparatedBy } from "@components/SeparatedBy"
import { movieListTypes } from "@queries/Movie"
import { ProductionType } from "@queries/Production"
import { tvListTypes } from "@queries/TV"
import React, { VFC } from "react"
import { ScrollView, View } from "react-native"
import tailwind from "tailwind-rn"

export const ProductionLists: VFC<{ type: ProductionType }> = ({ type }) => {
  const data = type === "movie" ? movieListTypes : tvListTypes
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SeparatedBy separator={<View style={tailwind("h-8")} />} start end>
        {data.map((item) => (
          <ProductionList
            productionType={type}
            productionListType={item}
            key={type + item}
          />
        ))}
      </SeparatedBy>
    </ScrollView>
  )
}
