import { StatusBar } from "expo-status-bar"
import React, { VFC } from "react"
import { SafeAreaView } from "react-native"
import { AppQueryClientProvider } from "src/queries/QueryClient"
import { ProductionLists } from "@components/ProductionLists"

export const AppRoot: VFC = () => (
  <AppQueryClientProvider>
    <SafeAreaView>
      <StatusBar style="auto" />
      <ProductionLists type="tv" />
    </SafeAreaView>
  </AppQueryClientProvider>
)
