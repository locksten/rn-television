import React, { useState, VFC } from "react"
import { Image, TouchableOpacity, View } from "react-native"
import tailwind from "tailwind-rn"

export const AppImage: VFC<
  {
    uri?: string
    aspectRatio: number
    size?: number
    renderStart?: () => JSX.Element
    renderEnd?: () => JSX.Element
    onPress?: () => void
    borderRadius?: number
  } & (
    | { vertical?: false; horizontal?: false }
    | { vertical: true; horizontal?: false }
    | { vertical?: false; horizontal: true }
  )
> = ({
  uri,
  aspectRatio,
  size,
  renderStart,
  renderEnd,
  onPress,
  borderRadius = 8,
  ...props
}) => {
  const horizontal = !!props.horizontal
  const mainAxisSizeName = horizontal ? "width" : "height"
  const crossAxisSizeName = horizontal ? "height" : "width"

  const [main, setMain] = useState<number | undefined>(size)
  const cross = main
    ? main * (horizontal ? 1 / aspectRatio : aspectRatio)
    : undefined

  const Slot: VFC<{ element?: () => JSX.Element }> = ({ element }) =>
    element ? (
      <View style={{ [crossAxisSizeName]: cross }}>{element()}</View>
    ) : null

  return (
    <View style={tailwind(`flex-${horizontal ? "row" : "col"}`)}>
      <Slot element={renderStart} />
      <TouchableOpacity
        disabled={!onPress}
        onPress={onPress}
        activeOpacity={0.7}
        onLayout={
          main
            ? undefined
            : ({ nativeEvent: { layout } }) => setMain(layout[mainAxisSizeName])
        }
        style={[
          {
            borderRadius,
          },
          tailwind("justify-center items-center"),
        ]}
      >
        <Image
          source={{ uri }}
          resizeMode="cover"
          style={[
            {
              aspectRatio: aspectRatio,
              [mainAxisSizeName]: size ?? "100%",
              borderWidth: 0.5,
              borderRadius: borderRadius,
              borderColor: "#00000010",
            },
            tailwind("bg-gray-200 items-center"),
          ]}
        />
      </TouchableOpacity>
      <Slot element={renderEnd} />
    </View>
  )
}
