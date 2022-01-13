import { TMDBLogo } from "@components/TMDBAttribution/TMDBLogo"
import React, { VFC } from "react"
import { View, Text } from "react-native"
import tailwind from "tailwind-rn"

export const TMDBAttribution: VFC = () => (
  <View style={[tailwind(`h-32 w-48`)]}>
    <Text
      style={[{ color: "#90cea1" }, tailwind("font-bold text-3xl pb-2 pl-1.5")]}
    >
      Powered By
    </Text>
    <TMDBLogo />
  </View>
)
