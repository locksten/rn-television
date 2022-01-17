import { CreditsSection } from "@components/CreditsSection"
import {
  EpisodeTile,
  EpisodeTileHeightPlaceholder,
} from "@components/EpisodeTile"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { NoDetailsIndicator } from "@components/NoDetailsIndicator"
import { OverviewSection } from "@components/OverviewSection"
import { PosterTile } from "@components/PosterTile"
import {
  detailPosterHeight,
  detailSpacing,
  horizontalPadding,
  sectionImageHeight,
} from "@components/theme"
import { VideoSection } from "@components/VideoSection"
import {
  CommonStackNavigationProp,
  CommonStackParams,
} from "@components/WithCommonStackScreens"
import {
  Episode,
  SeasonDetailExtra,
  useSeasonDetailExtra,
} from "@queries/season"
import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { ScrollView, StyleProp, View, ViewStyle } from "react-native"
import tailwind from "tailwind-rn"

export const SeasonDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "SeasonDetail">
> = ({
  route: {
    params: { tvId, seasonNumber, season },
  },
}) => {
  const { data, isLoading } = useSeasonDetailExtra(tvId, seasonNumber)
  const detail: SeasonDetailExtra | undefined = { ...season, ...data }
  const { poster_path, overview, videos, credits, episodes } = detail
  const noDetails = !(
    isLoading ||
    poster_path ||
    overview ||
    videos?.results?.length ||
    credits?.cast?.length ||
    credits?.crew?.length ||
    episodes?.length
  )
  return noDetails ? (
    <NoDetailsIndicator />
  ) : (
    <ScrollView>
      {!!poster_path && (
        <PosterTile
          uri={poster_path}
          height={detailPosterHeight}
          style={detailSpacing}
        />
      )}
      <View style={horizontalPadding}>
        <OverviewSection
          overview={overview}
          style={detailSpacing}
          collapsedLines={4}
        />
      </View>
      <VideoSection
        videos={videos?.results}
        isLoading={isLoading}
        style={detailSpacing}
      />
      <Episodes
        episodes={episodes}
        isLoading={isLoading}
        tvId={tvId}
        seasonNumber={seasonNumber}
        height={sectionImageHeight}
        style={detailSpacing}
      />
      <CreditsSection
        cast={credits?.cast}
        crew={credits?.crew}
        isLoading={isLoading}
        style={detailSpacing}
      />
      <View style={detailSpacing} />
    </ScrollView>
  )
}

const Episodes: VFC<{
  episodes?: Episode[]
  tvId: number
  seasonNumber: number
  height: number
  isLoading: boolean
  style?: StyleProp<ViewStyle>
}> = ({ episodes, tvId, seasonNumber, isLoading, height, style }) => {
  const navigation = useNavigation<CommonStackNavigationProp>()
  return isLoading || episodes?.length ? (
    <View style={[tailwind("flex-row"), style]}>
      <EpisodeTileHeightPlaceholder height={height} />
      <HorizontalFlatList
        title={`${episodes?.length} Episodes`}
        data={episodes}
        renderItem={({ item }) => {
          const episodeNumber = item.episode_number
          return (
            <EpisodeTile
              episode={item}
              height={height}
              onPress={
                episodeNumber
                  ? () =>
                      navigation.push("EpisodeDetail", {
                        tvId,
                        seasonNumber,
                        episodeNumber: episodeNumber,
                        episode: item,
                      })
                  : undefined
              }
            />
          )
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  ) : null
}
