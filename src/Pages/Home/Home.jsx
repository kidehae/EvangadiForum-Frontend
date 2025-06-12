import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { getAllQuestions } from "../../Utility/axios";
import QuestionList from "../../Components/QuestionList/QuestionList";
import { Button, Spinner } from "react-bootstrap";
import styles from "./Home.module.css";

const Home = () => {
 

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

        </div>
      </div>
    </div>
  );
};

export default Home;