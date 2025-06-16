import React, { useEffect, useState, useContext } from "react";
import styles from "./Answer.module.css";
import { useParams, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaUserCircle } from "react-icons/fa";
import { questionsAPI, answersAPI } from "../../Utility/axios";
import { AuthContext } from "../../Components/Auth/Auth";

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
      try {
        setLoading(true);
        setError(null);

        // Fetch question
        const qRes = await questionsAPI.getQuestionById(questionId);
        setQuestion(qRes.data.question);

        // Fetch answers
        const aRes = await answersAPI.getAnswersByQuestionId(questionId);
        setAnswers(aRes.data.answers || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || "Failed to load data");
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
