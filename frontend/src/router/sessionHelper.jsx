import jwt_decode from "jwt-decode";

class sessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUserDetail(userDetail) {
    localStorage.setItem("userDetail", JSON.stringify(userDetail));
  }

  getUserDetail() {
    return JSON.parse(localStorage.getItem("userDetail"));
  }
  setEmail(Email) {
    localStorage.setItem("Email", Email);
  }
  getEmail() {
    return localStorage.getItem("Email");
  }

  setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  getOTP() {
    return localStorage.getItem("OTP");
  }

  removeSessions() {
    localStorage.clear();
    window.location.href = "/";
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        // Check if the token has expired
        if (decoded.exp < currentTime) {
          return false;
        }

        // Token is valid and not expired
        return true;
      } catch (error) {
        console.error("Error decoding JWT token:", error);
        return false;
      }
    }

    // If token is not present, user is not authenticated
    return false;
  }
}
export const {
  setToken,
  getToken,
  setUserDetail,
  getUserDetail,
  removeSessions,
  setEmail,
  getEmail,
  setOTP,
  getOTP,
  isAuthenticated,
} = new sessionHelper();
