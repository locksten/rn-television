import { SectionTitle } from "@components/SectionTitle"
import React from "react"
import { FlatList, FlatListProps, View } from "react-native"
import tailwind from "tailwind-rn"

export const HorizontalFlatList: <T>(
  props: FlatListProps<T> & {
    title?: string | (() => JSX.Element)
  },
) => React.ReactElement | null = ({ title, ...props }) =>
  props.data && props.data.length ? (
    <View style={tailwind("flex-1")}>
      {typeof title === "string" ? <SectionTitle title={title} /> : title?.()}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={tailwind("w-2")} />}
        ListHeaderComponent={() => <View style={tailwind("w-4")} />}
        ListFooterComponent={() => <View style={tailwind("w-4")} />}
        {...props}
      />
    </View>
  ) : null
