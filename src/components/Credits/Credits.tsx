import { CreditTile } from "@components/CreditTile"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { Sections } from "@components/Sections"
import { combineSameCrewMembers, Credit, CreditType } from "@queries/credit"
import { ProductionDetail, ProductionDetailExtra } from "@queries/production"
import React, { VFC } from "react"

export const CreditsSection: VFC<{
  detail: ProductionDetail
}> = ({ detail }) => (
  <Sections
    sections={[
      {
        title: "Cast",
        Section: () => <ProductionCastMembers detail={detail} />,
      },
      {
        title: "Crew",
        Section: () => <ProductionCrewMembers detail={detail} />,
      },
    ]}
  />
)

export const ProductionCastMembers: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail }) =>
  detail?.credits?.cast ? (
    <CreditList type={"cast"} credits={detail.credits.cast} />
  ) : null

export const ProductionCrewMembers: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail }) =>
  detail?.credits?.crew ? (
    <CreditList type={"crew"} credits={detail.credits.crew} />
  ) : null

const CreditList: VFC<{
  title?: string
  type: CreditType
  credits: Credit[]
}> = ({ title, type, credits }) => {
  console.log(credits.filter(({ name }) => name && /Francis/.test(name)))
  return (
    <HorizontalFlatList
      title={title}
      data={type === "cast" ? credits : combineSameCrewMembers(credits)}
      renderItem={({ item }) => <CreditTile type={type} credit={item} />}
      keyExtractor={(item) => `${item.credit_id}`}
    />
  )
}
