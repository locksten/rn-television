import { ProductionDetailSimilar } from "@components/ProductionDetailSimilar"
import { TVHomeScreenParams } from "@components/TVHomeScreen"
import { useTVDetail, useTVSimilar } from "@queries/TV"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { Text, ScrollView } from "react-native"

export const TVDetailScreen: VFC<
  NativeStackScreenProps<TVHomeScreenParams, "Detail">
> = ({
  route: {
    params: { id, production },
  },
  navigation,
}) => {
  const detail = { ...production, ...useTVDetail(id)?.data }
  const similar = useTVSimilar(id)?.data
  return (
    <ScrollView>
      <Text>{id}</Text>
      <Text>{detail?.name}</Text>
      <Text>{detail?.overview}</Text>
      <ProductionDetailSimilar
        navigation={navigation}
        productions={similar?.results}
      />
    </ScrollView>
  )
}
