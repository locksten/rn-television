import { HorizontalFlatList } from "@components/HorizontalFlatList"
import {
  ProductionTile,
  ProductionTileHeightPlaceholder,
} from "@components/ProductionTile"
import { WithCommonProductionDetails } from "@components/WithCommonProductionDetails"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { TVDetailExtra, useTVDetailExtra } from "@queries/tv"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { Text, View } from "react-native"
import { shortDate } from "src/utils"
import tailwind from "tailwind-rn"

export const TVDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "TVDetail">
> = ({
  route: {
    params: { id, production },
  },
}) => {
  const { data, isLoading } = useTVDetailExtra(id)
  const detail: TVDetailExtra & { id: number } = {
    ...{ id },
    ...production,
    ...{ first_air_date: undefined },
    ...data,
  }
  return (
    <WithCommonProductionDetails
      type="tv"
      detail={detail}
      isLoading={isLoading}
      MiddleSlot={() => <Seasons detail={detail} isLoading={isLoading} />}
    />
  )
}

const Seasons: VFC<{ isLoading: boolean; detail: TVDetailExtra }> = ({
  detail,
  isLoading,
}) => {
  const height = 160
  return isLoading || !!(detail.seasons?.length !== 0) ? (
    <View style={tailwind("flex-row")}>
      <ProductionTileHeightPlaceholder
        height={height}
        renderDescription={() => (
          <Text style={tailwind("font-bold")}>{"\n\n\n"}</Text>
        )}
      />
      <HorizontalFlatList
        title="Seasons"
        data={detail.seasons}
        renderItem={({ item }) => (
          <ProductionTile
            production={item}
            height={height}
            renderDescription={({ name, episode_count, air_date }) => (
              <View>
                <Text numberOfLines={1} style={tailwind("font-bold")}>
                  {name}
                </Text>
                <Text numberOfLines={1}>
                  {episode_count ? `${episode_count} episodes` : undefined}
                </Text>
                <Text numberOfLines={1}>{shortDate(air_date)}</Text>
              </View>
            )}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  ) : null
}
