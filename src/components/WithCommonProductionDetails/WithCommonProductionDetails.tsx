import { AddToListButtons } from "@components/AddToListButtons"
import { ProductionCastMembers } from "@components/Credits"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { ProductionList } from "@components/ProductionList"
import { ProductionTile } from "@components/ProductionTile"
import { RatingRing } from "@components/RatingRing"
import { SeparatedBy } from "@components/SeparatedBy"
import { VideoTile } from "@components/VideoTile"
import { CommonStackNavigationProp } from "@components/WithCommonStackScreens"
import { Movie, MovieDetail, MovieDetailExtra } from "@queries/movie"
import {
  ProductionDetailExtra,
  ProductionType,
  useProductionRecommendations,
} from "@queries/production"
import { TV, TVDetail, TVDetailExtra } from "@queries/tv"
import { useNavigation } from "@react-navigation/native"
import React, { ComponentType, FC, useState, VFC } from "react"
import { ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import { shortDate } from "src/utils"
import tailwind from "tailwind-rn"

const Separator = <View style={tailwind("h-4")} />

export const WithCommonProductionDetails: FC<{
  MiddleSlot?: ComponentType
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ MiddleSlot, type, detail, children }) => {
  return (
    <ScrollView>
      <SeparatedBy separator={Separator} start end>
        <MainSection type={type} detail={detail} />
        <VideoSection detail={detail} />
        {!!MiddleSlot && <MiddleSlot />}
        <ProductionCastMembers detail={detail} />
        <Recommendations type={type} detail={detail} />
        {children}
      </SeparatedBy>
    </ScrollView>
  )
}

const MainSection: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail }) => {
  return (
    <SeparatedBy style={tailwind("px-4")} separator={Separator}>
      <View>
        <PosterSection type={type} detail={detail} />
        <Title detail={detail} />
        <Tagline detail={detail} />
      </View>
      <View>
        <Genres detail={detail} />
        <Overview detail={detail} />
      </View>
    </SeparatedBy>
  )
}

const Title: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail }) => {
  const title = (detail as Movie).title || (detail as TV).name
  return title ? (
    <Text style={tailwind("font-bold text-lg")}>{title}</Text>
  ) : null
}

const Tagline: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail: { tagline } }) =>
  tagline ? (
    <Text style={tailwind("font-bold text-gray-500")}>{tagline}</Text>
  ) : null

const Genres: VFC<{
  detail: ProductionDetailExtra
}> = ({ detail: { genres } }) =>
  genres && genres.length !== 0 ? (
    <Text style={tailwind("pb-2")}>{genres.map((g) => g.name).join(", ")}</Text>
  ) : null

const Recommendations: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail }) => {
  const navigation = useNavigation<CommonStackNavigationProp>()
  const recommendations = useProductionRecommendations(type, detail.id).data
    ?.results
  return (
    <ProductionList
      title="Recommendations"
      productions={recommendations}
      onPress={(id, production) =>
        navigation.push(type === "tv" ? "TVDetail" : "MovieDetail", {
          id,
          production,
        })
      }
    />
  )
}

const Overview: VFC<{ detail: ProductionDetailExtra }> = ({
  detail: { overview },
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return overview ? (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsExpanded((isExpanded) => !isExpanded)
      }}
    >
      <Text numberOfLines={isExpanded ? undefined : 4}>{overview}</Text>
    </TouchableWithoutFeedback>
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
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`
}

const PosterSection: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail }) => {
  return (
    <View style={tailwind("flex-row")}>
      <View>
        <ProductionTile key={detail.id} production={detail} height={228} />
      </View>
      <View style={tailwind("flex-1 pl-2")}>
        <ButtonSection type={type} detail={detail} />
        <View style={tailwind("flex-1 justify-start pt-4")}>
          <Status detail={detail} />
          <InProduction detail={detail} />
          <ReleaseDate detail={detail} />
          <AirDates detail={detail} />
          <Runtime detail={detail} />
          <EpisodeCount detail={detail} />
          <ProductionCompanies type={type} detail={detail} />
          <HomePageLink detail={detail} />
        </View>
      </View>
    </View>
  )
}
const Status: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { status } = detail
  return status ? <Text style={tailwind("font-bold")}>{status}</Text> : null
}

const InProduction: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { in_production } = detail as TVDetailExtra
  return in_production ? (
    <Text style={tailwind("font-bold")}>In Production</Text>
  ) : null
}

const AirDates: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { first_air_date, last_air_date } = detail as TVDetailExtra
  return first_air_date ? (
    <View style={tailwind("flex-row flex-wrap")}>
      <Text>{`${shortDate(first_air_date)} `}</Text>
      {!!last_air_date && <Text>{`to ${shortDate(last_air_date)}`}</Text>}
    </View>
  ) : null
}

const ReleaseDate: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { release_date } = detail as MovieDetailExtra
  return release_date ? (
    <Text>{`${shortDate(release_date)} Released`}</Text>
  ) : null
}

const ProductionCompanies: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra
}> = ({ type, detail }) => {
  const { production_companies } = detail
  return production_companies && production_companies.length !== 0 ? (
    <Text numberOfLines={type === "tv" ? 1 : 3} style={tailwind("flex-wrap")}>
      {production_companies?.map((company) => company.name).join(", ")}
    </Text>
  ) : null
}

const EpisodeCount: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const { number_of_episodes } = detail as TVDetailExtra
  return number_of_episodes ? <Text>{number_of_episodes} Episodes</Text> : null
}

const ButtonSection: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail: { vote_average, id } }) => (
  <View style={tailwind("flex-row")}>
    <View>
      <AddToListButtons type={type} id={id} />
    </View>
    {!!vote_average && (
      <View style={tailwind(" flex-1 justify-center items-center")}>
        <RatingRing percentage={vote_average / 10} myPercentage={0.6} />
      </View>
    )}
  </View>
)

const Runtime: VFC<{ detail: ProductionDetailExtra }> = ({ detail }) => {
  const runtime = productionDetailToRuntime(detail)
  return runtime ? <Text>{runtime} Runtime</Text> : null
}

const VideoSection: VFC<{
  detail: ProductionDetailExtra & { id: number }
}> = ({ detail }) => (
  <HorizontalFlatList
    data={detail.videos?.results}
    renderItem={({ item }) => <VideoTile video={item} />}
    keyExtractor={(item) => `${item.id}`}
  />
)
