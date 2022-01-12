import { FavoriteOrAddToWatchlistButton } from "@components/FavoriteOrAddToWatchlistButton"
import { ProductionType, useProductionAccountStates } from "@queries/production"
import React, { VFC } from "react"
import { View } from "react-native"
import tailwind from "tailwind-rn"

export const AddToListButtons: VFC<{
  type: ProductionType
  id: number
}> = ({ id, type }) => {
  const states = useProductionAccountStates(type, id).data
  return (
    <View style={tailwind("flex-row w-full justify-evenly")}>
      <FavoriteOrAddToWatchlistButton
        type="favorite"
        states={states}
        productionType={type}
        id={id}
      />
      <FavoriteOrAddToWatchlistButton
        type="watchlist"
        states={states}
        productionType={type}
        id={id}
      />
    </View>
  )
}
