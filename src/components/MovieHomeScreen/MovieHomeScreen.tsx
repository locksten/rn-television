import { GlobalProductionLists } from "@components/ProductionLists"
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

export type MovieHomeScreenParams = CommonStackParams & {
  Home: undefined
}

export const MovieHomeScreen: VFC<
  BottomTabScreenProps<RootTabs, "Movie">
> = () => {
  const Stack = createNativeStackNavigator<MovieHomeScreenParams>()
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

const HomeScreen: VFC<
  NativeStackScreenProps<MovieHomeScreenParams, "Home">
> = ({ navigation }) => (
  <GlobalProductionLists
    type="movie"
    onPress={(id, production) => {
      navigation.push("MovieDetail", {
        id,
        production,
      })
    }}
  />
)
