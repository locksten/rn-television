import { Production, productionListTypeToTitle } from "@queries/Production"
import { tmdbImagePrefixUrl } from "@queries/TMDB"
import React, { VFC } from "react"
import { Image, TouchableHighlight, StyleSheet } from "react-native"

const tileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w500" + path

export const ProductionTile: VFC<{
  production: Production
  onPress?: (id: number, production: Production) => void
}> = ({ production, onPress }) => {
  const imageUrl = tileImageUrl(production.poster_path)
  return (
    <TouchableHighlight
      onPress={() => production.id && onPress?.(production.id, production)}
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
