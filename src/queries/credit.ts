export type CastMember = Partial<{
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}>

export type CrewMember = Partial<{
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}>

export type Credit = CastMember | CrewMember

export type CreditType = "cast" | "crew"

export type Credits = Partial<{
  cast: CastMember[]
  crew: CrewMember[]
  id: number
}>
