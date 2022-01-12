import { Production, ProductionType } from "@queries/production"
import { tmdbImagePrefixUrl } from "@queries/tmdb"
import React, { VFC } from "react"
import { Image, StyleSheet, TouchableHighlight } from "react-native"

const tileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w500" + path

export type OnProductionPress = (
  type: ProductionType,
  id: number,
  production: Production,
) => void

export const ProductionTile: VFC<{
  type: ProductionType
  production: Production
  onPress?: OnProductionPress
}> = ({ type, production, onPress }) => {
  const imageUrl = tileImageUrl(production.poster_path)
  return (
    <TouchableHighlight
      onPress={() =>
        production.id && onPress?.(type, production.id, production)
      }
      style={styles.touchable}
    >
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        borderRadius={borderRadius}
        resizeMode="cover"
      />
    </TouchableHighlight>
  )
}

const borderRadius = 8

const styles = StyleSheet.create({
  touchable: {
    borderRadius,
  },
  image: {
    aspectRatio: 2 / 3,
    borderWidth: 0.5,
    borderColor: "#00000010",
    width: "100%",
    height: "100%",
  },
})
