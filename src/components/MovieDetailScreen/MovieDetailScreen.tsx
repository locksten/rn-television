import { WithCommonProductionDetails } from "@components/WithCommonProductionDetails"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { useMovieDetailExtra } from "@queries/movie"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"

export const MovieDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "MovieDetail"> & {
    other: number
  }
> = ({
  route: {
    params: { id, production },
  },
}) => {
  const detail = { ...{ id }, ...production, ...useMovieDetailExtra(id).data }
  return <WithCommonProductionDetails type="movie" detail={detail} />
}
