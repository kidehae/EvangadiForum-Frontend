<<<<<<< HEAD
import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './Questionpage.module.css';
import { axiosInstance } from '../../Utility/axios';

function QuestionPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post(
        '/api/question',
        {
          title,
          description,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.msg || 'Question posted successfully.');
      setTitle('');
      setDescription('');
      setLoading(false);

      // Navigate to questions page after 2 seconds (to show success message)
      setTimeout(() => {
        navigate('/questions');
      }, 2000);
    } catch (error) {
      console.error('Error posting question:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Error posting question. Please try again.');
=======
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Components/Auth/Auth";
import { axiosInstance } from "../../Utility/axios";
import styles from "./Question.module.css";
import { Link } from "react-router-dom";

function QuestionPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!title.trim() || !description.trim()) {
      setError("Both title and description are required.");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/api/question", {
        title,
        description,
        tag,
      });

      setSuccess("Question posted successfully!");
      setTitle("");
      setDescription("");
      setTag("");
      setLoading(false);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to post question. Please try again."
      );
>>>>>>> eb48283 (feat: add See More/See Less toggle in Home, complete all pages as functional components, add Home and All Questions pages, resolve all merge conflicts, and perform full testing)
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div>
      <section className={styles.questionContainer}>
        <h1 className={styles.title}>Steps to write a good question</h1>
        <ul className={styles.stepsList}>
          <li>
            <FaArrowRight className={styles.listIcon} />
            Summarize your problem in a one-line title
          </li>
          <li>
            <FaArrowRight className={styles.listIcon} />
            Describe your problem in more detail
          </li>
          <li>
            <FaArrowRight className={styles.listIcon} />
            Explain what you tried and what you expected to happen
          </li>
          <li>
            <FaArrowRight className={styles.listIcon} />
            Review your question and post it to the site
          </li>
        </ul>
        <div className={styles.postQuestionForm}>
          <h2 className={styles.formTitle}>Ask a public question</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={styles.questionTitleInput}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className={styles.questionDetailsTextarea}
              placeholder="Question Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Submitting...' : 'Post Your Question'}
            </button>
          </form>
          <a href="/questions" className={styles.goToLink}>Go to Question page</a>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}
        </div>
      </section>
=======
    <div className={styles.questionContainer}>


      {/* Success Message */}
      {success && (
        <div className={styles.successBox}>
          <p>{success}</p>
          <div className={styles.navigationOptions}>
            <Link to="/home" className={styles.navButton}>
              🏠 Home
            </Link>
            <Link to="/home" className={styles.navButton}>
              📚 All Questions
            </Link>
          </div>
        </div>
      )}

      <h1 className={styles.title}>Ask a Question</h1>
      <form onSubmit={handleSubmit} className={styles.postQuestionForm}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.questionTitleInput}
          required
        />
        <textarea
          placeholder="Question Description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.questionDetailsTextarea}
          required
        />
        <input
          type="text"
          placeholder="Tag (optional)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className={styles.tagInput}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Submitting..." : "Post Your Question"}
        </button>
      </form>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}
>>>>>>> eb48283 (feat: add See More/See Less toggle in Home, complete all pages as functional components, add Home and All Questions pages, resolve all merge conflicts, and perform full testing)
    </div>
  );
}

<<<<<<< HEAD
export default QuestionPage;
=======
export default QuestionPage;
>>>>>>> eb48283 (feat: add See More/See Less toggle in Home, complete all pages as functional components, add Home and All Questions pages, resolve all merge conflicts, and perform full testing)
