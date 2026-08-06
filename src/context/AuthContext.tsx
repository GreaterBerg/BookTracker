import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null)

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [session, setSession] = useState(undefined);


    const signUpNewUser = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) { return {success: false, data} }
        return {success: true, data}
    };

    const signInUser = async ({ email, password }) => {
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
            setSession(session)
        })
    }, [])


    const signOut = () => {
        const { error } = supabase.auth.signOut();

        if (error) { console.error(`There was an error: ${error}`) }
    }

    return (
        <AuthContext.Provider value={{session, signUpNewUser, signInUser, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}