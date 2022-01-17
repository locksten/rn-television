import { AppImage } from "@components/AppImage"
import { posterImageUrl } from "@queries/image"
import React, { VFC } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import tailwind from "tailwind-rn"

export const PosterTile: (props: {
  uri?: string
  onPress?: () => void
  renderDescription?: () => JSX.Element
  height?: number
  style?: StyleProp<ViewStyle>
}) => React.ReactElement | null = ({
  renderDescription,
  uri,
  onPress,
  height,
  style,
}) => (
  <View style={style}>
    <AppImage
      vertical
      aspectRatio={2 / 3}
      size={height}
      uri={posterImageUrl(uri)}
      onPress={onPress}
      renderEnd={renderDescription ? () => renderDescription() : undefined}
    />
  </View>
)

export const PosterTileHeightPlaceholder: VFC<{
  height?: number
  renderDescription?: () => JSX.Element
}> = ({ height, renderDescription }) => (
  <View style={tailwind("w-0 opacity-0")}>
    <PosterTile height={height} renderDescription={renderDescription} />
  </View>
)
