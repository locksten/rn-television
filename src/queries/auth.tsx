import { tmdb } from "@queries/tmdb"
import * as SecureStore from "expo-secure-store"
import { createContext, FC, useContext, useEffect, useState } from "react"

type NewAuthTokenResponse = Partial<{
  success: boolean
  expires_at: string
  request_token: string
}>

export const fetchNewRequestToken = async () => {
  const { request_token, success } = await tmdb
    .get(`authentication/token/new`)
    .json<NewAuthTokenResponse>()
  return success ? request_token : undefined
}

type NewSessionResponse = Partial<{
  success: boolean
  session_id: string
}>

export const fetchNewSessionToken = async (requestToken: string) => {
  const { success, session_id } = await tmdb
    .post(`authentication/session/new`, {
      json: { request_token: requestToken },
    })
    .json<NewSessionResponse>()
  return success ? session_id : undefined
}

export const fetchDeleteSession = async (sessionToken: string) =>
  await tmdb
    .delete(`authentication/session`, {
      json: { session_id: sessionToken },
    })
    .json()

export type Session = { token: string; id: number }

const sessionKey = "sessionKey"

const setStoredSession = (session: Session) =>
  SecureStore.setItemAsync(sessionKey, JSON.stringify(session))

const getStoredSession = async () => {
  const session = await SecureStore.getItemAsync(sessionKey)
  try {
    return session ? JSON.parse(session) : undefined
  } catch {
    return undefined
  }
}

const clearStoredSession = () => SecureStore.deleteItemAsync(sessionKey)

type AuthContextType = {
  isLoggedIn?: boolean
  logOut: () => void
  getSession: () => Session | undefined
  logIn: (session: Session) => Promise<void>
}

const AuthContext = createContext<AuthContextType>(
  undefined as unknown as AuthContextType,
)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const useAuthProvider = () => {
  const [isLoggedIn, setIsloggedIn] = useState<boolean | undefined>(undefined)
  const [cachedSession, setCachedSession] = useState<Session | undefined>(
    undefined,
  )

  useEffect(() => {
    getStoredSession().then((session) => {
      setIsloggedIn(!!session)
      setCachedSession(session)
    })
  }, [])

  const logOut = () => {
    cachedSession && fetchDeleteSession(cachedSession.token)
    clearStoredSession()
    setCachedSession(undefined)
    setIsloggedIn(false)
  }

  const getSession: AuthContextType["getSession"] = () => {
    return cachedSession
  }

  const logIn: AuthContextType["logIn"] = async (session: Session) => {
    await setStoredSession(session)
    setCachedSession(session)
    setIsloggedIn(true)
  }

  const AuthContextProvider: FC = ({ children }) => {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          logOut,
          getSession,
          logIn,
        }}
      >
        {children}
      </AuthContext.Provider>
    )
  }

  return {
    AuthContextProvider,
    isLoggedIn,
    logOut,
    getSession,
    logIn,
  }
}
