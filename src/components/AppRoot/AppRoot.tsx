import { RootTabNavigator } from "@components/RootTabNavigator"
import { navigationTheme } from "@components/theme"
import { useAuthProvider } from "@queries/auth"
import { GenreProvider } from "@queries/genre"
import { AppQueryClientProvider } from "@queries/queryClient"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import React, { VFC } from "react"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

export const AppRoot: VFC = () => {
  return (
    <AppQueryClientProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="auto" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AppQueryClientProvider>
  )
}

const RootNavigator: VFC = () => {
  const { AuthContextProvider } = useAuthProvider()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContextProvider>
        <GenreProvider>
          <RootTabNavigator />
        </GenreProvider>
      </AuthContextProvider>
    </SafeAreaView>
  )
}
