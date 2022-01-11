import {
  fetchNewRequestToken,
  fetchNewSessionToken,
  useAuth,
} from "@queries/auth"
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"
import React, { useState, VFC } from "react"
import { Button, Text, View } from "react-native"
import WebView from "react-native-webview"
import tailwind from "tailwind-rn"

type LoginScreenParams = {
  Home: undefined
  AuthWebView: { requestToken: string }
}

export const LoginScreen: VFC = () => {
  const Stack = createNativeStackNavigator<LoginScreenParams>()
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthWebView"
        options={{ title: "Log in", headerBackTitle: "Finish" }}
        component={AuthWebView}
      />
    </Stack.Navigator>
  )
}

type AuthStatus = "none" | "authenticating" | "failed"

const HomeScreen: VFC<NativeStackScreenProps<LoginScreenParams, "Home">> = ({
  navigation,
}) => {
  const { setSessionToken } = useAuth()
  const [requestToken, setRequestToken] = useState<string | undefined>()
  const [status, setStatus] = useState<AuthStatus>("none")

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setStatus("none")
      if (!requestToken) return

      setStatus("authenticating")
      const sessionToken = await fetchNewSessionToken(requestToken)

      setRequestToken(undefined)
      if (!sessionToken) {
        setStatus("failed")
        return
      }
      setSessionToken(sessionToken)
    })
    return unsubscribe
  }, [navigation, requestToken, setSessionToken])

  return (
    <View style={tailwind("justify-center h-full")}>
      <Status status={status} />
      <View style={tailwind("pt-2 px-16")}>
        <Button
          title="Log in"
          onPress={async () => {
            setStatus("authenticating")
            const requestToken = await fetchNewRequestToken()
            if (!requestToken) {
              setStatus("failed")
              return
            }
            setStatus("authenticating")
            setRequestToken(requestToken)
            navigation.push("AuthWebView", { requestToken })
          }}
        />
      </View>
    </View>
  )
}

const AuthWebView: VFC<
  NativeStackScreenProps<LoginScreenParams, "AuthWebView">
> = ({
  route: {
    params: { requestToken },
  },
}) => (
  <WebView
    source={{ uri: `https://www.themoviedb.org/authenticate/${requestToken}` }}
  />
)

const Status: VFC<{ status: AuthStatus }> = ({ status }) => {
  const color = status === "failed" ? "red" : "yellow"
  const text =
    status === "failed"
      ? "Something went wrong\nPlease try again"
      : "Authenticating"
  return (
    <View
      style={[
        tailwind(`p-4 opacity-${status === "none" ? 0 : 100} bg-${color}-100`),
      ]}
    >
      <Text style={tailwind(`font-bold text-center text-${color}-800`)}>
        {text}
      </Text>
    </View>
  )
}
