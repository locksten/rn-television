import { MovieDetailScreen } from "@components/MovieDetailScreen"
import { TVDetailScreen } from "@components/TVDetailScreen"
import { Movie } from "@queries/movie"
import { TV } from "@queries/tv"
import { TypedNavigator } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { FC } from "react"

export type CommonStackParams = {
  TVDetail: { id: number; production?: TV }
  MovieDetail: { id: number; production?: Movie }
}

const GenericlessCommonStack = () =>
  createNativeStackNavigator<CommonStackParams>()
type CommonStack = ReturnType<typeof GenericlessCommonStack>

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
    </Stack.Navigator>
  )
}
