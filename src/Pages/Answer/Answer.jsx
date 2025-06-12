// Pages/Answer/Answer.jsx
import React, { useState } from 'react';
import classes from './Answer.module.css'

const Answer = () => {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted answer:', answer);
    // Here you'd send `answer` to your API
  };

  return (
    <div>
      <h2>Question Title</h2>
      <p>This is the question description or detail...</p>

      {/* User Profile section */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          
        />
        <span>@username</span>
      </div>

      {/* Answer form */}
      <form onSubmit={handleSubmit} className={classes.anserw}>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write your answer here..."
          
        />
        <div>
            <button className={classes.button} type="submit" >
          Post your Answer
        </button>

        </div>
        
      </form>
    </div>
  );
};

export default Answer;
