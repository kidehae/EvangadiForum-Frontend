import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../SignIn/SignIn.module.css"; 
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignIn = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const passwordchange = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:2112/api/users/login", { // Ensure this URL matches your backend
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });

            const loginRes = await response.json(); // Parse the JSON response

            if (!response.ok) {
                // If the response status is not 2xx, throw an error
                throw new Error(loginRes.msg || "Login failed");
            }

            console.log(loginRes.token); // Still log the token for debugging

            localStorage.setItem("authtoken", loginRes.token);
            navigate("/"); // Still navigate on successful login
        } catch (error) {
            console.error("Login error:", error.message); // Log the error message
            console.log("An unexpected error occurred during login. Please try again.");
        }
    };

    useEffect(() => {
        // This useEffect is now empty as there's no context for user data
        // and no direct localStorage check for redirection.
        // You can add logic here if you want to check localStorage for a token
        // and redirect, or leave it to other parts of the app.
    }, [navigate]);

    return (
        <>
            <section
                // Removed backgroundImage style
                style={{
                    // backgroundImage: `url(${bg})`, // Removed this line
                    backgroundColor: "#f0f2f5", // Added a light background color for visibility
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    paddingTop: "180px",
                    paddingBottom: "100px",
                    minHeight: "100vh", // Ensure it takes full viewport height
                    display: "flex", // Use flex for centering
                    alignItems: "center", // Center vertically
                    justifyContent: "center", // Center horizontally
                }}
            >
                <Container>
                    <Row className="justify-content-center"> {/* Centering the row */}
                        <Col sm={12} md={5}>
                            <div className={styles.login_container + " shadow px-5"}>
                                <div className=" text-center px-md- px-sm-3 mx-md-3 mb-4">
                                    <h5>Login to your account</h5>
                                    <p>
                                        Don't have an account?
                                        <Link
                                            className={styles.create_new_acc}
                                            to="/signup"
                                            onClick={() => {}}
                                        >
                                            {" "}
                                            Create a new account
                                        </Link>
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        placeholder="email "
                                        onChange={handleChange}
                                    />{" "}
                                    <br />
                                    <span>
                                        {" "}
                                        <input
                                            type={passwordVisible ? "text" : "password"}
                                            className="p-2 mt-1 form-control"
                                            name="password"
                                            placeholder="Password"
                                            onChange={handleChange}
                                        />{" "}
                                        <i
                                            onClick={passwordchange}
                                            style={{
                                                position: "relative",
                                                top: "-35px",
                                                left: "85%",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {passwordVisible ? (
                                                <VisibilityIcon />
                                            ) : (
                                                <VisibilityOffIcon />
                                            )}
                                        </i>
                                    </span>
                                    <Link className={styles.create_new_acc + " text-end pt-3"} to="#">
                                        Forgot password?
                                    </Link>
                                    <Button type="submit" className=" mt-4 signIn">
                                        Login
                                    </Button>
                                </form>
                            </div>
                        </Col>

                        {/* This column seems to be purely for the "About Evangadi Networks" text
                        and might be part of the general layout rather than strictly login-specific.
                           Keeping it for now as it was in your original code. */}
                        <Col sm={12} md={6}>
                            <div className="pt-5 px-4">
                                <small style={{ color: "#f6912b" }}>About</small>
                                <h1 className="mb-4">Evangadi Networks</h1>
                                <div style={{ lineHeight: "30px" }}>
                                    No matter what stage of life you are in, whether you’re just
                                    starting elementary school or being promoted to CEO of a
                                    Fortune 500 company, you have much to offer to those who are
                                    trying to follow in your footsteps.
                                    <br />
                                    <br />
                                    Whether you are willing to share your knowledge or you are
                                    just looking to meet mentors of your own, please start by
                                    joining the network here.
                                </div>
                                <Button
                                    style={{
                                        backgroundColor: "#f6912b",
                                        border: "none",
                                    }}
                                >
                                    HOW IT WORKS
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default SignIn;
