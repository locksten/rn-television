import { MovieDetailScreen } from "@components/MovieDetailScreen"
import { TVDetailScreen } from "@components/TVDetailScreen"
import { WebViewScreen } from "@components/WebViewScreen"
import { YouTubeScreen } from "@components/YouTubeScreen"
import { SeasonDetailScreen } from "@components/SeasonDetailScreen"
import { Movie } from "@queries/movie"
import { Episode, Season } from "@queries/season"
import { TV } from "@queries/tv"
import { Video } from "@queries/video"
import { TypedNavigator } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import React, { FC } from "react"
import { YoutubeMeta } from "react-native-youtube-iframe"
import { EpisodeDetailScreen } from "@components/EpisodeDetailScreen"

export type CommonStackParams = {
  TVDetail: { id: number; production?: TV }
  MovieDetail: { id: number; production?: Movie }
  SeasonDetail: { tvId: number; seasonNumber: number; season?: Season }
  EpisodeDetail: {
    tvId: number
    seasonNumber: number
    episodeNumber: number
    episode?: Episode
  }
  YouTube: { video: Video; meta?: YoutubeMeta }
  WebView: { url: string; title?: string }
}

const GenericlessCommonStack = () =>
  createNativeStackNavigator<CommonStackParams>()
type CommonStack = ReturnType<typeof GenericlessCommonStack>

export type CommonStackNavigationProp =
  NativeStackNavigationProp<CommonStackParams>

export const WithCommonStackScreens: FC<{
  // https://github.com/react-navigation/react-navigation/issues/8139
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stack: TypedNavigator<any, any, any, any, any>
}> = ({ stack, children }) => {
  const Stack = stack as CommonStack
  return (
    <Stack.Navigator>
      {children}
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={({ route }) => ({
          title: route.params.production?.title ?? "Movie",
        })}
      />
      <Stack.Screen
        name="TVDetail"
        component={TVDetailScreen}
        options={({ route }) => ({
          title: route.params.production?.name ?? "Show",
        })}
      />
      <Stack.Screen
        name="SeasonDetail"
        component={SeasonDetailScreen}
        options={({ route }) => ({
          title: route.params.season?.name ?? "Season",
        })}
      />
      <Stack.Screen
        name="EpisodeDetail"
        component={EpisodeDetailScreen}
        options={({ route }) => ({
          title: route.params.episode?.name ?? "Episode",
        })}
      />
      <Stack.Screen
        name="YouTube"
        component={YouTubeScreen}
        options={({ route }) => ({
          title: route.params.video.name || "Video",
          presentation: "modal",
        })}
      />
      <Stack.Screen
        name="WebView"
        component={WebViewScreen}
        options={({ route }) => ({
          title: route.params.title || "Web",
          presentation: "modal",
        })}
      />
    </Stack.Navigator>
  )
}
