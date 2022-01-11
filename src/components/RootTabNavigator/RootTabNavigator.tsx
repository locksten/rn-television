import { MovieHomeScreen } from "@components/MovieHomeScreen"
import { TVHomeScreen } from "@components/TVHomeScreen"
import Ionicons from "@expo/vector-icons/Ionicons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { VFC } from "react"

type RootTabs = {
  TV: undefined
  Movie: undefined
}

export const RootTabNavigator: VFC<{}> = ({ ...props }) => {
  const Tab = createBottomTabNavigator<RootTabs>()
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "Movie":
                return <Ionicons name={"film"} color={color} size={size} />
              case "TV":
                return <Ionicons name={"tv"} color={color} size={size} />
            }
          },
        })}
      >
        <Tab.Screen name="Movie" component={MovieHomeScreen} />
        <Tab.Screen name="TV" component={TVHomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
