import { AppImage } from "@components/AppImage"
import { creditImageUrl } from "@queries/credit"
import { Production } from "@queries/production"
import { tmdbImagePrefixUrl } from "@queries/tmdb"
import React, { VFC } from "react"
import { View } from "react-native"
import tailwind from "tailwind-rn"

const tileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w500" + path

export type OnProductionPress = (id: number, production: Production) => void

export const ProductionTile: <
  T extends { poster_path?: string; id?: number },
>(props: {
  production: T
  onPress?: OnProductionPress
  renderDescription?: (production: T) => JSX.Element
  height?: number
}) => React.ReactElement | null = ({
  renderDescription,
  production,
  onPress,
  height,
}) => {
  const { id } = production
  return (
    <AppImage
      vertical
      aspectRatio={2 / 3}
      size={height}
      uri={creditImageUrl(tileImageUrl(production.poster_path))}
      onPress={id && onPress ? () => onPress(id, production) : undefined}
      renderEnd={
        renderDescription ? () => renderDescription(production) : undefined
      }
    />
  )
}

export const ProductionTileHeightPlaceholder: VFC<{
  height?: number
  renderDescription?: () => JSX.Element
}> = ({ height, renderDescription }) => (
  <View style={tailwind("w-0 opacity-0")}>
    <ProductionTile
      height={height}
      production={{}}
      renderDescription={renderDescription}
    />
  </View>
)
