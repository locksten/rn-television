import { LoginScreen } from "@components/LoginScreen"
import { useAccountDetail } from "@queries/account"
import { useAuth } from "@queries/auth"
import React, { VFC } from "react"
import { Button, Text, View } from "react-native"
import tailwind from "tailwind-rn"

export const AccountScreen: VFC = () =>
  useAuth()?.isLoggedIn ? <LoggedInAccountScreen /> : <LoginScreen />

export const LoggedInAccountScreen: VFC = () => {
  const { logOut } = useAuth()
  const { data: account } = useAccountDetail()
  return (
    <View style={tailwind("p-8")}>
      <Text style={tailwind("font-bold text-center")}>{account?.username}</Text>
      <Button title="Log out" onPress={() => logOut()} />
    </View>
  )
}
