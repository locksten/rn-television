import React, { FC } from "react"
import { LogBox } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query"

// https://github.com/tannerlinsley/react-query/issues/1259
// this may be able to be removed after upgrading to RN 0.65
LogBox.ignoreLogs(["Setting a timer"])

export const AppQueryClientProvider: FC = ({ children }) => {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
