import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext<AuthContextType | null>(null)
export type AuthContextType = {
    session: any | null;
    signUpNewUser: (email: string, password: string) => Promise<{success: boolean, data: any}>;
    signInUser: (email: string, password: string) => Promise<{success: boolean, data?: any, error?: string}>;
    signOut: () => void;
}

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [session, setSession] = useState<any | null>(null);


    const signUpNewUser = async ( email: string, password: string ) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) { console.error("Error at signing up"); return {success: false, data} }

        console.log("Sign Up success!")
        return {success: true, data}
    };

    const signInUser = async ( email: string, password: string ) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) { console.error("Error at signing in"); return {success: false, error: error.message} }
            
            console.log("Sign In success!")
            return {success: true, data}

        } catch {
            console.error("There was an error")
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: {session} }) => {
            setSession(session)
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            console.log("Auth state changed:", _event, session)
            setSession(session)
        })
    }, [])


    const signOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) { console.error(`There was an error: ${error}`) }
    }

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}