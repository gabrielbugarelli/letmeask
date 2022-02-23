import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";

export const useAuth = () => {
  const value = useContext(AuthContext);

  return value;
}
