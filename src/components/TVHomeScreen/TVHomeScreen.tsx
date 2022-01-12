import { TVProductionLists } from "@components/ProductionLists"
import { RootTabs } from "@components/RootTabNavigator"
import {
  CommonStackParams,
  WithCommonStackScreens,
} from "@components/WithCommonStackScreens"
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import React, { VFC } from "react"

export type TVHomeScreenParams = CommonStackParams & {
  Home: undefined
}

export const TVHomeScreen: VFC<BottomTabScreenProps<RootTabs, "TV">> = () => {
  const Stack = createNativeStackNavigator<TVHomeScreenParams>()
  return (
    <WithCommonStackScreens stack={Stack}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
    </WithCommonStackScreens>
  )
}

const HomeScreen: VFC<NativeStackScreenProps<TVHomeScreenParams, "Home">> = ({
  navigation,
}) => (
  <TVProductionLists
    onPress={(type, id, production) => {
      navigation.push(type === "tv" ? "TVDetail" : "MovieDetail", {
        id,
        production,
      })
    }}
  />
)
