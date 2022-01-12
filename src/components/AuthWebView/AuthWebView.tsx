import { AccountScreenParams } from "@components/AccountScreen"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import WebView from "react-native-webview"

export const AuthWebView: VFC<
  NativeStackScreenProps<AccountScreenParams, "AuthWebView">
> = ({
  route: {
    params: { requestToken },
  },
}) => (
  <WebView
    source={{ uri: `https://www.themoviedb.org/authenticate/${requestToken}` }}
  />
)
