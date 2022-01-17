import { DefaultTheme } from "@react-navigation/native"
import tailwind from "tailwind-rn"

export const colors = { primary: "#dc2626" }

export const detailSpacing = tailwind("pt-4")

export const horizontalPadding = tailwind("px-4")

export const detailPosterHeight = 245

export const sectionImageHeight = Number(tailwind("h-36").height)

export const productionImageHeight = Number(tailwind("h-44").height)

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
}
