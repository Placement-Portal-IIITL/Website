import axios from "axios";

// browser local storage
const userLocal = "IIITL_Placement_Portal_User";

// axios header instance
const instance = axios.create({
  baseURL: "https://placements-iiitl.herokuapp.com",
  withCredentials: true,
});

// is user is logged in take the auth token from local
const auth = JSON.parse(localStorage.getItem(userLocal));

if (auth?.authHeader) {
  instance.defaults.headers.common["Authorization"] = auth.authHeader;
}

export default instance;
