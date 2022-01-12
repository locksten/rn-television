import { AddToListButtons } from "@components/AddToListButtons"
import { ProductionList } from "@components/ProductionList"
import { SeparatedBy } from "@components/SeparatedBy"
import { TVHomeScreenParams } from "@components/TVHomeScreen"
import { useProductionRecommendations } from "@queries/production"
import { useTVDetail } from "@queries/tv"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { ScrollView, Text, View } from "react-native"
import tailwind from "tailwind-rn"

export const TVDetailScreen: VFC<
  NativeStackScreenProps<TVHomeScreenParams, "TVDetail">
> = ({
  route: {
    params: { id, production },
  },
  navigation,
}) => {
  const detail = { ...production, ...useTVDetail(id).data }
  const recommendations = useProductionRecommendations("tv", id).data?.results
  return (
    <ScrollView>
      <SeparatedBy separator={<View style={tailwind("h-4")} />} start end>
        <Text>{id}</Text>
        <Text>{detail?.name}</Text>
        <Text>{detail?.overview}</Text>
        <AddToListButtons type="tv" id={id} />
        <ProductionList
          title="If You Liked This"
          productionType="tv"
          productions={recommendations}
          onPress={(_, id, production) =>
            navigation.push("TVDetail", { id, production })
          }
        />
      </SeparatedBy>
    </ScrollView>
  )
}
