import { CommonStackParams } from "@components/WithCommonStackScreens"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { VFC } from "react"
import WebView from "react-native-webview"

export const WebViewScreen: VFC<
  NativeStackScreenProps<CommonStackParams, "WebView">
> = ({
  route: {
    params: { url },
  },
}) => <WebView source={{ uri: url }} />
