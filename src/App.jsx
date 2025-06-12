import React from "react";
import { Link, useNavigate, Routes, Route } from "react-router-dom"; // Import Routes and Route
import { Container, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import Login from "./Components/SignIn/SignIn"; // Import the user's Login component
import styles from "./Components/SignIn/Login.module.css"; // Reuse the same CSS module for layout

const App = () => {
    const navigate = useNavigate();

    // Function to handle signup navigation, passed as prop to Login component
    const handleSignUpClick = () => {
        navigate("/register"); // Or "/signup" depending on your actual signup route
    };

    // This component renders the full login page layout
    const LoginPageContent = () => (
        <>
            <ToastContainer />
            {/* Header section with only the logo */}
            <header className={styles.header_container}>
                <div className={styles.header_logo}>EVANGADI</div>
            </header>

            {/* Main content section with background image and two columns */}
            <section className={styles.main_section}>
                <Container className="h-100">
                    <Row className="justify-content-center align-items-stretch g-0 h-100">
                        {/* Left Column for Login Form (renders the user's Login component) */}
                        <Col sm={12} md={5} className="p-0">
                            {/* Render the Login component provided by the user, passing the signup handler */}
                            <Login userSignUp={handleSignUpClick} />
                        </Col>

                        {/* Right Column for "5 Stage Unique Learning Method" */}
                        <Col sm={12} md={7} className="p-0">
                            <div className={`${styles.about_col_content} text-center text-white`}>
                                <div className={`${styles.learning_method_section}`}>
                                    <div className={styles.stars_display}>⭐⭐⭐⭐⭐</div>
                                    <h3 className={styles.learning_method_title}>5 Stage Unique Learning Method</h3>
                                    <p className={styles.users_count}>Join 40,000 + users</p>
                                    <div className={styles.avatars_container}>
                                        <img src="https://placehold.co/40x40/FF5733/FFFFFF?text=U1" alt="User Avatar" className={styles.avatar_image} />
                                        <img src="https://https://placehold.co/40x40/33FF57/FFFFFF?text=U2" alt="User Avatar" className={styles.avatar_image} />
                                        <img src="https://placehold.co/40x40/3357FF/FFFFFF?text=U3" alt="User Avatar" className={styles.avatar_image} />
                                        <img src="https://placehold.co/40x40/FF33DA/FFFFFF?text=U4" alt="User Avatar" className={styles.avatar_image} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer */}
            <footer className={styles.footer_container}>
                <div className={styles.footer_logo}>EVANGADI</div>
                {/* Footer links with pipe separators */}
                <div className={styles.footer_links_container}>
                    <Link className={styles.footer_link} to="/about">About Us</Link>
                    <span>|</span>
                    <Link className={styles.footer_link} to="/contact">Contact</Link>
                    <span>|</span>
                    <Link className={styles.footer_link} to="/privacy">Privacy Policy</Link>
                    <span>|</span>
                    <Link className={styles.footer_link} to="/terms">Terms of Services</Link>
                </div>
                {/* Social media icons */}
                <div className={styles.social_icons_container}>
                    <a href="#" className={styles.social_icon}>f</a> {/* Facebook */}
                    <a href="#" className={styles.social_icon}>in</a> {/* LinkedIn */}
                    <a href="#" className={styles.social_icon}>yt</a> {/* YouTube */}
                    <a href="#" className={styles.social_icon}>tk</a> {/* TikTok */}
                </div>
            </footer>
        </>
    );

    // Main App component rendering different routes
    return (
        <Routes>
            <Route path="/login" element={<LoginPageContent />} />
            <Route path="/register" element={<LoginPageContent />} /> {/* Assuming register uses the same layout */}
            <Route path="/forgot-password" element={<LoginPageContent />} /> {/* Assuming forgot-password uses the same layout */}

            {/* Placeholder for your main dashboard/home page */}
            <Route path="/" element={
                <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Welcome to Evangadi Forum!</h1>
                    <p>This is your main application content. Navigate to <Link to="/login">Login Page</Link>.</p>
                </div>
            } />
            {/* Add more routes here for other pages in your application */}
            <Route path="/dashboard" element={
                <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Welcome to your Dashboard!</h1>
                    <p>You are logged in.</p>
                    <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Logout</button>
                </div>
            } />
            <Route path="/about" element={
                <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>About Us</h1>
                    <p>Information about Evangadi Forum.</p>
                </div>
            } />
            <Route path="/contact" element={
                <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Contact Us</h1>
                    <p>Get in touch with us.</p>
                </div>
            } />
            <Route path="/privacy" element={
                <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Privacy Policy</h1>
                    <p>Our privacy policy details.</p>
                </div>
            } />
            <Route path="/terms" element={
                <div style={{ padding: '40px', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1>Terms of Services</h1>
                    <p>Our terms and conditions.</p>
                </div>
            } />
        </Routes>
    );
};

export default App;
