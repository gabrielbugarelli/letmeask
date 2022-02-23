import { createContext, useEffect, useState } from "react";
import { Router } from "./routes";
import { auth, firebase } from "./services/firebaseConnection";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

export const App = () => {
  const [ user, setUser ] = useState<UserType>();

  // Recupera estado de autenticação do usuário
  useEffect(() => {
    auth.onAuthStateChanged( user => {
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
      <Router />
    </AuthContext.Provider>
  );
}
