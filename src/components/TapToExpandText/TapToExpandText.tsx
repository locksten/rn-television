import React, { FC, useState } from "react"
import { Text, TouchableWithoutFeedback } from "react-native"
import tailwind from "tailwind-rn"

export const TapToExpandText: FC<{
  collapsedLines: number
  expandedLines?: number
}> = ({ collapsedLines, expandedLines, children }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return children ? (
    <TouchableWithoutFeedback
      style={tailwind("bg-blue-400")}
      onPress={() => {
        setIsExpanded((isExpanded) => !isExpanded)
      }}
    >
      <Text numberOfLines={isExpanded ? expandedLines : collapsedLines}>
        {children}
      </Text>
    </TouchableWithoutFeedback>
  ) : null
}
