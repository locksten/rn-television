import { CommonStackParams } from "@components/WithCommonStackScreens"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { Dimensions, Text, View } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"
import { fullDate } from "src/utils"
import tailwind from "tailwind-rn"

export const YouTubeScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "YouTube">
> = ({
  route: {
    params: { video },
  },
}) => (
  <View style={tailwind("h-full justify-center")}>
    <View style={tailwind("px-2")}>
      <YoutubePlayer
        height={Dimensions.get("window").width * (9 / 16)}
        initialPlayerParams={{
          modestbranding: true,
          showClosedCaptions: true,
        }}
        play
        forceAndroidAutoplay
        videoId={video.key}
      />
      <Text numberOfLines={6} style={tailwind("font-bold text-xl")}>
        {video.name}
      </Text>
      <Text style={tailwind("text-lg")}>
        {video.published_at ? fullDate(video.published_at) : undefined}
      </Text>
    </View>
  </View>
)
