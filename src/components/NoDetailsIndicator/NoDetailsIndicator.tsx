import React, { VFC } from "react"
import { Text, View } from "react-native"
import tailwind from "tailwind-rn"

export const NoDetailsIndicator: VFC = () => (
  <View style={tailwind("flex-1 justify-center items-center")}>
    <Text style={tailwind("font-bold text-2xl")}>No Details Available</Text>
  </View>
)
