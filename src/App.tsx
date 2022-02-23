import { AuthContextProvider } from "./contexts/AuthContextProvider";
import { Router } from "./routes";

export const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}
