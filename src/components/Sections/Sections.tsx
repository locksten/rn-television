import { SectionTitle, sectionTitleStyles } from "@components/SectionTitle"
import React, { useEffect, useState, VFC } from "react"
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native"
import tailwind from "tailwind-rn"

export const Sections: VFC<{
  sections: { [title: string]: () => JSX.Element }
  style?: StyleProp<ViewStyle>
}> = ({ sections, style }) => {
  const [activeTitle, setActiveTitle] = useState<string | undefined>()
  useEffect(() => {
    setActiveTitle(Object.keys(sections)[0])
  }, [sections])

  if (Object.keys(sections).length === 0) return null

  const ActiveSection = activeTitle ? sections[activeTitle] : undefined

  const hPad = sectionTitleStyles.horizontalPadding
  const vPad = sectionTitleStyles.verticalPadding
  const opacity = 0.4

  return (
    <View style={style}>
      <View style={tailwind("flex-row")}>
        {Object.keys(sections).map((title, idx) => {
          return (
            <View key={title} style={tailwind(`flex-row items-center`)}>
              <TouchableOpacity onPress={() => setActiveTitle(title)}>
                <View
                  style={[
                    { opacity: title === activeTitle ? 1 : opacity },
                    tailwind(
                      `pb-${vPad} pl-${idx === 0 ? hPad : hPad / 2} pr-${
                        hPad / 2
                      }`,
                    ),
                  ]}
                >
                  <SectionTitle key={title} title={title} padding={false} />
                </View>
              </TouchableOpacity>
              {idx !== Object.keys(sections).length - 1 && (
                <View style={tailwind("pb-1")}>
                  <View
                    style={[
                      tailwind("bg-black w-2 h-2 rounded-full"),
                      { opacity },
                    ]}
                  />
                </View>
              )}
            </View>
          )
        })}
      </View>
      {ActiveSection?.()}
    </View>
  )
}
