import { CastMember, CrewMember } from "@queries/credit"
import { tmdbImagePrefixUrl } from "@queries/tmdb"
import React, { VFC } from "react"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import tailwind from "tailwind-rn"

const profileImageUrl = (path?: string) =>
  path && tmdbImagePrefixUrl + "w185" + path

export const CreditTile: VFC<
  | ({ placeholder?: boolean } & (
      | {
          type: "cast"
          credit: CastMember
        }
      | {
          type: "crew"
          credit: CrewMember
        }
    ))
  | {
      placeholder: true
    }
> = (props) => {
  const imageUrl = profileImageUrl(
    props.placeholder ? "" : props.credit.profile_path,
  )
  const height = 128
  const width = height / 1.5
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        return
      }}
      style={[styles.touchable, tailwind("")]}
    >
      <View style={[{ width }, tailwind("overflow-hidden")]}>
        <View style={[{ width, height }]}>
          {!!imageUrl && (
            <Image
              style={[styles.image, tailwind("bg-gray-200")]}
              source={{ uri: imageUrl }}
              borderRadius={borderRadius}
              resizeMode="cover"
            />
          )}
        </View>
        <Text numberOfLines={4}>
          <Text style={tailwind("font-bold")}>
            {props.placeholder ? "\n" : props.credit.name}
          </Text>
          {"\n"}
          <Text>
            {props.placeholder
              ? "\n"
              : props.type === "cast"
              ? props.credit.character
              : props.credit.job}
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export const CrewMemberHeightSpacer: VFC = () => (
  <View style={tailwind("w-0 opacity-0")}>
    <CreditTile placeholder />
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
