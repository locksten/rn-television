import { CommonStackParams } from "@components/WithCommonStackScreens"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useState, VFC } from "react"
import { Text, View } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"
import { fullDate } from "src/utils"
import tailwind from "tailwind-rn"

export const YouTubeScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "YouTube">
> = ({
  route: {
    params: { video },
  },
}) => {
  const [width, setWidth] = useState<number>()
  const height = width ? width / (16 / 9) : undefined
  return (
    <View style={tailwind("h-full px-2 justify-center")}>
      <View
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => setWidth(width)}
      >
        {!!height && (
          <View style={{ height, backgroundColor: "black" }}>
            <YoutubePlayer
              height={height}
              initialPlayerParams={{
                modestbranding: true,
                showClosedCaptions: true,
              }}
              play
              forceAndroidAutoplay
              videoId={video.key}
            />
          </View>
        )}
        <Text numberOfLines={6} style={tailwind("font-bold text-xl")}>
          {video.name}
        </Text>
        <Text style={tailwind("text-lg")}>
          {video.published_at ? fullDate(video.published_at) : undefined}
        </Text>
      </View>
    </View>
  )
}
