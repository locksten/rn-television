import { ProductionList } from "@components/ProductionList"
import { ProductionScreenParams } from "@components/ProductionScreen"
import { Production } from "@queries/production"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import React, { VFC } from "react"

export const ProductionDetailSimilar: VFC<{
  navigation: NativeStackNavigationProp<ProductionScreenParams, "Detail">
  productions?: Production[]
}> = ({ productions, navigation }) =>
  productions?.length ? (
    <ProductionList
      title="Similar"
      productions={productions}
      onPress={(id, production) =>
        navigation.push("Detail", { id, production })
      }
    />
  ) : null
