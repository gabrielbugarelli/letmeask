import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Components
import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
      </Routes>
    </BrowserRouter>
  )
}
