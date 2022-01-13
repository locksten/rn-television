import { RootTabsNavigationProp } from "@components/RootTabNavigator"
import {
  fetchRateProduction,
  processRatingForApi,
  ProductionAccountStates,
} from "@queries/account"
import { Session, useAuth } from "@queries/auth"
import { ProductionType } from "@queries/production"
import { useNavigation } from "@react-navigation/native"
import React, { FC, useState, VFC } from "react"
import { Text, TextInput, View } from "react-native"
import * as Svg from "react-native-svg"
import { useMutation, useQueryClient } from "react-query"
import tailwind from "tailwind-rn"

export const AbsoluteCenter: FC = ({ children }) => (
  <View style={tailwind("absolute h-full w-full justify-center items-center")}>
    {children}
  </View>
)

export const RatingRing: VFC<{
  numberOfRatings?: number
  percentage?: number
  myPercentage?: number
  productionType: ProductionType
  id: number
}> = ({ percentage = 0, myPercentage, productionType, id }) => {
  const size = 70
  const outerStrokeWidth = size / 7
  const center = size / 2
  const radius = size / 2 - outerStrokeWidth / 2
  const circumference = 2 * Math.PI * radius

  const session = useAuth().getSession()
  const navigation = useNavigation<RootTabsNavigationProp>()
  const queryClient = useQueryClient()

  const { isLoading, mutate } = useMutation(
    ({ session, rating }: { session: Session; rating: number }) => {
      return fetchRateProduction(session, productionType, id, rating)
    },
  )

  const [inputValue, setInputValue] = useState<number | undefined>(
    myPercentage ? myPercentage * 100 : undefined,
  )
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isEditingStart, setIsEditingStart] = useState<boolean>(false)

  const onChangeText = (text: string) =>
    /^\d?\d?$|^100$/.test(text) &&
    setInputValue(text === "" ? undefined : Number(text))

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          opacity: isLoading ? 0.6 : 1,
        },
      ]}
    >
      <Svg.Svg height="100%" width="100%" viewBox={`0 0 ${size} ${size}`}>
        <Svg.Circle
          stroke="#E5E7EB"
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={outerStrokeWidth}
          strokeDasharray={[circumference, 999999]}
          transform={{ origin: [center, center], rotation: -90 }}
        />
        {percentage !== 0 && (
          <Svg.Circle
            stroke="black"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={outerStrokeWidth}
            strokeDasharray={[percentage * circumference, 999999]}
            transform={{ origin: [center, center], rotation: -90 }}
          />
        )}
        {(isEditing || (myPercentage && myPercentage)) !== 0 && (
          <Svg.Circle
            stroke="#DC2626"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={outerStrokeWidth / 3}
            strokeDasharray={[
              (isEditing || isLoading
                ? (inputValue ?? 0) / 100
                : myPercentage ?? 0) * circumference,
              999999,
            ]}
            transform={{ origin: [center, center], rotation: -90 }}
          />
        )}
      </Svg.Svg>
      <AbsoluteCenter>
        <Text
          style={tailwind(
            `font-bold text-2xl ${
              isEditing || isLoading ? "text-red-600" : "text-black"
            }`,
          )}
        >
          {isEditing || isLoading
            ? inputValue && Math.round(inputValue)
            : Math.round(percentage * 100)}
        </Text>
      </AbsoluteCenter>
      <AbsoluteCenter>
        <TextInput
          style={{ width: size, height: size, opacity: 0 }}
          onChangeText={onChangeText}
          value={inputValue?.toString()}
          onSubmitEditing={async () => {
            if (!session) {
              navigation.navigate("Account", {
                screen: "Login",
              })
              return
            }

            const accountStatesKey = [productionType, id, "accountStates"]
            inputValue !== undefined &&
              mutate(
                { session, rating: inputValue },
                {
                  onSuccess: () => {
                    const update: ProductionAccountStates = {
                      rated:
                        inputValue === 0
                          ? undefined
                          : { value: processRatingForApi(inputValue) },
                      ...(inputValue === 0 ? undefined : { watchlist: false }),
                    }
                    queryClient.setQueryData(accountStatesKey, {
                      ...queryClient.getQueryData(accountStatesKey),
                      ...update,
                    })
                  },
                },
              )
          }}
          onKeyPress={(e) => {
            if (isEditingStart) {
              setInputValue(undefined)
              setIsEditingStart(false)
              onChangeText(e.nativeEvent.key)
            }
          }}
          onFocus={() => {
            setIsEditing(true)
            setIsEditingStart(true)
            setInputValue(myPercentage ? myPercentage * 100 : undefined)
          }}
          onBlur={() => {
            setIsEditing(false)
          }}
          keyboardType="numeric"
          returnKeyType="done"
          contextMenuHidden={true}
        ></TextInput>
      </AbsoluteCenter>
    </View>
  )
}
