import { Ring } from "@components/Ring"
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

export const RatingRing: VFC<{
  productionType: ProductionType
  id: number
  percentage?: number
  myPercentage?: number
  /** @param size Not specifying a static size may cause a noticable delay before rendering */
  size?: number
}> = ({ percentage, myPercentage, productionType, id, size: staticSize }) => {
  const [size, setSize] = useState<number | undefined>(staticSize)
  const {
    RatingInput,
    ratingInputProps,
    inputValue,
    isLoading,
    isInputActive,
  } = useRatingInput({
    id,
    productionType,
    initialValue: myPercentage ? myPercentage * 100 : undefined,
  })

  return (
    <View
      style={[
        {
          opacity: isLoading ? 0.6 : 1,
        },
        tailwind("flex-1 w-full h-full"),
      ]}
      onLayout={({
        nativeEvent: {
          layout: { width, height },
        },
      }) => !staticSize && setSize(Math.min(width, height))}
    >
      {!!size && (
        <View style={{ height: size, width: size }}>
          <Rings
            percentage={percentage}
            myPercentage={
              isInputActive ? (inputValue ?? 0) / 100 : myPercentage
            }
          />
          <AbsoluteCenter size={size}>
            <RingText
              displayMyValue={isInputActive}
              myValue={inputValue}
              percentage={percentage}
            />
          </AbsoluteCenter>
          <AbsoluteCenter size={size}>
            <RatingInput {...ratingInputProps} />
          </AbsoluteCenter>
        </View>
      )}
    </View>
  )
}

const useRatingInput = ({
  initialValue,
  productionType,
  id,
}: {
  productionType: ProductionType
  id: number
  initialValue?: number
}) => {
  const session = useAuth().getSession()
  const navigation = useNavigation<RootTabsNavigationProp>()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [value, setValue] = useState<number | undefined>(initialValue)

  const { isLoading, mutate } = useMutation(
    ({ session, rating }: { session: Session; rating: number }) => {
      return fetchRateProduction(session, productionType, id, rating)
    },
  )

  const onDone = async () => {
    if (!session) {
      navigation.navigate("Account", {
        screen: "Login",
      })
      return
    }
    const accountStatesKey = [productionType, id, "accountStates"]
    const rating = value ?? 0
    mutate(
      { session, rating },
      {
        onSuccess: () => {
          const update: ProductionAccountStates = {
            rated:
              rating === 0 ? undefined : { value: processRatingForApi(rating) },
            ...(rating === 0 ? undefined : { watchlist: false }),
          }
          queryClient.setQueryData(accountStatesKey, {
            ...queryClient.getQueryData(accountStatesKey),
            ...update,
          })
        },
      },
    )
  }

  const ratingInputProps: Parameters<typeof RatingInput>[0] = {
    value,
    initialValue,
    onDone,
    setIsEditing,
    onValueChange: setValue,
  }

  return {
    RatingInput,
    ratingInputProps,
    inputValue: value,
    isLoading,
    isInputActive: isEditing || isLoading,
  }
}

const RatingInput: FC<{
  value?: number
  initialValue?: number
  onDone: () => void
  setIsEditing: (state: boolean) => void
  onValueChange: (value?: number) => void
}> = ({ value, initialValue, onValueChange, onDone, setIsEditing }) => {
  const [isBeforeFirstKeypress, setIsBeforeFirstKeypress] =
    useState<boolean>(false)
  const onChangeText = (text: string) =>
    /^\d?\d?$|^100$/.test(text) &&
    onValueChange(text === "" ? undefined : Number(text))
  return (
    <TextInput
      style={[tailwind("h-full w-full opacity-0")]}
      onChangeText={onChangeText}
      value={value?.toString()}
      onSubmitEditing={() => onDone()}
      onKeyPress={(e) => {
        if (isBeforeFirstKeypress) {
          onValueChange(undefined)
          setIsBeforeFirstKeypress(false)
          onChangeText(e.nativeEvent.key)
        }
      }}
      onFocus={() => {
        setIsEditing(true)
        setIsBeforeFirstKeypress(true)
        onValueChange(initialValue)
      }}
      onBlur={() => {
        setIsEditing(false)
      }}
      keyboardType="numeric"
      returnKeyType="done"
      contextMenuHidden={true}
    />
  )
}

const RingText: VFC<{
  displayMyValue: boolean
  myValue?: number
  percentage?: number
}> = ({ displayMyValue, myValue = 0, percentage = 0 }) => {
  const value = displayMyValue ? myValue : Math.round(percentage * 100)
  return (
    <View
      style={[
        { height: value === 100 ? "35%" : "45%" },
        tailwind("justify-center"),
      ]}
    >
      <Text
        style={[
          tailwind(
            `font-bold ${displayMyValue ? "text-red-600" : "text-black"}`,
          ),
          {
            fontSize: 300,
            includeFontPadding: false,
          },
        ]}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
    </View>
  )
}

const Rings: VFC<{
  percentage?: number
  myPercentage?: number
}> = ({ percentage, myPercentage }) => {
  const size = 100
  const strokeWidth = size / 7
  const radius = size / 2
  const base = {
    strokeWidth,
    center: size / 2,
    radius: radius - strokeWidth / 2,
  }
  return (
    <Svg.Svg height="100%" width="100%" viewBox={`0 0 ${size} ${size}`}>
      <Ring {...base} percentage={1} color="#E5E7EB" />
      {!!percentage && <Ring {...base} percentage={percentage} color="black" />}
      {!!myPercentage && (
        <Ring
          {...base}
          percentage={myPercentage}
          color="#DC2626"
          radius={radius - strokeWidth - strokeWidth / 4 + 0.5}
          strokeWidth={strokeWidth / 2}
        />
      )}
    </Svg.Svg>
  )
}

export const AbsoluteCenter: FC<{ size?: number }> = ({ size, children }) => (
  <View
    style={[
      { width: size, height: size },
      tailwind("absolute justify-center items-center"),
    ]}
  >
    {children}
  </View>
)
