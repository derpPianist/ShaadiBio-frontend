"use client";

import { createContext, useEffect, useState, useContext } from "react";

// type definition for the context
/**
 * accessToken -> could be string or null,
 * setAccessToken function -> takes a token as arg (our accessToken in this case) and void return
 * refreshAccessToken function -> no args but returns accessToken of type string/void
 * logout function -> void return
 */

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type AuthContextType = {
  accessToken: string | null;
  authenticated: Boolean;
  loading: Boolean;
  setAccessToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<string | null>;
  logout: () => Promise<any>
};

// `null` in the create context argument is the default state to be used if no provider is found

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  // State to store the access token
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // State to check if the credentials are available. It pauses rendering until credentials are loaded
  const [loading, setLoading] = useState<Boolean>(true);

  // State to confirm authentication status (to be used for dynamically rendering pages)
  const [authenticated, setAuthenticated] = useState<Boolean>(false);

  // refresh access token triggered when a page refresh happens
  const refreshAccessToken = async () => {

    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/refreshToken", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        setAccessToken(null)
        setAuthenticated(false)
        return null
      }

      const data = await res.json();

      setAccessToken(data.accessToken);
      setAuthenticated(true)

      return data.accessToken;

    } catch (err) {
      console.error("Error in refreshToken context: ", err);
      setAccessToken(null);
      setAuthenticated(false)
      return null
    } finally {
      setLoading(false);
    }
  };

  // logout to clear access token when user wants to logout. Cookie removal is handled from backend
  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers : {
          "Authorization" : `Bearer ${accessToken}`
        }, 
      })

      const data = await res.json()

      const message = data.message

      console.log("Data in authContext logout: ", message)

      setAccessToken(null)

      return data

    } catch (error) {
      
      console.error("Error while logout (frontend): ", error)
      setAccessToken(null)
    }finally{
      setLoading(false)
      setAuthenticated(false)
    }
  }

  const checkTokenAndFetch = async(url: string, method: HttpMethod = 'GET', body?: unknown) => {

  }

  // Triggers the request for a new access token on page refresh
  useEffect(()=>{
    console.log("Calling refreshAccessToken");
    refreshAccessToken()
  }, [])

  //Creating the provider which creates the context for our auth
  //Page will not render until the credentials are loaded
  return(
    <AuthContext.Provider value={{accessToken, setAccessToken, refreshAccessToken, logout, authenticated, loading}}>
        {!loading && children}
    </AuthContext.Provider>
  )
};

//Custom hook to mainntain correct usage of context and unify all logic + imports
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used inside the useProvider");
    return ctx;
}