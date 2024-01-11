import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../hooks/supabase"

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [session, setSession] = useState()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      let gotSession = localStorage.getItem("authSession")
      if (gotSession) {
        console.log("Retrieved: ", gotSession)
        setSession(JSON.parse(gotSession))
        setUser(JSON.parse(gotSession))
      }
      async function getSession() {
        setLoading(false)
        const { subscription } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session) {
              console.log("New session: ", session)
              setUser(session.user)
              localStorage.setItem("authSession", JSON.stringify(session))
              setSession(session)
            } else {
              localStorage.removeItem("authSession")
              setSession(null)
              setUser(null)
            }
            setLoading(false)
          }
        )
        return () => {
          subscription?.unsubscribe()
        }
      }
      getSession()
    }, [])
  
    const value = {user}
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }