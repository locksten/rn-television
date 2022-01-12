import { CreditTile } from "@components/CreditTile"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { Credit, CreditType } from "@queries/credit"
import { ProductionDetailExtra } from "@queries/production"
import React, { VFC } from "react"

export const ProductionCastMembers: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail }) =>
  detail?.credits?.cast ? (
    <Credits type={"cast"} title={"Cast"} credits={detail.credits.cast} />
  ) : null

export const ProductionCrewMembers: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail }) =>
  detail?.credits?.crew ? (
    <Credits type={"crew"} title={"Crew"} credits={detail.credits.crew} />
  ) : null

const Credits: VFC<{
  title?: string
  type: CreditType
  credits: Credit[]
}> = ({ title, type, credits }) => {
  return (
    <HorizontalFlatList
      title={title}
      data={credits.filter((credit) => credit.profile_path)}
      renderItem={({ item }) => <CreditTile type={type} credit={item} />}
      keyExtractor={(item) => `${item.credit_id}`}
    />
  )
}
