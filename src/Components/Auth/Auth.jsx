import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../../Utility/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null, //user: { username, userid } returned from /users/check
  });

  //  A way to convert the token value into a true or false boolean
  const isAuthenticated = !!auth.token;

  // Check auth status on load
  useEffect(() => {
    const checkAuth = async () => {
      // checks if a token exists in localStorage
      let token = localStorage.getItem("authToken");

      if (!token) {
        // avoids making a /users/check call when we already know there’s no token
        localStorage.setItem("authToken", "");
        return;
      }

      try {
        // This tells your backend:"Here’s my token. Is it valid?"
        const res = await axiosInstance.get("api/users/check", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // res.data returns something like { msg: "valid user", username: "Meti123", userid: 42 }

        if (res.data) {
          setAuth({ token, user: res.data }); //user becomes { username, userid } (from backend)
        }
      } catch (err) {
        // it’s just a warning not an actual app-breaking error.
        console.warn("Auth check failed:", err.response?.data || err.message);
        localStorage.setItem("authToken", "");
        setAuth({ token: null, user: null }); //Cleans up:Clears auth state from memory and logs the user out on the frontend
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("api/users/login", { email, password });
      const token = res.data.token;

      if (!token) throw new Error("No token received");

      localStorage.setItem("authToken", token);

      const userRes = await axiosInstance.get("api/users/check", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAuth({ token, user: userRes.data }); //user: { username, userid } returned from /users/check
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Login failed",
      };
    }
  };

  // Register
  const register = async (username, firstname, lastname, email, password) => {
    try {
      await axiosInstance.post("api/users/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      // Auto-login after registration
      // (returns the final resolved value instead of a pending Promise and error inside login() caught by register's catch)
      return await login(email, password);
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.msg || "Registration failed",
      };
    }
  };

  // Logout (Clears the token and user from localStorage and state)
  const logout = () => {
    localStorage.setItem("authToken", "");
    setAuth({ token: null, user: null });
  };

  return (
    // Makes all auth data available to components inside your app
    <AuthContext.Provider
      value={{
        token: auth.token,
        user: auth.user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// You can access like this: 
// const { user, login, logout, isAuthenticated } = useContext(AuthContext);

