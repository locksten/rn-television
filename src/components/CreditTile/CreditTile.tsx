import { CastMember, CrewMember } from "@queries/credit"
import { tmdbImagePrefixUrl } from "@queries/tmdb"
import React, { VFC } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import tailwind from "tailwind-rn"

const profileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w185" + path

export const CreditTile: VFC<
  | {
      type: "cast"
      credit: CastMember
    }
  | {
      type: "crew"
      credit: CrewMember
    }
> = (props) => {
  const imageUrl = profileImageUrl(props.credit.profile_path)
  const height = 128
  const width = height / 1.5
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        return
      }}
      style={styles.touchable}
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
        <Text numberOfLines={4}>
          <Text style={tailwind("font-bold")}>{props.credit.name}</Text>
          {"\n"}
          <Text>
            {props.type === "cast" ? props.credit.character : props.credit.job}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const CrewMemberHeightSpacer: VFC = () => (
  <View style={tailwind("w-0 opacity-0")}>
    <CreditTile type={"crew"} credit={{ name: "\n\n\n" }} />
  </View>
)

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
