//import statements
import React, { useEffect, useState } from 'react';//core react features
import axios from '../../Utility/axios'; // Axios instance with base URL
import styles from '../Answer/Answer.module.css'; // CSS Module
import { useParams, Link } from 'react-router-dom';//react router tools to get URL params and link between routes.
import { ClipLoader } from 'react-spinners';
import { FaUserCircle } from 'react-icons/fa';

const AnswerPage = () => {
const { questionId } = useParams();
const [question, setQuestion] = useState(null);
const [answers, setAnswers] = useState([]);
const [newAnswer, setNewAnswer] = useState('');
const [loading, setLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState('');
const [successMessage, setSuccessMessage] = useState('');

useEffect(() => {
    const fetchData = async () => {
    try {
        const [qRes, aRes] = await Promise.all([
        axios.get(`/api/question/${questionId}`,{ withCredentials: true }),
        axios.get(`/api/answer/${questionId}`,{ withCredentials: true })
        ]);
        setQuestion(qRes.data);
        setAnswers(aRes.data.answers);
        setErrorMessage('');
    } catch (error) {
        const msg = error.response?.data?.message || 'An unexpected error occurred while fetching data.';
        setErrorMessage(msg);
        console.error('Error fetching data:', msg);
    } finally {
        setLoading(false);
    }
    };

    fetchData();
}, [questionId]);

const handlePostAnswer = async () => {
    if (!newAnswer.trim()) {
    setErrorMessage('Please provide answer!');
    return;
    }

    try {
      const res = await axios.post('/api/answer', {
        questionid: questionId,
        answer: newAnswer,
      });

      setAnswers((prev) => [...prev, res.data]);
      setNewAnswer('');
      setErrorMessage('');
      setSuccessMessage('✅ Your answer was posted successfully!');
    } catch (err) {
      const msg = err.response?.data?.msg || err.response?.data?.message || 'An unexpected error occurred.';
      setErrorMessage(msg);
      console.error('Error posting answer:', msg);
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

  if (!question) return <p>Question not found.</p>;
  console.log('questionId', questionId);

  return (
    <div className={styles.container}>
      {/* Question Section */}
      <div className={styles.questionSection}>
        <h2 className={styles.sectionTitle}>QUESTION</h2>
        <h3 className={styles.title}>{question.title}</h3>
        <p className={styles.body}>{question.body}</p>
      </div>

      {/* Error Message */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      {/* Success Message with Navigation Options */}
      {successMessage && (
        <div className={styles.successBox}>
          <p>{successMessage}</p>
          <div className={styles.navigationOptions}>
            <Link to="/" className={styles.navButton}>🏠 Home</Link>
            <Link to="/api/question" className={styles.navButton}>📚 All Questions</Link>
          </div>
        </div>
      )}

      {/* Answers Section */}
      <hr/>
      <div className={styles.answerSection}>
          
        <h3 className={styles.sectionTitle}>Answer From The Community</h3>
        {answers.length === 0 ? (
          <p>No answers yet.</p>
        ) : (
          answers.map((answer) => (
            <div key={answer.answerid} className={styles.answer}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FaUserCircle size={32} color="#007bff" />
                <div>
                  <p>{answer.answer}</p>
                  <span className={styles.timestamp}>
                    {new Date(answer.createdate).toLocaleString()} — {answer.username}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <hr/>

      {/* Post Answer Section */}
      <div className={styles.postAnswerSection}>
        <h3 className={styles.sectionTitle}>Post Your Answer</h3>
        <textarea
          className={styles.textarea}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Your answer ..."
        />
        <button onClick={handlePostAnswer} className={styles.postButton}>
          Post Answer
        </button>
      </div>
    </div>
  );
};

export default AnswerPage;
