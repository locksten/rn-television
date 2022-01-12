import { AddToListButtons } from "@components/AddToListButtons"
import { MovieHomeScreenParams } from "@components/MovieHomeScreen"
import { ProductionList } from "@components/ProductionList"
import { SeparatedBy } from "@components/SeparatedBy"
import { useMovieDetail } from "@queries/movie"
import { useProductionRecommendations } from "@queries/production"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { ScrollView, Text, View } from "react-native"
import tailwind from "tailwind-rn"

export const MovieDetailScreen: VFC<
  NativeStackScreenProps<MovieHomeScreenParams, "MovieDetail"> & {
    other: number
  }
> = ({
  route: {
    params: { id, production },
  },
  navigation,
}) => {
  const detail = { ...production, ...useMovieDetail(id).data }
  const recommendations = useProductionRecommendations("movie", id).data
    ?.results
  return (
    <ScrollView>
      <SeparatedBy separator={<View style={tailwind("h-4")} />} start end>
        <Text>{id}</Text>
        <Text>{detail?.title}</Text>
        <Text>{detail?.overview}</Text>
        <AddToListButtons type="movie" id={id} />
        <ProductionList
          title="If You Liked This"
          productionType="movie"
          productions={recommendations}
          onPress={(_, id, production) =>
            navigation.push("MovieDetail", { id, production })
          }
        />
      </SeparatedBy>
    </ScrollView>
  )
}
