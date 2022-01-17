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

export type GuestStar = Partial<{
  character_name: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}>

export type Credit = CastMember | CrewMember | GuestStar

export type CreditType = "cast" | "crew" | "guestStar"

export type Credits = Partial<{
  cast: CastMember[]
  crew: CrewMember[]
  guest_stars: GuestStar[]
  id: number
}>

export const combineSameCrewMembers = (crew: CrewMember[]) => {
  return crew.reduce((acc, credit) => {
    const existing = acc.find(({ id }) => id === credit.id)
    const job = credit.job
    if (existing) {
      job &&
        !existing.job?.includes(job) &&
        (existing.job += job ? `, ${job}` : `${job}`)
    } else {
      acc.push(credit)
    }
    return acc
  }, [] as CrewMember[])
}
