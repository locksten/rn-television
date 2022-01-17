import { AppImage } from "@components/AppImage"
import { stillImageUrl } from "@queries/image"
import { Episode } from "@queries/season"
import React, { VFC } from "react"
import { Text, View } from "react-native"
import { fullDate } from "src/utils"
import tailwind from "tailwind-rn"

export const EpisodeTile: (props: {
  episode: Episode
  onPress?: () => void
  height?: number
}) => React.ReactElement | null = ({
  height,
  onPress,
  episode: { still_path, name, episode_number, air_date },
}) => {
  return (
    <AppImage
      vertical
      aspectRatio={16 / 9}
      size={height}
      uri={stillImageUrl(still_path)}
      onPress={onPress}
      renderEnd={() => (
        <View style={tailwind("pt-1")}>
          <Text numberOfLines={3} style={tailwind("font-bold")}>
            {`${episode_number} ${name}\n`}
            <Text style={tailwind("font-light")}>{`${fullDate(
              air_date,
            )}`}</Text>
          </Text>
        </View>
      )}
    />
  )
}

export const EpisodeTileHeightPlaceholder: VFC<{
  height?: number
  renderDescription?: () => JSX.Element
}> = ({ height }) => (
  <View style={tailwind("w-0 opacity-0")}>
    <EpisodeTile
      height={height}
      episode={{ episode_number: 0, name: "\n\n", air_date: "1970-01-01" }}
    />
  </View>
)
