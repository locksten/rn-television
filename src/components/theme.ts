import { DefaultTheme } from "@react-navigation/native"

export const colors = { primary: "#dc2626" }

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
}
