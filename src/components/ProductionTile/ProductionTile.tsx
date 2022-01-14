import { Production } from "@queries/production"
import { tmdbImagePrefixUrl } from "@queries/tmdb"
import React, { ComponentType } from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"
import tailwind from "tailwind-rn"

const tileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w500" + path

export type OnProductionPress = (id: number, production: Production) => void

export const ProductionTile: <
  T extends { poster_path?: string; id?: number },
>(props: {
  production: T
  onPress?: OnProductionPress
  RenderDescription?: ComponentType<{ production: T }>
  height?: number
}) => React.ReactElement | null = ({
  RenderDescription,
  production,
  onPress,
  height = 160,
}) => {
  const imageUrl = tileImageUrl(production.poster_path)
  const width = height / 1.5
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => production.id && onPress?.(production.id, production)}
        style={[styles.touchable, { flex: 1 }]}
      >
        <View style={[{ width }, tailwind("flex-1 overflow-hidden")]}>
          <View style={[{ width, height }]}>
            <Image
              style={[styles.image, tailwind("bg-gray-200")]}
              source={{ uri: imageUrl }}
              borderRadius={borderRadius}
              resizeMode="cover"
            />
          </View>
          {!!RenderDescription && <RenderDescription production={production} />}
        </View>
      </TouchableOpacity>
    </View>
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
