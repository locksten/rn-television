import { AppImage } from "@components/AppImage"
import { CommonStackNavigationProp } from "@components/WithCommonStackScreens"
import { Video, videoToShortDate } from "@queries/video"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState, VFC } from "react"
import { Text, View } from "react-native"
import { getYoutubeMeta, YoutubeMeta } from "react-native-youtube-iframe"
import tailwind from "tailwind-rn"

export const VideoTile: VFC<{
  video: Video
  height?: number
}> = ({ video, height }) =>
  video?.site === "YouTube" && video?.key ? (
    <YouTubeVideoTile
      video={{ ...video, ...{ site: video.site, key: video.key } }}
      height={height}
    />
  ) : null

const YouTubeVideoTile: VFC<{
  video: Video & { site: "YouTube"; key: string }
  height?: number
}> = ({ video, height }) => {
  const { key, name } = video
  const navigation = useNavigation<CommonStackNavigationProp>()
  const [meta, setMeta] = useState<YoutubeMeta | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        setMeta(await getYoutubeMeta(key))
      } catch {
        return
      }
    })()
  }, [key])

  return (
    <AppImage
      vertical
      aspectRatio={16 / 9}
      size={height}
      uri={meta?.thumbnail_url}
      onPress={() => navigation.push("YouTube", { meta, video })}
      renderEnd={() => (
        <View style={tailwind("pt-1")}>
          <Text numberOfLines={1}>{name}</Text>
          <Text style={tailwind("font-light")}>{videoToShortDate(video)}</Text>
        </View>
      )}
    />
  )
}

export const VideoTileHeightPlaceholder: VFC<{ height?: number }> = ({
  height,
}) => (
  <View style={tailwind("w-0 opacity-0")}>
    <VideoTile
      height={height}
      video={{
        site: "YouTube",
        key: " ",
        name: "\n",
        published_at: "1970-01-01",
      }}
    />
  </View>
)
