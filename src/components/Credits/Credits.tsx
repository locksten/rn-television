import { CreditTile, CreditTileHeightPlaceholder } from "@components/CreditTile"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { Sections } from "@components/Sections"
import { combineSameCrewMembers, Credit, CreditType } from "@queries/credit"
import { ProductionDetailExtra } from "@queries/production"
import React, { VFC } from "react"
import { View } from "react-native"
import tailwind from "tailwind-rn"

export const CreditsSection: VFC<{
  detail: ProductionDetailExtra
  isLoading: boolean
  height: number
}> = ({ detail, isLoading, height }) => {
  const cast = detail.credits?.cast
  const crew = detail.credits?.crew
  return (
    <Sections
      sections={{
        ...(isLoading || cast?.length
          ? {
              Cast: () => (
                <CreditList type={"cast"} height={height} credits={cast} />
              ),
            }
          : undefined),
        ...(isLoading || crew?.length
          ? {
              Crew: () => (
                <CreditList type={"crew"} height={height} credits={crew} />
              ),
            }
          : undefined),
      }}
    />
  )
}

const CreditList: VFC<{
  height: number
  type: CreditType
  credits?: Credit[]
}> = ({ height, type, credits }) => (
  <View style={tailwind("flex-row")}>
    <CreditTileHeightPlaceholder height={height} />
    <HorizontalFlatList
      data={
        type === "cast"
          ? credits
          : credits
          ? combineSameCrewMembers(credits)
          : undefined
      }
      renderItem={({ item }) => (
        <CreditTile type={type} credit={item} height={height} />
      )}
      keyExtractor={(item) => `${item.credit_id}`}
    />
  </View>
)
