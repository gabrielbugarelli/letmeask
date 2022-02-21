import { createContext, useState } from "react";
import { Router } from "./routes";
import { auth, firebase } from "./services/firebaseConnection";

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: UserType | undefined;
  signWithGoogle: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

export const App = () => {

  const [ user, setUser ] = useState<UserType>();

  const signWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then( result => {
      if(result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        } as UserType)
      }
    })
  }

  return (
    <AuthContext.Provider value={ {user, signWithGoogle } }>
      <Router />
    </AuthContext.Provider>
  );
}
