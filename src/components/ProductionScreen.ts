import { Production } from "@queries/Production"

export type ProductionScreenParams<T = Production> = {
  Home: undefined
  Detail: { id: number; production?: T }
}
