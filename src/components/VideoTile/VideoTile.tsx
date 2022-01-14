import { CommonStackNavigationProp } from "@components/WithCommonStackScreens"
import { Video, videoToShortDate } from "@queries/video"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState, VFC } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getYoutubeMeta, YoutubeMeta } from "react-native-youtube-iframe"
import tailwind from "tailwind-rn"

export const VideoTile: VFC<{
  video: Video
}> = ({ video }) =>
  video?.site === "YouTube" && video?.key ? (
    <YouTubeVideoTile
      video={{ ...video, ...{ site: video.site, key: video.key } }}
    />
  ) : null

const YouTubeVideoTile: VFC<{
  video: Video & { site: "YouTube"; key: string }
}> = ({ video }) => {
  const navigation = useNavigation<CommonStackNavigationProp>()
  const [meta, setMeta] = useState<YoutubeMeta | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        setMeta(await getYoutubeMeta(video.key))
      } catch {
        return
      }
    })()
  }, [video.key])

  const height = 128
  const width = height * (16 / 9)
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.push("YouTube", { meta, video })}
      style={styles.touchable}
    >
      <View style={{ width }}>
        <View style={{ width, height }}>
          <Image
            style={[styles.image, tailwind("bg-gray-200")]}
            source={{ uri: meta?.thumbnail_url }}
            borderRadius={borderRadius}
            resizeMode="cover"
          />
        </View>
        <View style={tailwind("pt-1")}>
          <Text numberOfLines={1}>{video?.name}</Text>
          <Text style={tailwind("font-light")}>{videoToShortDate(video)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const borderRadius = 8

const styles = StyleSheet.create({
  touchable: {
    borderRadius,
  },
  image: {
    aspectRatio: 16 / 9,
    borderWidth: 0.5,
    borderColor: "#00000010",
    width: "100%",
    height: "100%",
  },
})
