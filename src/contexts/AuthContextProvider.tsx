import { ReactElement, createContext, useEffect, useState } from "react";
import { firebase, auth } from "../services/firebaseConnection";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signWithGoogle: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactElement
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ( {children}: AuthContextProviderProps ) => {
  const [ user, setUser ] = useState<UserType>();

  // Recupera estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if( user ) {
        const { uid, displayName, photoURL } = user;
        
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        } as UserType);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  const signWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider);

      if(result.user) {
        const { uid, displayName, photoURL } = result.user;
        
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        } as UserType);
      }
  }

  return ( 
    <AuthContext.Provider value={ { user, signWithGoogle } }>
      {children}
    </AuthContext.Provider>
  )
}
