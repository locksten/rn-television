import { AuthWebView } from "@components/AuthWebView"
import { LoginScreen } from "@components/LoginScreen"
import { ProductionLists } from "@components/ProductionLists"
import { RootTabs } from "@components/RootTabNavigator"
import {
  CommonStackParams,
  WithCommonStackScreens,
} from "@components/WithCommonStackScreens"
import { useAccountDetail, useAccountProductionLists } from "@queries/account"
import { useAuth } from "@queries/auth"
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp } from "@react-navigation/native"
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types"
import React, { VFC } from "react"
import { Button, ScrollView, Text, View } from "react-native"
import tailwind from "tailwind-rn"

export type AccountScreenParams = CommonStackParams & {
  Home: undefined
  Login: undefined
  AuthWebView: { requestToken: string }
}

export type AccountScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabs, "Account">,
  NativeStackNavigationProp<AccountScreenParams>
>

export const AccountScreen: VFC<
  BottomTabScreenProps<RootTabs, "Account">
> = () => {
  const Stack = createNativeStackNavigator<AccountScreenParams>()
  return (
    <WithCommonStackScreens stack={Stack}>
      {useAuth()?.isLoggedIn && (
        <Stack.Group>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Group>
      )}
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="AuthWebView"
        options={{
          title: "Log in",
          presentation: "modal",
        }}
        component={AuthWebView}
      />
    </WithCommonStackScreens>
  )
}

const HomeScreen: VFC<NativeStackScreenProps<AccountScreenParams, "Home">> = ({
  navigation,
}) => {
  const { logOut } = useAuth()
  const { data: account } = useAccountDetail()
  const lists = useAccountProductionLists()
  return (
    <ScrollView>
      <View style={tailwind("h-16")} />
      <View style={tailwind("px-16")}>
        <Text style={tailwind("pb-2 font-bold text-center")}>
          {account?.username}
        </Text>
        <View style={tailwind("h-4")} />
        <Button title="Log out" onPress={() => logOut()} />
      </View>
      <ProductionLists
        lists={lists}
        onPress={(type, id, production) => {
          navigation.push(type === "tv" ? "TVDetail" : "MovieDetail", {
            id,
            production,
          })
        }}
      />
    </ScrollView>
  )
}
