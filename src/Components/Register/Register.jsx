
import  { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Register.module.css";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
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

    const result = await register(
      formData.username,
      formData.firstname,
      formData.lastname,
      formData.email,
      formData.password
    );

    if (result.success) {
      setMessage("Registration successful! Redirecting...");
      setFormData({
        email: "",
        username: "",
        password: "",
        firstname: "",
        lastname: "",
      });
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerTitle}>Join the Network</h2>
      <p>
        Already have an account? <Link to="/signIn">Sign In</Link>
      </p>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <div className={styles.formInput}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.fullName}>
          <div className={styles.formInput}>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formInput}>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.formInput}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
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
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <button
          type="submit"
          className={styles.registerButton}
          disabled={loading}
        >
          {loading ? <span className={styles.spinner}></span> : "Register"}
        </button>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {message && <p className={styles.successMessage}>{message}</p>}
      </form>

      <p className={styles.termsPrivacyLinks}>
        I agree with{" "}
        <a href="https://www.evangadi.com/legal/privacy/">privacy policies</a>{" "}
        and <a href="https://evangadi.com/legal/terms">terms of service</a>
      </p>
      <p>
        <Link to="/signIn">Already have an account?</Link>
      </p>

    </div>
  );
};

export default Register;
