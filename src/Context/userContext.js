// Hooks
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// API
import axios from "../axios";

// exporting userContext
export const UserContext = createContext();

// local storage variable name
const userLocal = "IIITL_Placement_Portal_User";

export const CurrentUserProvider = (props) => {
  const navigate = useNavigate();
  // user state Context
  const [user, setUser] = useState(JSON.parse(localStorage.getItem(userLocal)));

  // Urls
  const profileURL = "";

  // On Website Load check for LoggedIn token expiry
  useEffect(() => {
    // getting count of Items
    const checkLoggedIn = () => {
      axios
        .get(profileURL)
        .then((response) => {
          // token valid
        })
        .catch((error) => {
          // token invalid
          setUser(null);
          localStorage.removeItem(userLocal);
          delete axios.defaults.headers.common["Authorization"];
          navigate("/Login");
        });
    };

    // if user is logged in then only check for token expiry
    if (user) {
      checkLoggedIn();
      localStorage.setItem(userLocal, JSON.stringify(user));
    }
  }, [user]);

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
