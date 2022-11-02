// Routing
import { Routes, Route } from "react-router-dom";

// Components
import NavBar from "../Navigation/NavBar/NavBar";
import Home from "../Home/Home";
import Login from "../Auth/Login/Login";
import Recovery from "../Auth/Recovery/Recovery";
import Signup from "../Auth/Signup/Signup";
import Profile from "../Profile/Profile";
import Register from "../Profile/Register/RegisterStudent";
import TPO from "../TPO/TpoDashboard";
const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Recovery">
          <Route path=":email" element={<Recovery />} />
          <Route path="" element={<Recovery />} />
        </Route>
        <Route path="/Signup">
          <Route path="" element={<Signup />} />
          <Route path=":verifyEmail" element={<Signup />} />
        </Route>
        <Route path="/Profile">
          <Route path="" element={<Profile />} />
          <Route path=":subprofile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/tpo" element={<TPO />} />
      </Routes>
    </div>
  );
};

export default App;
