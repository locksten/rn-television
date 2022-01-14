import React, { VFC } from "react"
import { Text } from "react-native"
import tailwind from "tailwind-rn"

export const sectionTitleStyles = { horizontalPadding: 4, verticalPadding: 2 }

export const SectionTitle: VFC<{
  title: string
  padding?: boolean
}> = ({ title, padding = true }) => (
  <Text
    style={tailwind(
      `${
        padding
          ? `pl-${sectionTitleStyles.horizontalPadding} pb-${sectionTitleStyles.verticalPadding}`
          : ""
      } font-bold text-2xl`,
    )}
  >
    {title}
  </Text>
)
