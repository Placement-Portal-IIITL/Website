// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Home from "../Home/Home";
import Login from "../Auth/Login/Login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
