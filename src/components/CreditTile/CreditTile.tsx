import { AppImage } from "@components/AppImage"
import { CastMember, CrewMember, GuestStar } from "@queries/credit"
import { creditImageUrl } from "@queries/image"
import React, { VFC } from "react"
import { Text, View } from "react-native"
import tailwind from "tailwind-rn"

export const CreditTile: VFC<
  { height?: number } & (
    | { type: "cast"; credit: CastMember }
    | { type: "crew"; credit: CrewMember }
    | { type: "guestStar"; credit: GuestStar }
  )
> = ({ height, ...props }) => (
  <AppImage
    vertical
    aspectRatio={2 / 3}
    size={height}
    uri={creditImageUrl(props.credit.profile_path)}
    renderEnd={() => (
      <View style={tailwind("flex-row")}>
        <Text numberOfLines={4}>
          {!!props.credit.name && (
            <Text style={tailwind("font-bold")}>{`${
              props.credit.name
            }${"\n"}`}</Text>
          )}
          <Text>
            {props.type === "cast"
              ? props.credit.character
              : props.type === "crew"
              ? props.credit.job
              : props.credit.character_name}
          </Text>
        </Text>
      </View>
    )}
  />
)

export const CreditTileHeightPlaceholder: VFC<{ height?: number }> = ({
  height,
}) => (
  <View style={tailwind("w-0 opacity-0")}>
    <CreditTile
      type={"cast"}
      credit={{ name: "\n", character: "\n" }}
      height={height}
    />
  </View>
)
