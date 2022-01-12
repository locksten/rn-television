import { AccountScreenNavigationProp } from "@components/AccountScreen"
import Ionicons from "@expo/vector-icons/Ionicons"
import {
  fetchSetProductionFavoriteOrWatchlistState,
  ProductionAccountStates,
} from "@queries/account"
import { useAuth } from "@queries/auth"
import { ProductionType } from "@queries/production"
import { useNavigation } from "@react-navigation/native"
import React, { useState, VFC } from "react"
import { Pressable } from "react-native"
import { useQueryClient } from "react-query"

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
  const [isProcessing, setProcessing] = useState(false)
  const navigation = useNavigation<AccountScreenNavigationProp>()

  return (
    <Pressable
      onPress={async () => {
        if (!session) {
          navigation.navigate("Account", {
            screen: "Login",
          })
          return
        }

        setProcessing(true)
        const success = await fetchSetProductionFavoriteOrWatchlistState(
          session,
          type,
          productionType,
          id,
          !currentState,
        )
        if (success) {
          const accountStatesKey = [productionType, id, "accountStates"]
          queryClient.invalidateQueries(accountStatesKey)
          queryClient.invalidateQueries(["account", "productionList"])

          const update: ProductionAccountStates =
            type === "favorite"
              ? { favorite: !currentState }
              : { watchlist: !currentState }
          queryClient.setQueryData(accountStatesKey, {
            ...queryClient.getQueryData(accountStatesKey),
            ...update,
          })
        }
        setProcessing(false)
      }}
    >
      <Ionicons
        name={type === "favorite" ? "heart" : "bookmark"}
        color={
          !states || isProcessing ? "gray" : currentState ? "#dc2626" : "black"
        }
        size={32}
      />
    </Pressable>
  )
}
