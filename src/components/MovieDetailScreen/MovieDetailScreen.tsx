import { MovieHomeScreenParams } from "@components/MovieHomeScreen"
import { ProductionDetailSimilar } from "@components/ProductionDetailSimilar"
import { useMovieDetail, useMovieSimilar } from "@queries/Movie"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { ScrollView, Text } from "react-native"

export const MovieDetailScreen: VFC<
  NativeStackScreenProps<MovieHomeScreenParams, "Detail"> & { other: number }
> = ({
  route: {
    params: { id, production },
  },
  navigation,
}) => {
  const detail = { ...production, ...useMovieDetail(id)?.data }
  const similar = useMovieSimilar(id)?.data
  return (
    <ScrollView>
      <Text>{id}</Text>
      <Text>{detail?.title}</Text>
      <Text>{detail?.overview}</Text>
      <ProductionDetailSimilar
        navigation={navigation}
        productions={similar?.results}
      />
    </ScrollView>
  )
}
