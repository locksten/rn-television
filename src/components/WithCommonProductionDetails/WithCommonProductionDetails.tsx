import { CreditsSection } from "@components/CreditsSection"
import { FavoriteOrAddToWatchlistButton } from "@components/FavoriteOrAddToWatchlistButton"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { OverviewSection } from "@components/OverviewSection"
import { PosterTile, PosterTileHeightPlaceholder } from "@components/PosterTile"
import { RatingRing } from "@components/RatingRing"
import { TapToExpandText } from "@components/TapToExpandText"
import {
  detailPosterHeight,
  detailSpacing,
  productionImageHeight,
} from "@components/theme"
import { VideoSection } from "@components/VideoSection"
import { CommonStackNavigationProp } from "@components/WithCommonStackScreens"
import { ProductionAccountStates } from "@queries/account"
import { useProductionGenres } from "@queries/genre"
import { Movie, MovieDetail } from "@queries/movie"
import {
  MovieDetailExtra,
  Production,
  ProductionDetailExtra,
  ProductionType,
  TVDetailExtra,
  useProductionAccountStates,
  useProductionRecommendations,
} from "@queries/production"
import { TV, TVDetail } from "@queries/tv"
import { useNavigation } from "@react-navigation/native"
import React, { ComponentType, FC, VFC } from "react"
import { ScrollView, StyleProp, Text, View, ViewStyle } from "react-native"
import { shortDate, withNonBreakingSpaces } from "src/utils"
import tailwind from "tailwind-rn"

export const WithCommonProductionDetails: FC<{
  MiddleSlot?: ComponentType
  type: ProductionType
  isLoading: boolean
  detail: Production & ProductionDetailExtra & { id: number }
}> = ({ MiddleSlot, type, detail, isLoading, children }) => (
  <ScrollView>
    <MainSection type={type} detail={detail} style={detailSpacing} />
    <VideoSection
      videos={detail?.videos?.results}
      isLoading={isLoading}
      style={detailSpacing}
    />
    {!!MiddleSlot && <MiddleSlot />}
    <CreditsSection
      cast={detail.credits?.cast}
      crew={detail.credits?.crew}
      isLoading={isLoading}
      style={detailSpacing}
    />
    <Recommendations
      type={type}
      detail={detail}
      isLoading={isLoading}
      style={detailSpacing}
    />
    {children}
    <View style={detailSpacing} />
  </ScrollView>
)

const MainSection: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
  style?: StyleProp<ViewStyle>
}> = ({ type, detail, style }) => {
  return (
    <View style={[tailwind("px-4"), style]}>
      <PosterSection type={type} detail={detail} />
      <View style={tailwind("h-1")} />
      <TitleAndTagline detail={detail} />
      <View style={tailwind("h-2")} />
      <Genres detail={detail} type={type} />
      <View style={tailwind("h-2")} />
      <OverviewSection overview={detail.overview} collapsedLines={4} />
    </View>
  )
}

const TitleAndTagline: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail }) => {
  const title = (detail as Movie).title || (detail as TV).name
  const tagline = detail.tagline
  const tallerStyle = tailwind("font-bold text-lg leading-5")
  return (
    <View style={tailwind("flex-row")}>
      <Text style={[tallerStyle, tailwind("w-0")]}>{"\n"}</Text>
      <TapToExpandText collapsedLines={2}>
        <Text style={tallerStyle}>
          {title}
          <Text style={tailwind("font-bold text-base text-gray-500 leading-5")}>
            {!!tagline && `  ${tagline}`}
          </Text>
        </Text>
      </TapToExpandText>
    </View>
  )
}

const Genres: VFC<{
  type: ProductionType
  detail: Production
}> = ({ detail: { genre_ids }, type }) => {
  const allGenres = useProductionGenres(type)
  const genres = genre_ids
    ?.map((id) => allGenres?.find((g) => g.id === id)?.name)
    .filter((g) => g)
  return genres && genres.length ? <Text>{genres.join(", ")}</Text> : null
}

const Recommendations: VFC<{
  type: ProductionType
  isLoading: boolean
  detail: ProductionDetailExtra & { id: number }
  height?: number
  style?: StyleProp<ViewStyle>
}> = ({ type, isLoading, detail, height = productionImageHeight, style }) => {
  const navigation = useNavigation<CommonStackNavigationProp>()
  const recommendations = useProductionRecommendations(type, detail.id).data
    ?.results
  return isLoading || recommendations?.length ? (
    <View style={[tailwind("flex-row"), style]}>
      <PosterTileHeightPlaceholder height={height} />
      <HorizontalFlatList
        title="Recommendations"
        data={recommendations}
        renderItem={({ item }) => {
          const productionId = item.id
          return productionId ? (
            <PosterTile
              height={height}
              uri={item.poster_path}
              onPress={() =>
                navigation.push(type === "tv" ? "TVDetail" : "MovieDetail", {
                  id: productionId,
                  production: item,
                })
              }
            />
          ) : null
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  ) : null
}

const HomePageLink: VFC<{ detail: ProductionDetailExtra }> = ({
  detail: { homepage },
}) => {
  const navigation = useNavigation<CommonStackNavigationProp>()
  return homepage ? (
    <Text
      onPress={() => {
        navigation.push("WebView", { url: homepage, title: "Homepage" })
      }}
      style={tailwind("text-blue-800")}
    >
      Homepage
    </Text>
  ) : null
}

const productionDetailToRuntimeMinutes = (detail: ProductionDetailExtra) => {
  const runtime = (detail as MovieDetail).runtime
  if (runtime) return runtime
  const runtimes = (detail as TVDetail).episode_run_time
  if (!runtimes || runtimes.length === 0) return undefined
  return runtimes.reduce((sum, runtime) => sum + runtime) / runtimes.length
}

const productionDetailToRuntime = (detail: ProductionDetailExtra) => {
  const runtime = productionDetailToRuntimeMinutes(detail)
  if (!runtime) return undefined
  const hours = Math.round(runtime / 60)
  const minutes = Math.round(runtime % 60)
  return hours ? `${hours}h ${minutes ? `${minutes}m` : ""}` : `${minutes}m`
}

const PosterSection: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail }) => {
  return (
    <View style={tailwind("flex-row")}>
      <View style={[tailwind("flex-row")]}>
        <PosterTile
          key={detail.id}
          uri={detail.poster_path}
          height={detailPosterHeight}
        />
      </View>
      <View style={tailwind("flex-1 pl-2")}>
        <ButtonSection type={type} detail={detail} />
        <View style={tailwind("flex-1 justify-start pt-4")}>
          <TapToExpandText collapsedLines={8}>
            <Status detail={detail} />
            <InProduction detail={detail} />
            <ReleaseDate detail={detail} />
            <AirDates detail={detail} />
            <Runtime detail={detail} />
            <EpisodeCount detail={detail} />
            <ProductionCompanies detail={detail} />
          </TapToExpandText>
          <HomePageLink detail={detail} />
        </View>
      </View>
    </View>
  )
}
const Status: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { status } = detail
  return status ? (
    <Text style={tailwind("font-bold")}>
      {status}
      {"\n"}
    </Text>
  ) : null
}

const InProduction: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { in_production } = detail as TVDetailExtra
  return in_production ? (
    <Text style={tailwind("font-bold")}>In Production{"\n"}</Text>
  ) : null
}

const AirDates: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { first_air_date, last_air_date } = detail as TVDetailExtra
  return first_air_date ? (
    <Text>
      {`${withNonBreakingSpaces(shortDate(first_air_date))} `}
      {!!last_air_date && (
        <Text>{`to ${withNonBreakingSpaces(shortDate(last_air_date))}`}</Text>
      )}
      {(first_air_date || last_air_date) && <Text>{"\n"}</Text>}
    </Text>
  ) : null
}

const ReleaseDate: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { release_date } = detail as MovieDetailExtra
  return release_date ? (
    <Text>
      {`${shortDate(release_date)} Released`}
      {"\n"}
    </Text>
  ) : null
}

const ProductionCompanies: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail }) => {
  const { production_companies } = detail
  return production_companies && production_companies.length ? (
    <Text style={tailwind("flex-wrap")}>
      {production_companies?.map((company) => company.name).join(", ")}
    </Text>
  ) : null
}

const EpisodeCount: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { number_of_episodes } = detail as TVDetailExtra
  return number_of_episodes ? (
    <Text>
      {number_of_episodes} Episodes{"\n"}
    </Text>
  ) : null
}

const ButtonSection: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail }) => {
  const states = useProductionAccountStates(type, detail.id)
  return (
    <View style={[tailwind("flex-row")]}>
      <View>
        <FavoriteOrAddToWatchlistButton
          type="favorite"
          states={states.data}
          productionType={type}
          id={detail.id}
        />
        <FavoriteOrAddToWatchlistButton
          type="watchlist"
          states={states.data}
          productionType={type}
          id={detail.id}
        />
      </View>
      <View style={tailwind("flex-1 justify-center items-start pl-2")}>
        <Ratings detail={detail} productionType={type} states={states.data} />
      </View>
    </View>
  )
}
const Ratings: VFC<{
  productionType: ProductionType
  detail: ProductionDetailExtra & { id: number }
  states?: ProductionAccountStates
}> = ({ productionType, detail: { vote_average, id }, states }) => {
  const percentage = vote_average ? vote_average / 10 : undefined
  const myPercentage = states?.rated?.value
    ? states?.rated?.value / 10
    : undefined
  return (
    <RatingRing
      percentage={percentage}
      myPercentage={myPercentage}
      productionType={productionType}
      id={id}
      size={70}
    />
  )
}

const Runtime: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const runtime = productionDetailToRuntime(detail)
  return runtime ? (
    <Text>
      {runtime} Runtime{"\n"}
    </Text>
  ) : null
}
