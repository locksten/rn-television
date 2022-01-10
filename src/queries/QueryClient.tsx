import React, { FC } from "react"
import { QueryClient, QueryClientProvider } from "react-query"

export const AppQueryClientProvider: FC = ({ children }) => {
  const client = new QueryClient()
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
