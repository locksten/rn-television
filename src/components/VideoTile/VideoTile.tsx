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

const YouTubeVideoTile: VFC<
  | {
      video: Video & { site: "YouTube"; key: string }
      placeholder?: false
    }
  | { placeholder: true }
> = (props) => {
  const navigation = useNavigation<CommonStackNavigationProp>()
  const [meta, setMeta] = useState<YoutubeMeta | undefined>()

  useEffect(() => {
    ;(async () => {
      try {
        !props.placeholder && setMeta(await getYoutubeMeta(props.video.key))
      } catch {
        return
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.placeholder ?? props?.video.key])

  const height = 128
  const width = height * (16 / 9)
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        !props.placeholder &&
        navigation.push("YouTube", { meta, video: props.video })
      }
      style={[styles.touchable]}
    >
      <View style={{ width }}>
        <View style={{ width, height }}>
          {!!meta?.thumbnail_url && (
            <Image
              style={[styles.image, tailwind("bg-gray-200")]}
              source={{
                uri: meta.thumbnail_url,
              }}
              borderRadius={borderRadius}
              resizeMode="cover"
            />
          )}
        </View>
        <View style={tailwind("pt-1")}>
          <Text numberOfLines={1}>
            {props.placeholder ? "" : props.video.name}
          </Text>
          <Text style={tailwind("font-light")}>
            {props.placeholder ? "" : videoToShortDate(props.video)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const VideoTileHeightSpacer: VFC = () => (
  <View style={tailwind("w-0 opacity-0 ")}>
    <YouTubeVideoTile placeholder />
  </View>
)

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
