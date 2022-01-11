import React, { VFC } from "react"
import { Text } from "react-native"
import tailwind from "tailwind-rn"

export const SectionTitle: VFC<{ title: string }> = ({ title }) => (
  <Text style={tailwind("pl-4 pb-2 font-bold text-2xl")}>{title}</Text>
)
