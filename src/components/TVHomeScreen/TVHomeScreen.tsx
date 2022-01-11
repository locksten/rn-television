import { TVProductionLists } from "@components/ProductionLists"
import { ProductionScreenParams } from "@components/ProductionScreen"
import { TVDetailScreen } from "@components/TVDetailScreen"
import { TV } from "@queries/tv"
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import React, { VFC } from "react"

export type TVHomeScreenParams = ProductionScreenParams<TV>

export const TVHomeScreen: VFC = () => {
  const Stack = createNativeStackNavigator<TVHomeScreenParams>()
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Detail"
        component={TVDetailScreen}
        options={({ route }) => ({ title: route.params.production?.name })}
      />
    </Stack.Navigator>
  )
}

const HomeScreen: VFC<NativeStackScreenProps<TVHomeScreenParams, "Home">> = ({
  navigation,
}) => (
  <TVProductionLists
    onPress={(id, production) => {
      navigation.push("Detail", { id, production })
    }}
  />
)
