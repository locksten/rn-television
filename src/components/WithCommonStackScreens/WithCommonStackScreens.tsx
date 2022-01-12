import { MovieDetailScreen } from "@components/MovieDetailScreen"
import { TVDetailScreen } from "@components/TVDetailScreen"
import { YouTubeScreen } from "@components/YouTubeScreen"
import { Movie } from "@queries/movie"
import { TV } from "@queries/tv"
import { Video } from "@queries/video"
import { TypedNavigator } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"
import React, { FC } from "react"
import { YoutubeMeta } from "react-native-youtube-iframe"

export type CommonStackParams = {
  TVDetail: { id: number; production?: TV }
  MovieDetail: { id: number; production?: Movie }
  YouTube: { video: Video; meta?: YoutubeMeta }
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
        name="TVDetail"
        component={TVDetailScreen}
        options={({ route }) => ({ title: route.params.production?.name })}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={({ route }) => ({ title: route.params.production?.title })}
      />
      <Stack.Screen
        name="YouTube"
        component={YouTubeScreen}
        options={({ route }) => ({
          title: route.params.video.name || "Video",
          presentation: "modal",
        })}
      />
    </Stack.Navigator>
  )
}
