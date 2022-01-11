import { RootTabNavigator } from "@components/RootTabNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import React, { VFC } from "react"
import { AppQueryClientProvider } from "src/queries/QueryClient"

export const AppRoot: VFC = () => {
  return (
    <AppQueryClientProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <RootTabNavigator />
      </NavigationContainer>
    </AppQueryClientProvider>
  )
}
