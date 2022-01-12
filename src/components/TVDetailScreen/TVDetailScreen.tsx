import { WithCommonProductionDetails } from "@components/WithCommonProductionDetails"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { useTVDetailExtra } from "@queries/tv"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"

export const TVDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "TVDetail">
> = ({
  route: {
    params: { id, production },
  },
}) => {
  const detail = { ...{ id }, ...production, ...useTVDetailExtra(id).data }
  return <WithCommonProductionDetails type="tv" detail={detail} />
}
