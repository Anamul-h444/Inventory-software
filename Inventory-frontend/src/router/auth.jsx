import jwt_decode from "jwt-decode";

//Set token in local storage
export const authenticate = (token, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(token));
  }
  cb();
};

//For check authenticate user
export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("jwt")) {
    //console.log(jwt_decode(JSON.parse(localStorage.getItem("jwt")))); //Check decoded token data
    const { exp } = jwt_decode(JSON.parse(localStorage.getItem("jwt"))); //expiration date gate by destructuring
    if (new Date().getTime() <= exp * 1000) {
      return true;
    } else {
      localStorage.removeItem("jwt");
      return false;
    }
  } else return false;
};

//Get user Info
export const userInfo = () => {
  let jwt = JSON.parse(localStorage.getItem("jwt"));
  const decoded = jwt_decode(jwt);
  return { ...decoded, token: jwt };
};

// Log out
export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
  }
};
