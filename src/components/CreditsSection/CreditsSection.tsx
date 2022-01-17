import { CreditTile, CreditTileHeightPlaceholder } from "@components/CreditTile"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { Sections } from "@components/Sections"
import { sectionImageHeight } from "@components/theme"
import {
  CastMember,
  combineSameCrewMembers,
  Credit,
  CreditType,
  CrewMember,
  GuestStar,
} from "@queries/credit"
import React, { VFC } from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import tailwind from "tailwind-rn"

export const CreditsSection: VFC<{
  cast?: CastMember[]
  crew?: CrewMember[]
  guestStars?: GuestStar[]
  isLoading: boolean
  height?: number
  style?: StyleProp<ViewStyle>
}> = ({
  cast,
  crew,
  guestStars,
  isLoading,
  height = sectionImageHeight,
  style,
}) => {
  return (
    <Sections
      style={style}
      sections={{
        ...(isLoading || guestStars?.length
          ? {
              Cast: () => (
                <CreditList
                  type={"guestStar"}
                  height={height}
                  credits={guestStars}
                />
              ),
            }
          : undefined),
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
