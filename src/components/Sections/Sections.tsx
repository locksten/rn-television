import { Section } from "@components/Section"
import { SectionTitle, sectionTitleStyles } from "@components/SectionTitle"
import React, { useState, VFC } from "react"
import { TouchableOpacity, View } from "react-native"
import tailwind from "tailwind-rn"

export const Sections: VFC<{
  sections: ({ title: string; Section: () => JSX.Element } & Parameters<
    typeof Section
  >[0])[]
}> = ({ sections }) => {
  const [activeTitle, setActiveTitle] = useState<string | undefined>(
    sections[0]?.title,
  )

  const ActiveSection = sections.find(
    ({ title }) => title === activeTitle,
  )?.Section

  const hPad = sectionTitleStyles.horizontalPadding
  const vPad = sectionTitleStyles.verticalPadding
  const opacity = 0.4

  return (
    <View>
      <View style={tailwind("flex-1 flex-row")}>
        {sections.map(({ title }, idx) => {
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
              {idx !== sections.length - 1 && (
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
