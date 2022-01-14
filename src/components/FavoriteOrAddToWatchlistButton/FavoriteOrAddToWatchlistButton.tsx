import { RootTabsNavigationProp } from "@components/RootTabNavigator"
import Ionicons from "@expo/vector-icons/Ionicons"
import {
  fetchSetProductionAccountState,
  ProductionAccountStates,
} from "@queries/account"
import { Session, useAuth } from "@queries/auth"
import { ProductionType } from "@queries/production"
import { useNavigation } from "@react-navigation/native"
import React, { VFC } from "react"
import { Pressable } from "react-native"
import { useMutation, useQueryClient } from "react-query"

export const FavoriteOrAddToWatchlistButton: VFC<{
  type: "favorite" | "watchlist"
  states?: ProductionAccountStates
  productionType: ProductionType
  id: number
}> = ({ type, states, productionType, id }) => {
  const session = useAuth().getSession()
  const queryClient = useQueryClient()
  const currentState = !!(type === "watchlist"
    ? states?.watchlist
    : states?.favorite)
  const navigation = useNavigation<RootTabsNavigationProp>()

  const { isLoading, mutate } = useMutation((session: Session) => {
    return fetchSetProductionAccountState(
      session,
      type,
      productionType,
      id,
      !currentState,
    )
  })

  return (
    <Pressable
      disabled={isLoading}
      onPress={async () => {
        if (!session) {
          navigation.navigate("Account", {
            screen: "Login",
          })
          return
        }
        const accountStatesKey = [productionType, id, "accountStates"]
        mutate(session, {
          onSuccess: () => {
            queryClient.invalidateQueries(["account", "productionList"])
            const update: ProductionAccountStates =
              type === "favorite"
                ? { favorite: !currentState }
                : { watchlist: !currentState }
            queryClient.setQueryData(accountStatesKey, {
              ...queryClient.getQueryData(accountStatesKey),
              ...update,
            })
          },
        })
      }}
    >
      <Ionicons
        name={type === "favorite" ? "heart" : "bookmark"}
        color={isLoading ? "gray" : currentState ? "#dc2626" : "black"}
        size={36}
      />
    </Pressable>
  )
}
