import { ProductionList } from "@components/ProductionList"
import { WithCommonProductionDetails } from "@components/WithCommonProductionDetails"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { TVDetailExtra, useTVDetailExtra } from "@queries/tv"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import { Text, View } from "react-native"
import { shortDate } from "src/utils"
import tailwind from "tailwind-rn"

export const TVDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "TVDetail">
> = ({
  route: {
    params: { id, production },
  },
}) => {
  const { data, isLoading } = useTVDetailExtra(id)
  const detail: TVDetailExtra & { id: number } = {
    ...{ id },
    ...production,
    ...{ first_air_date: undefined },
    ...data,
  }
  return (
    <WithCommonProductionDetails
      type="tv"
      detail={detail}
      isLoading={isLoading}
      MiddleSlot={() => (
        <ProductionList
          title="Seasons"
          productions={detail.seasons}
          RenderDescription={({ production }) => (
            <View>
              <Text numberOfLines={2} style={tailwind("font-bold")}>
                {production.name}
              </Text>
              <Text numberOfLines={1}>{production.episode_count} episodes</Text>
              <Text numberOfLines={1}>{shortDate(production.air_date)}</Text>
            </View>
          )}
        />
      )}
    />
  )
}
