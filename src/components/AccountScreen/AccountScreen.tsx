import { LoginScreen } from "@components/LoginScreen"
import { ProductionLists } from "@components/ProductionLists"
import { SeparatedBy } from "@components/SeparatedBy"
import { useAccountDetail, useAccountProductionLists } from "@queries/account"
import { useAuth } from "@queries/auth"
import React, { VFC } from "react"
import { Button, ScrollView, Text, View } from "react-native"
import tailwind from "tailwind-rn"

export const AccountScreen: VFC = () =>
  useAuth()?.isLoggedIn ? <LoggedInAccountScreen /> : <LoginScreen />

export const LoggedInAccountScreen: VFC = () => {
  const { logOut } = useAuth()
  const { data: account } = useAccountDetail()
  const lists = useAccountProductionLists()
  return (
    <ScrollView>
      <SeparatedBy separator={<View style={tailwind("h-8")} />} start end>
        <View style={tailwind("px-8")}>
          <Text style={tailwind("pb-2 font-bold text-center")}>
            {account?.username}
          </Text>
          <Button title="Log out" onPress={() => logOut()} />
        </View>
        <ProductionLists lists={lists} />
      </SeparatedBy>
    </ScrollView>
  )
}
