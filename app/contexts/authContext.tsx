"use client"
import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState, createContext, useContext } from "react";
import { createClient } from "@/utils/supabase/client";
/**
 *  Authentication Context 
 */

interface AuthContextTypes {
  session: Session | null;
  login: (({email, password}: {email: string, password: string}) => Promise<void>) | (() => void);
  logout: () => (Promise<void> | void);
  // authReady: boolean;
}



const AuthContext = createContext<AuthContextTypes>({
  session: null,
  login: () => {},
  logout: () => {},
  // authReady: false
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  const loginUser = async ({email, password}: {email: string, password: string}) => {
    const supaClient = createClient();
    const { error } = await supaClient.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.log(error);
      return;
    }
  
    const sessionInfo = await supaClient.auth.getSession();
  
    if (sessionInfo.error) {
      console.log(sessionInfo.error);
      return;
    }
  
    const session = sessionInfo.data.session;
    setSession(session);
  }

  const logoutUser = async () => {
    const supaClient = createClient();
    await supaClient.auth.signOut();
    setSession(null);
  }

  const getUserSession = async () => {
    const supaClient = createClient();
    const {data, error} = await supaClient.auth.getSession();
    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setSession(data.session);
    }
  }

  useEffect(() => {
    getUserSession();
  })

  return (
    <AuthContext.Provider value={{session: session, login: loginUser, logout: logoutUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;