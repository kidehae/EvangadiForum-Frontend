import { createContext, useState, useContext, useEffect } from "react";
import { axiosInstance } from "../../Utility/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null, //user: { username, userid } returned from /users/check
  });

  //  A way to convert the token value into a true or false boolean
  const isAuthenticated = !!auth.token;

  const [loading, setLoading] = useState(true);
  // Check auth status on load
  useEffect(() => {
    const checkAuth = async () => {
      let token = localStorage.getItem("authToken");

      if (!token) {
        localStorage.setItem("authToken", "");
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get("api/users/check", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(res)

        if (res.data) {
          setAuth({ token, user: res.data });
        }
      } catch (err) {
        console.warn("Auth check failed:", err.response?.data || err.message);
        localStorage.setItem("authToken", "");
        setAuth({ token: null, user: null });
      }

      setLoading(false);
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

      setAuth({ token, user: userRes.data }); //user: { msg, username, userid } returned from /users/check
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
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// You can access like this: 
// const { user, login, logout, isAuthenticated } = useContext(AuthContext);

