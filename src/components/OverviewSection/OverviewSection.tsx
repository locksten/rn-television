import { TapToExpandText } from "@components/TapToExpandText"
import React, { VFC } from "react"
import { StyleProp, Text, View, ViewStyle } from "react-native"
import tailwind from "tailwind-rn"

export const OverviewSection: VFC<{
  overview?: string
  style?: StyleProp<ViewStyle>
  collapsedLines?: number
}> = ({ overview, style, collapsedLines }) =>
  overview ? (
    <View style={[tailwind("flex-row"), style]}>
      <View style={tailwind("w-0")}>
        <Text>{"\n".repeat((collapsedLines ?? 1) - 1)}</Text>
      </View>
      <TapToExpandText collapsedLines={collapsedLines}>
        <Text>{overview}</Text>
      </TapToExpandText>
    </View>
  ) : null
