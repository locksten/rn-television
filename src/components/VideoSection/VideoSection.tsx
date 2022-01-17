import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { sectionImageHeight } from "@components/theme"
import { VideoTile, VideoTileHeightPlaceholder } from "@components/VideoTile"
import { Video } from "@queries/video"
import React, { VFC } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import tailwind from "tailwind-rn"

export const VideoSection: VFC<{
  videos?: Video[]
  height?: number
  isLoading: boolean
  style?: StyleProp<ViewStyle>
}> = ({ videos, height = sectionImageHeight, isLoading, style }) =>
  isLoading || videos?.length ? (
    <View style={[tailwind("flex-row"), style]}>
      <VideoTileHeightPlaceholder height={height} />
      <HorizontalFlatList
        data={videos}
        renderItem={({ item }) => <VideoTile video={item} height={height} />}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  ) : null
