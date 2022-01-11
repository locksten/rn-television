import { Production } from "@queries/production"

export type ProductionScreenParams<T = Production> = {
  Home: undefined
  Detail: { id: number; production?: T }
}
