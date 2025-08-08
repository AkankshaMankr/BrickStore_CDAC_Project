import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";
import './AdminQnA.css'; // Keep CSS for custom styles
import config from '../config';
function AdminQnA() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  const navigate = useNavigate();

        useEffect(() => {
        if (!sessionStorage.getItem("userName")) {
          navigate("/");
        } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
          navigate("/customer");
        } else if (sessionStorage.getItem("userRole") === "ADMIN") {
          navigate("/admin");
        }
            else if (sessionStorage.getItem("userRole") === "ENGINEER") {
      navigate("/engineer");
    }
      }, [navigate]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = sessionStorage.getItem("jwtToken");
      const res = await axios.get(`${config.API_URL}/questions/admin/getAllQuestions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sorted = [...res.data].sort((a, b) => a.answered - b.answered); // Unanswered first
      setQuestions(sorted);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleInputChange = (e, id) => {
    setAnswers({ ...answers, [id]: e.target.value });
  };

  const handleReply = async (id) => {
    const answerText = answers[id];
    if (!answerText) return alert("Please enter an answer.");

    try {
      const token = sessionStorage.getItem("jwtToken");

      await axios.post(
        `${config.API_URL}/questions/admin/answer/${id}`,
        {
          answer: answerText,
          adminId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchQuestions(); // Refresh
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <Admin>
      <div className="qa-container">
        <h2 className="qa-title">User Questions</h2>
        <div className="qa-card-wrapper">
          {questions.map((q, index) => (
            <div className="qa-card" key={index}>
              <div className="qa-message-block">
                <p className="qa-label">Question</p>
                <div className="qa-question-bubble">{q.question}</div>
              </div>

              <div className="qa-message-block">
                <p className="qa-label">Answer</p>
                {q.isAnswered ? (
                  <div className="qa-answer-bubble">{q.answer}</div>
                ) : (
                  <>
                    <textarea
                      placeholder="Type your answer..."
                      className="qa-textarea"
                      value={answers[q.id] || ""}
                      onChange={(e) => handleInputChange(e, q.id)}
                    />
                    <button className="qa-reply-btn" onClick={() => handleReply(q.id)}>
                      Reply
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Admin>
  );
}

export default AdminQnA;
