import { RootTabNavigator } from "@components/RootTabNavigator"
import { StatusBar } from "expo-status-bar"
import React, { VFC } from "react"
import { AppQueryClientProvider } from "src/queries/QueryClient"

export const AppRoot: VFC = () => {
  return (
    <AppQueryClientProvider>
      <StatusBar style="auto" />
      <RootTabNavigator />
    </AppQueryClientProvider>
  )
}
