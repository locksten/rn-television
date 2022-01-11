import { MovieDetailScreen } from "@components/MovieDetailScreen"
import { MovieProductionLists } from "@components/ProductionLists"
import { ProductionScreenParams } from "@components/ProductionScreen"
import { Movie } from "@queries/Movie"
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import React, { VFC } from "react"

export type MovieHomeScreenParams = ProductionScreenParams<Movie>

export const MovieHomeScreen: VFC = () => {
  const Stack = createNativeStackNavigator<MovieHomeScreenParams>()
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Detail"
        component={MovieDetailScreen}
        options={({ route }) => ({ title: route.params.production?.title })}
      />
    </Stack.Navigator>
  )
}

export const HomeScreen: VFC<
  NativeStackScreenProps<MovieHomeScreenParams, "Home">
> = ({ navigation }) => (
  <MovieProductionLists
    onPress={(id, production) => {
      navigation.push("Detail", { id, production })
    }}
  />
)
