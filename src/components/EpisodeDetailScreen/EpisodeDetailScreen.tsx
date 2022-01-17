import { AppImage } from "@components/AppImage"
import { CreditsSection } from "@components/CreditsSection"
import { OverviewSection } from "@components/OverviewSection"
import { detailSpacing, horizontalPadding } from "@components/theme"
import { VideoSection } from "@components/VideoSection"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { useEpisodeDetailExtra } from "@queries/episode"
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
  const { data } = useEpisodeDetailExtra(tvId, seasonNumber, episodeNumber)
  const detail = { ...episode, ...data }
  const { overview, videos, still_path, cast, crew, guest_stars } = {
    ...detail,
    ...detail.credits,
  }
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
      <VideoSection videos={videos?.results} style={detailSpacing} />
      <CreditsSection
        cast={cast}
        crew={crew}
        guestStars={guest_stars}
        style={detailSpacing}
      />
      <View style={detailSpacing} />
    </ScrollView>
  )
}
