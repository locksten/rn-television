import { FavoriteOrAddToWatchlistButton } from "@components/FavoriteOrAddToWatchlistButton"
import { ProductionType, useProductionAccountStates } from "@queries/production"
import React, { VFC } from "react"

export const AddToListButtons: VFC<{
  type: ProductionType
  id: number
}> = ({ id, type }) => {
  const states = useProductionAccountStates(type, id).data
  return (
    <>
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
    </>
  )
}
