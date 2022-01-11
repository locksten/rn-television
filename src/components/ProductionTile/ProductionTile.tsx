import { Production } from "@queries/Production"
import { tmdbImagePrefixUrl } from "@queries/TMDB"
import React, { VFC } from "react"
import { Image } from "react-native"

const tileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w500" + path

export const ProductionTile: VFC<{ production: Production }> = ({
  production: { poster_path },
}) => {
  const imageUrl = tileImageUrl(poster_path)
  return (
    <Image
      style={{ aspectRatio: 2 / 3, borderWidth: 0.5, borderColor: "#00000010" }}
      source={{ uri: imageUrl }}
      borderRadius={8}
      resizeMode="cover"
    />
  )
}
