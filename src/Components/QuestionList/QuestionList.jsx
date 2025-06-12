import React from "react";
import classes from "./QuestionList.module.css";
import { AccountCircle } from "@mui/icons-material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import QuestionPage from "../../Pages/Question/QuestionPage";
import { useNavigate } from "react-router-dom";

function QuestionList() {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <section className={classes.header}>
        <div className={classes.headerContent}>
          <button
            className={classes.button}
            onClick={() => navigate("/ask-question")}
          >
            Ask Question
          </button>
          <p className={classes.welcome}>Welcome: danny_gir_admin</p>
        </div>
      </section>
      <section className={classes.questionsSection}>
        <h1>Questions</h1>
        <div className={classes.questionsList}>
          <ul>
            <li className={classes.questionItem}>
              <div className={classes.questionContent}>
                <div className={classes.userIconandname}>
                  {" "}
                  <PersonPinIcon className={classes.icon} fontSize="0px" />
                  <p className={classes.user}>mistake_Z</p>
                </div>
                <div className={classes.questionText}>git gen menderiew?</div>
              </div>
              <KeyboardArrowRightIcon
                className={classes.arrow}
                onClick={() => {
                  navigate("/singlequestion-page");
                }}
              />
            </li>
            <li className={classes.questionItem}>
              <div className={classes.questionContent}>
                <div className={classes.userIconandname}>
                  {" "}
                  <PersonPinIcon className={classes.icon} />{" "}
                  <p className={classes.user}>danny_gir_admin</p>
                </div>
                <div className={classes.questionText}>
                  what's react-router-dom?
                </div>
              </div>
              <KeyboardArrowRightIcon
                className={classes.arrow}
                onClick={() => {
                  navigate("/singlequestion-page");
                }}
              />
            </li>
            <li className={classes.questionItem}>
              <div className={classes.questionContent}>
                <div className={classes.userIconandname}>
                  {" "}
                  <PersonPinIcon className={classes.icon} />{" "}
                  <p className={classes.user}>danny_gir_admin</p>
                </div>
                <div className={classes.questionText}>what is http?</div>
              </div>
              <KeyboardArrowRightIcon
                className={classes.arrow}
                onClick={() => {
                  navigate("/singlequestion-page");
                }}
              />
            </li>
            <li className={classes.questionItem}>
              <div className={classes.questionContent}>
                <div className={classes.userIconandname}>
                  {" "}
                  <PersonPinIcon className={classes.icon} />{" "}
                  <p className={classes.user}>reduit_12</p>
                </div>
                <div className={classes.questionText}>What's dir?</div>
              </div>
              <KeyboardArrowRightIcon
                className={classes.arrow}
                onClick={() => {
                  navigate("/singlequestion-page");
                }}
              />
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default QuestionList;
