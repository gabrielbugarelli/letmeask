import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Components
import { Home } from "../pages/Home";
import { NewRoom } from "../pages/NewRoom";
import { Room } from "../pages/Room";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
        <Route path="rooms/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
  )
}
