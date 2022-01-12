import { AddToListButtons } from "@components/AddToListButtons"
import { ProductionCastMembers } from "@components/Credits"
import { HorizontalFlatList } from "@components/HorizontalFlatList"
import { ProductionList } from "@components/ProductionList"
import { ProductionTile } from "@components/ProductionTile"
import { SeparatedBy } from "@components/SeparatedBy"
import { VideoTile } from "@components/VideoTile"
import { CommonStackNavigationProp } from "@components/WithCommonStackScreens"
import { Movie, MovieDetail, MovieDetailExtra } from "@queries/movie"
import {
  Production,
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
  const navigation = useNavigation<CommonStackNavigationProp>()
  const recommendations = useProductionRecommendations(type, detail.id).data
    ?.results
  const title = (detail as Movie).title || (detail as TV).name
  const { tagline, genres } = detail
  return (
    <ScrollView>
      <SeparatedBy separator={Separator} start end>
        <SeparatedBy style={tailwind("px-4")} separator={Separator}>
          <View>
            <PosterSection type={type} detail={detail} />
            <Text style={tailwind("font-bold text-lg")}>{title}</Text>
            {!!tagline && (
              <Text style={tailwind("font-bold text-gray-500")}>{tagline}</Text>
            )}
          </View>
          <View>
            <Text style={tailwind("pb-2")}>
              {genres?.map((g) => g.name)?.join(", ")}
            </Text>
            <Overview detail={detail} />
          </View>
        </SeparatedBy>
        <VideoSection detail={detail} />
        {!!MiddleSlot && <MiddleSlot />}
        <ProductionCastMembers detail={detail} />
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
        {children}
      </SeparatedBy>
    </ScrollView>
  )
}

const Overview: VFC<{ detail: ProductionDetailExtra }> = ({
  detail: { overview },
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  if (!overview) return null
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsExpanded((isExpanded) => !isExpanded)
      }}
    >
      <Text numberOfLines={isExpanded ? undefined : 4}>{overview}</Text>
    </TouchableWithoutFeedback>
  )
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

const productionDetailToRuntimeMinutes = (detail: Production) => {
  const runtime = (detail as MovieDetail).runtime
  if (runtime) return runtime

  const runtimes = (detail as TVDetail).episode_run_time
  if (!runtimes || runtimes.length === 0) return undefined
  return runtimes.reduce((sum, runtime) => sum + runtime) / runtimes.length
}

const productionDetailToRuntime = (detail: Production) => {
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
  const { id, status } = detail
  const {
    first_air_date,
    last_air_date,
    in_production,
    number_of_episodes,
    production_companies,
  } = detail as TVDetailExtra
  const { release_date } = detail as MovieDetailExtra
  return (
    <View style={tailwind("flex-row")}>
      <View>
        <ProductionTile key={id} production={detail} height={228} />
      </View>
      <View style={tailwind("flex-1 pl-2")}>
        <View style={tailwind("flex-row")}>
          <View>
            <AddToListButtons type={type} id={id} />
          </View>
        </View>
        <View style={tailwind("flex-1 justify-start pt-4")}>
          <Text style={tailwind("font-bold")}>{status}</Text>
          {!!in_production && (
            <Text style={tailwind("font-bold")}>In Production</Text>
          )}
          {release_date && <Text>{`${shortDate(release_date)} Released`}</Text>}
          {!!first_air_date && (
            <View style={tailwind("flex-row flex-wrap")}>
              <Text>{`${shortDate(first_air_date)} `}</Text>
              {last_air_date && <Text>{`to ${shortDate(last_air_date)}`}</Text>}
            </View>
          )}
          <Runtime detail={detail} />
          {!!number_of_episodes && <Text>{number_of_episodes} Episodes</Text>}
          <Text
            numberOfLines={type === "tv" ? 1 : 3}
            style={tailwind("flex-wrap")}
          >
            {production_companies?.map((company) => company.name).join(", ")}
          </Text>
          <HomePageLink detail={detail} />
        </View>
      </View>
    </View>
  )
}

const Runtime: VFC<{ detail: Production }> = ({ detail }) => {
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
