import { AccountScreenParams } from "@components/AccountScreen"
import { TMDBAttribution } from "@components/TMDBAttribution"
import { fetchAccountDetail } from "@queries/account"
import {
  fetchNewRequestToken,
  fetchNewSessionToken,
  useAuth,
} from "@queries/auth"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useCallback, useState, VFC } from "react"
import { Button, Text, View } from "react-native"
import tailwind from "tailwind-rn"

type AuthStatus = "none" | "authenticating" | "failed"

export const LoginScreen: VFC<
  NativeStackScreenProps<AccountScreenParams, "Login">
> = ({ navigation }) => {
  const attemptAuth = useCallback(async () => {
    setStatus("authenticating")
    const requestToken = await fetchNewRequestToken()
    if (!requestToken) {
      setStatus("failed")
      return
    }
    setRequestToken(requestToken)
    navigation.push("AuthWebView", { requestToken })
  }, [navigation])

  const { logIn } = useAuth()
  const [requestToken, setRequestToken] = useState<string | undefined>()
  const [status, setStatus] = useState<AuthStatus>("none")

  React.useEffect(() => {
    return navigation.addListener(
      "blur",
      () => !requestToken && setStatus("none"),
    )
  }, [navigation, requestToken])

  React.useEffect(() => {
    return navigation.addListener("focus", async () => {
      if (!requestToken) return

      const sessionToken = await fetchNewSessionToken(requestToken)
      if (!sessionToken) {
        setRequestToken(undefined)
        setStatus("failed")
        return
      }

      const { id } = await fetchAccountDetail(sessionToken)
      if (!id) {
        setRequestToken(undefined)
        setStatus("failed")
        return
      }

      logIn({ id, token: sessionToken })
    })
  }, [logIn, navigation, requestToken])

  return (
    <View style={tailwind("items-center")}>
      <View style={tailwind("h-8")} />
      <TMDBAttribution />
      <View style={tailwind("h-32")} />
      <View style={tailwind("justify-around w-full")}>
        <Status status={status} />
        <View style={tailwind("h-4")} />
        <View style={tailwind("px-16 w-full")}>
          <Button
            title="Log in"
            onPress={attemptAuth}
            disabled={status === "authenticating"}
          />
        </View>
      </View>
    </View>
  )
}

const Status: VFC<{ status: AuthStatus }> = ({ status }) => {
  const color = status === "failed" ? "red" : "yellow"
  const text =
    status === "failed"
      ? "Something went wrong\nPlease try again"
      : "Authenticating"
  return (
    <View style={[tailwind(`h-20 w-full`)]}>
      {status !== "none" && (
        <View style={[tailwind(`p-4 h-full justify-center bg-${color}-100`)]}>
          <Text style={tailwind(`font-bold text-center text-${color}-800`)}>
            {text}
          </Text>
        </View>
      )}
    </View>
  )
}
