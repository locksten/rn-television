import { WithCommonProductionDetails } from "@components/WithCommonProductionDetails"
import { CommonStackParams } from "@components/WithCommonStackScreens"
import { MovieDetailExtra, useMovieDetailExtra } from "@queries/movie"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"

export const MovieDetailScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "MovieDetail">
> = ({
  route: {
    params: { id, production },
  },
}) => {
  const { data, isLoading } = useMovieDetailExtra(id)
  const detail: MovieDetailExtra & { id: number } = {
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
