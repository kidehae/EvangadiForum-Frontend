import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { getAllQuestions } from "../../Utility/axios";
import QuestionList from "../../Components/QuestionList/QuestionList";
import { Button, Spinner } from "react-bootstrap";
import styles from "./Home.module.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [displayCount, setDisplayCount] = useState(5);

  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (allQuestions.length > 0) {
      setQuestions(allQuestions.slice(0, displayCount));
    }
  }, [displayCount, allQuestions]);

  const fetchQuestions = async () => {
    try {
      const response = await getAllQuestions();
      console.log("API response:", response.data);

      // Since backend returns { questions: [...] }
      if (response.status === 200 && response.data.questions) {
        setAllQuestions(response.data.questions);
        setQuestions(response.data.questions.slice(0, displayCount));
        setError("");
      } else {
        setError("Failed to fetch questions");
      }
    } catch (err) {
      setError("Failed to fetch questions");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleAskQuestion = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/askQuestion");
  };

  const seeMore = () => {
    setDisplayCount((count) => count + 10);
  };

  const seeLess = () => {
    setDisplayCount(5);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <div className={styles.topSection}>
          <Button className={styles.askQuestionBtn} onClick={handleAskQuestion}>
            Ask Question
          </Button>
          <div className={styles.welcomeMessage}>
            Welcome: {user?.username || user?.first_name || "User"}
          </div>
        </div>

        <div className={styles.questionsSection}>
          <h2 className={styles.questionsTitle}>Questions</h2>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <div className={styles.questionsList}>

            {questions.length === 0 ? (
              <div className={styles.noQuestions}>
                <p>No questions available</p>
              </div>
            ) : (
              questions.map((q) => (
                <QuestionList
                  key={q.questionid}
                  username={q.username}
                  title={q.title}
                  userId={q.userid}
                  questionId={q.questionid}
                />
              ))
            )}
          </div>

          {/* seeless and seemore */}
          {allQuestions.length > 10 && (
            <div className={styles.see_more_container}>
              {displayCount < allQuestions.length && (
                <Button className={styles.see_more_button} onClick={seeMore}>
                  See More
                </Button>
              )}
              {displayCount > 10 && (
                <Button className={styles.see_less_button} onClick={seeLess}>
                  See Less
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
