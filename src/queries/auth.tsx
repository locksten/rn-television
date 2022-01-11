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

const sessionTokenKey = "session_token"

const setStoredSessionToken = (token: string) =>
  SecureStore.setItemAsync(sessionTokenKey, token)

const getStoredSessionToken = () => SecureStore.getItemAsync(sessionTokenKey)

const clearStoredSessionToken = () =>
  SecureStore.deleteItemAsync(sessionTokenKey)

type AuthContextType = {
  isLoggedIn: boolean
  logOut: () => void
  getSessionToken: (options?: { orLogOut?: boolean }) => string | undefined
  setSessionToken: (token: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>(
  undefined as unknown as AuthContextType,
)

export const useAuth = () => {
  return useContext(AuthContext)
}

export const useAuthProvider = () => {
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [cachedSessionToken, setCachedSessionToken] = useState<
    string | undefined
  >(undefined)

  useEffect(() => {
    getStoredSessionToken().then((token) => {
      setIsloggedIn(!!token)
      setCachedSessionToken(token ?? undefined)
    })
  }, [])

  const logOut = () => {
    cachedSessionToken && fetchDeleteSession(cachedSessionToken)
    clearStoredSessionToken()
    setCachedSessionToken(undefined)
    setIsloggedIn(false)
  }

  const getSessionToken: AuthContextType["getSessionToken"] = (options) => {
    if (options?.orLogOut && !cachedSessionToken) logOut()
    return cachedSessionToken
  }

  const setSessionToken = async (token: string) => {
    await setStoredSessionToken(token)
    setCachedSessionToken(token)
    setIsloggedIn(true)
  }

  const AuthContextProvider: FC = ({ children }) => {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn,
          logOut,
          getSessionToken,
          setSessionToken,
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
    getSessionToken,
    setSessionToken,
  }
}
