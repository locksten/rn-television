import { AddToListButtons } from "@components/AddToListButtons"
import { ProductionList } from "@components/ProductionList"
import { ProductionTile } from "@components/ProductionTile"
import { SeparatedBy } from "@components/SeparatedBy"
import { VideoTile } from "@components/VideoTile"
import { CommonStackNavigationProp } from "@components/WithCommonStackScreens"
import { Movie } from "@queries/movie"
import {
  ProductionDetailExtra,
  ProductionType,
  useProductionRecommendations,
} from "@queries/production"
import { TV } from "@queries/tv"
import { useNavigation } from "@react-navigation/native"
import React, { FC, useState, VFC } from "react"
import {
  FlatList,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import tailwind from "tailwind-rn"

const Separator = <View style={tailwind("h-4")} />

export const WithCommonProductionDetails: FC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail, children }) => {
  const navigation = useNavigation<CommonStackNavigationProp>()
  const recommendations = useProductionRecommendations(type, detail.id).data
    ?.results
  const title = (detail as Movie).title || (detail as TV).name
  const {
    tagline,
    overview,
    popularity,
    status,
    vote_average,
    vote_count,
    genres,
    original_language,
    homepage,
    spoken_languages,
    credits,
  } = detail
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
          <Overview text={overview} />
        </SeparatedBy>
        <VideoSection detail={detail} />
        <ProductionList
          title="If You Liked This"
          productionType={type}
          productions={recommendations}
          onPress={(type, id, production) =>
            navigation.push(type === "tv" ? "TVDetail" : "MovieDetail", {
              id,
              production,
            })
          }
        />
        <Text>popularity: {popularity}</Text>
        <Text>vote_average: {vote_average}</Text>
        <Text>vote_count: {vote_count}</Text>
        <Text>status: {status}</Text>
        <Text>genres: {genres?.map((g) => g.name)?.join(", ")}</Text>
        <Text>homepage: {homepage}</Text>
        <Text>original_language: {original_language}</Text>
        <Text>
          spoken_languages: {spoken_languages?.map((g) => g.name)?.join(", ")}
        </Text>
        <Text>cast: {credits?.cast?.map((v) => v.name)?.join(", ")}</Text>
        <Text>crew: {credits?.crew?.map((v) => v.name)?.join(", ")}</Text>
        {children}
      </SeparatedBy>
    </ScrollView>
  )
}

const Overview: VFC<{ text?: string }> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  if (!text) return null
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsExpanded((isExpanded) => !isExpanded)
      }}
    >
      <Text numberOfLines={isExpanded ? undefined : 4}>{text}</Text>
    </TouchableWithoutFeedback>
  )
}

const PosterSection: VFC<{
  type: ProductionType
  detail: ProductionDetailExtra & { id: number }
}> = ({ type, detail }) => {
  const { id } = detail
  return (
    <View style={tailwind("flex-row")}>
      <View style={tailwind("h-48")}>
        <ProductionTile key={id} type={type} production={detail} />
      </View>
      <View style={tailwind("pl-2")}>
        <AddToListButtons type={type} id={id} />
      </View>
    </View>
  )
}

const VideoSection: VFC<{
  detail: ProductionDetailExtra & { id: number }
}> = ({ detail }) => {
  const videos = detail.videos?.results
  return (
    <FlatList
      data={videos}
      horizontal
      renderItem={({ item }) => <VideoTile video={item} />}
      ItemSeparatorComponent={() => <View style={tailwind("w-2")} />}
      ListHeaderComponent={() => <View style={tailwind("w-4")} />}
      ListFooterComponent={() => <View style={tailwind("w-4")} />}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => `${item.id}`}
    />
  )
}
