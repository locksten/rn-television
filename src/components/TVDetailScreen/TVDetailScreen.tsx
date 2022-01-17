import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { PosterTile, PosterTileHeightPlaceholder } from "@components/PosterTile"
import { detailSpacing, sectionImageHeight } from "@components/theme"
import { WithCommonProductionDetails } from "@components/WithCommonProductionDetails"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { TVDetailExtra, useProductionDetailExtra } from "@queries/production"
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { StyleProp, Text, View, ViewStyle } from "react-native"
import { shortDate } from "src/utils"
import tailwind from "tailwind-rn"

export const TVDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "TVDetail">
> = ({
  route: {
    params: { id, production },
  },
  navigation,
}) => {
  const { data, isLoading } = useProductionDetailExtra("tv", id)
  const detail: (TVDetailExtra | undefined) & { id: number } = {
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
      MiddleSlot={() => (
        <Seasons
          detail={detail}
          isLoading={isLoading}
          navigation={navigation}
          style={detailSpacing}
        />
      )}
    />
  )
}

const Seasons: VFC<{
  isLoading: boolean
  detail: TVDetailExtra
  navigation: NativeStackNavigationProp<CommonStackParams, "TVDetail">
  style?: StyleProp<ViewStyle>
}> = ({ detail, isLoading, navigation, style }) => {
  const tvId = detail.id
  const height = sectionImageHeight
  return isLoading || detail.seasons?.length ? (
    <View style={[tailwind("flex-row"), style]}>
      <PosterTileHeightPlaceholder
        height={height}
        renderDescription={() => (
          <Text style={tailwind("font-bold")}>{"\n\n\n"}</Text>
        )}
      />
      <HorizontalFlatList
        title="Seasons"
        data={detail.seasons}
        renderItem={({ item }) => {
          const seasonNumber = item.season_number
          return (
            <PosterTile
              uri={item.poster_path}
              height={height}
              onPress={
                tvId && seasonNumber !== undefined
                  ? () =>
                      navigation.push("SeasonDetail", {
                        tvId,
                        seasonNumber: seasonNumber,
                        season: item,
                      })
                  : undefined
              }
              renderDescription={() => (
                <View>
                  <Text numberOfLines={1} style={tailwind("font-bold")}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={1}>
                    {item.episode_count
                      ? `${item.episode_count} episodes`
                      : undefined}
                  </Text>
                  <Text numberOfLines={1}>{shortDate(item.air_date)}</Text>
                </View>
              )}
            />
          )
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  ) : null
}
