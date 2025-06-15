<<<<<<< HEAD
<<<<<<< HEAD
//import statements
import React, { useEffect, useState } from 'react';//core react features
import { questionsAPI, answersAPI } from '../../Utility/axios';
import styles from '../Answer/Answer.module.css'; // CSS Module
import { useParams, Link } from 'react-router-dom';//react router tools to get URL params and link between routes.
import { ClipLoader } from 'react-spinners';
import { FaUserCircle } from 'react-icons/fa';
=======
import React, { useEffect, useState } from "react";
=======
import React, { useEffect, useState, useContext } from "react";
>>>>>>> 800b2e6e7d2212b70147132506f5ec24df7ee4a7
import styles from "./Answer.module.css";
import { useParams, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaUserCircle } from "react-icons/fa";
import { questionsAPI, answersAPI } from "../../Utility/axios";
import { AuthContext } from "../../Components/Auth/Auth";

<<<<<<< HEAD

>>>>>>> 3a08f3949e4a94343abeed840695b5597c993800

=======
>>>>>>> 800b2e6e7d2212b70147132506f5ec24df7ee4a7
const AnswerPage = () => {
  const { questionId } = useParams();
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
<<<<<<< HEAD
    try {
        const [qRes, aRes] = await Promise.all([
        questionsAPI.get(`/api/question/${questionId}`,{ withCredentials: true }),
        answersAPI.get(`/api/answer/${questionId}`,{ withCredentials: true })
        ]);
        setQuestion(qRes.data);
        setAnswers(aRes.data.answers);
        setErrorMessage('');
    } catch (error) {
        const msg = error.response?.data?.message || 'An unexpected error occurred while fetching data.';
=======
      try {
        setLoading(true);
        setError(null);

        // Fetch question
        const qRes = await questionsAPI.getQuestionById(questionId);
        setQuestion(qRes.data.question);

<<<<<<< HEAD
        try {
          const aRes = await answersAPI.getAnswersByQuestionId(questionId);
          setAnswers(aRes.data.answers);
        } catch (ansErr) {
          if (ansErr.response?.status === 404) {
            setAnswers([]); // No answers
          } else {
            throw ansErr;
          }
        }

        setErrorMessage("");
      } catch (error) {
        const msg =
          error.response?.data?.message ||
          "An unexpected error occurred while fetching data.";
>>>>>>> 3a08f3949e4a94343abeed840695b5597c993800
        setErrorMessage(msg);
        console.error("Error fetching data:", msg);
=======
        // Fetch answers
        const aRes = await answersAPI.getAnswersByQuestionId(questionId);
        setAnswers(aRes.data.answers || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load data");
>>>>>>> 800b2e6e7d2212b70147132506f5ec24df7ee4a7
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [questionId]);

  const handlePostAnswer = async () => {
    if (!newAnswer.trim()) {
      setError("Please provide an answer");
      return;
    }

    try {
      setError(null);
      const res = await answersAPI.postAnswer({
        questionid: questionId,
        answer: newAnswer,
      });

      setAnswers((prev) => [res.data.answer, ...prev]);
      setNewAnswer("");
      setSuccess("Answer posted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Post error:", err);
      setError(err.response?.data?.message || "Failed to post answer");
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? "Just now" : date.toLocaleString();
    } catch {
      return "Just now";
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <ClipLoader color="#007bff" size={50} />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Question Section */}
      {question ? (
        <div className={styles.questionSection}>
          <h2 className={styles.sectionTitle}>QUESTION</h2>
          <h3 className={styles.title}>{question.title}</h3>
          <p className={styles.body}>{question.description}</p>
        </div>
      ) : (
        <p className={styles.error}>Question not found</p>
      )}

      {/* Answers Section */}
      <div className={styles.answerSection}>
        <hr />
        <h3 className={styles.sectionTitle}>Answers From The Community</h3>
        <hr />
        {answers.length === 0 ? (
          <p>No answers yet. Be the first to answer!</p>
        ) : (
          answers.map((answer) => (
            <div key={answer.answerid} className={styles.answer}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <FaUserCircle size={65} className={styles.icon} />
                <div>
                  <p>{answer.answer}</p>
                  <span className={styles.timestamp}>
                    {formatDate(answer.createdate)} —{" "}
                    {answer.username || "Anonymous"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Answer Section */}
      <div className={styles.postAnswerSection}>
        <h3 className={styles.sectionTitle}>Answer The Top Question</h3>

        {error && <div className={styles.errorBox}>{error}</div>}
        {success && <div className={styles.successBox}>{success}</div>}

        <textarea
          className={styles.textarea}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Write your answer here..."
          rows={5}
        />

        <button
          onClick={handlePostAnswer}
          className={styles.postButton}
          disabled={!newAnswer.trim()}
        >
          Post Answer
        </button>
      </div>
    </div>
  );
};

export default AnswerPage;