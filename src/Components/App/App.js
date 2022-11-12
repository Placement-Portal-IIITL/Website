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
import Team from "../Team/Team";
import TPO from "../TPO/TpoDashboard";
import Contact from "../Contact/Contact";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* Auth Routes starts */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Recovery">
          <Route path=":email" element={<Recovery />} />
          <Route path="" element={<Recovery />} />
        </Route>
        <Route path="/Signup">
          <Route path="" element={<Signup />} />
          <Route path=":verifyEmail" element={<Signup />} />
        </Route>
        {/* Student Register */}
        <Route path="/register" element={<Register />} />
        {/* Student Profile Starts */}
        <Route path="/Profile">
          <Route path="" element={<Profile />} />
          <Route path=":subprofile" element={<Profile />} />
        </Route>
        {/* Teams Workspace */}
        <Route path="/team">
          <Route path="" element={<Team />} />
          <Route path=":panel">
            <Route path="" element={<Team />} />
            <Route path=":subpanel">
              <Route path="" element={<Team />} />
              <Route path=":value" element={<Team />} />
            </Route>
          </Route>
        </Route>
        {/* TPO Portal */}
        <Route path="/tpo" element={<TPO />} />
        <Route path="/contact">
          <Route path="" element={<Contact />} />
          <Route path=":panel" element={<Contact />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
