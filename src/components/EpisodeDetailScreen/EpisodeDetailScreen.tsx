import { AppImage } from "@components/AppImage"
import { CreditsSection } from "@components/CreditsSection"
import { OverviewSection } from "@components/OverviewSection"
import { detailSpacing, horizontalPadding } from "@components/theme"
import { VideoSection } from "@components/VideoSection"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { EpisodeDetailExtra, useEpisodeDetailExtra } from "@queries/episode"
import { stillImageUrl } from "@queries/image"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { ScrollView, View } from "react-native"

export const EpisodeDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "EpisodeDetail">
> = ({
  route: {
    params: { tvId, seasonNumber, episodeNumber, episode },
  },
}) => {
  const { data, isLoading } = useEpisodeDetailExtra(
    tvId,
    seasonNumber,
    episodeNumber,
  )
  const detail: EpisodeDetailExtra | undefined = { ...episode, ...data }
  const { overview, videos, credits, still_path } = detail

  const crew = episode?.crew ?? credits?.crew
  const cast = credits?.cast
  const guestStars = episode?.guest_stars ?? credits?.guest_stars

  return (
    <ScrollView>
      <View style={horizontalPadding}>
        {!!still_path && (
          <AppImage
            horizontal
            uri={stillImageUrl(still_path)}
            aspectRatio={16 / 9}
            style={detailSpacing}
          />
        )}
        <OverviewSection overview={overview} style={detailSpacing} />
      </View>
      <VideoSection
        videos={videos?.results}
        isLoading={isLoading}
        style={detailSpacing}
      />
      <CreditsSection
        cast={cast}
        crew={crew}
        guestStars={guestStars}
        isLoading={isLoading}
        style={detailSpacing}
      />
      <View style={detailSpacing} />
    </ScrollView>
  )
}
