import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Register />} />
          {/* {user ? <Home /> : <Register />} */}
        {/* </Route> */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        {/* {user ? <Navigate to="/" /> : <Login />}</Route> */}
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          {/* {user ? <Navigate to="/" /> : <Register />} */}
        {/* </Route> */}
        <Route path="/profile/:username" element={<Profile />} />
          {/* <Profile /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;