import { useRef } from "react";
import styles from "./Register.module.css";
import axios from "../../axiosConfig";

const Register = () => {
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(userNameDom.current.value);
    // console.log(firstNameDom.current.value);
    // console.log(lastNameDom.current.value);
    // console.log(emailDom.current.value);
    // console.log(passwordDom.current.value);
   
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.signupContainer}>
        <h2>Join the network</h2>
        <p>
          Already have an account? <a href="#">Sign in</a>
        </p>
        <form onSubmit={handleSubmit} className={styles.signupForm}>
          <input
            ref={userNameDom}
            type="text"
            placeholder="Username"
            required
          />
          <div className={styles.nameFields}>
            <input ref={firstNameDom} type="text" placeholder="First name" required />
            <input ref={lastNameDom} type="text" placeholder="Last name" required />
          </div>
          <input ref={emailDom} type="email" placeholder="Email address" required />
          <input ref={passwordDom} type="password" placeholder="Password" required />
          <p className={styles.policyText}>
            I agree to the <a href="#">privacy policy</a> and{" "}
            <a href="#">terms of service</a>.
          </p>
          <button type="submit">Agree and Join</button>
        </form>
        <p className={styles.footerLink}>Already have an account?</p>
      </div>
    </div>
  );
};

export default Register;
