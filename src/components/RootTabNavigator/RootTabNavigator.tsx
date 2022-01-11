import { AccountScreen } from "@components/AccountScreen"
import { MovieHomeScreen } from "@components/MovieHomeScreen"
import { TVHomeScreen } from "@components/TVHomeScreen"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useAccountDetail } from "@queries/account"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { VFC } from "react"

type RootTabs = {
  TV: undefined
  Movie: undefined
  Account: undefined
}

export const RootTabNavigator: VFC = () => {
  const Tab = createBottomTabNavigator<RootTabs>()
  const { data: account } = useAccountDetail()
  return (
    <Tab.Navigator
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
