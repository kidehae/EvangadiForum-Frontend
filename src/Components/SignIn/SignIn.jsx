import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import styles from "./SignIn.module.css";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        setMessage("Login successful!");
        setFormData({ email: "", password: "" });

        navigate("/home"); //Redirect after login

      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      if (err.response?.data?.msg) setError(err.response.data.msg);
      else setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.formInput}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={styles.formInputInput}
          />
        </div>

        <div className={`${styles.formInput} ${styles.passwordInput}`}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className={styles.passwordInputInput}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          type="submit"
          className={styles.signinButton}
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? <span className={styles.spinner}></span> : "Sign In"}
        </button>

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}
        {message && <p className={styles.successMessage}>{message}</p>}
      </form>

      <p className={styles.signupLink}>
        Don't have an account?{" "}
        <Link to="/register" className={styles.signupLinkA}>
          Register here
        </Link>
      </p>
    </div>
  );
};


export default SignIn;
