import { WithCommonProductionDetails } from "@components/WithCommonProductionDetails"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { useProductionDetailExtra, MovieDetailExtra } from "@queries/production"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"

export const MovieDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "MovieDetail">
> = ({
  route: {
    params: { id, production },
  },
}) => {
  const { data, isLoading } = useProductionDetailExtra("movie", id)
  const detail: (MovieDetailExtra | undefined) & { id: number } = {
    ...{ id },
    ...production,
    ...{ release_date: undefined },
    ...data,
  }
  return (
    <WithCommonProductionDetails
      type="movie"
      detail={detail}
      isLoading={isLoading}
    />
  )
}
