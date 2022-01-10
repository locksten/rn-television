import { Production } from "@queries/Production"
import { tmdbImagePrefixUrl } from "@queries/TMDB"
import React, { VFC } from "react"
import { Image, View } from "react-native"
import tailwind from "tailwind-rn"

const tileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w500" + path

export const ProductionTile: VFC<{ production: Production }> = ({
  production: { poster_path },
}) => {
  const imageUrl = tileImageUrl(poster_path)
  return (
    <View style={tailwind("")}>
      {imageUrl && (
        <Image
          style={[
            tailwind("h-full w-full"),
            { aspectRatio: 2 / 3, borderWidth: 0.5, borderColor: "#00000010" },
          ]}
          source={{ uri: imageUrl }}
          borderRadius={8}
          resizeMode="cover"
        />
      )}
    </View>
  )
}
