import { AccountScreen, AccountScreenParams } from "@components/AccountScreen"
import {
  MovieHomeScreen,
  MovieHomeScreenParams,
} from "@components/MovieHomeScreen"
import { TVHomeScreen, TVHomeScreenParams } from "@components/TVHomeScreen"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useAccountDetail } from "@queries/account"
import { useAuth } from "@queries/auth"
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { NavigatorScreenParams } from "@react-navigation/native"
import { VFC } from "react"

export type RootTabs = {
  TV: NavigatorScreenParams<TVHomeScreenParams>
  Movie: NavigatorScreenParams<MovieHomeScreenParams>
  Account: NavigatorScreenParams<AccountScreenParams>
}

export type RootTabsNavigationProp = BottomTabNavigationProp<RootTabs>

export const RootTabNavigator: VFC = () => {
  const Tab = createBottomTabNavigator<RootTabs>()
  const { isLoggedIn } = useAuth()
  const { data: account } = useAccountDetail()
  return (
    <Tab.Navigator
      initialRouteName={isLoggedIn ? "Account" : "Movie"}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case "Movie":
              return <Ionicons name={"film"} color={color} size={size} />
            case "TV":
              return <Ionicons name={"tv"} color={color} size={size} />
            case "Account":
              return <Ionicons name={"person"} color={color} size={size} />
          }
        },
      })}
    >
      <Tab.Screen
        name="Movie"
        component={MovieHomeScreen}
        options={{ title: "Movies" }}
      />
      <Tab.Screen name="TV" component={TVHomeScreen} />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: account?.name || account?.username || "Account",
        }}
      />
    </Tab.Navigator>
  )
}
