import { SyntheticEvent, useRef, useState } from "react";
import axios from "axios";
import "./Results.css";

const VITE_API_URL = import.meta.env.VITE_API_URL;

type AnswerWithCount = {
  value: string;
  count: number;
};

type QuestionWithAnswersCount = {
  question: string;
  total_answers_count: number;
  answers: AnswerWithCount[];
};

type SurveyAnswers = {
  form_id: string;
  form_hash: string;
  questions_with_answers_count: QuestionWithAnswersCount[];
};

const Results: React.FC = () => {
  const inputValueRef = useRef("");
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers>();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<SurveyAnswers>(
        `${VITE_API_URL}/forms/data/`,
        {
          form_hash: inputValueRef.current,
        }
      );
      setSurveyAnswers(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <h1>ASK.ZK</h1>
      <p>Fully anonymous surveys for professional and everyday use</p>
      {surveyAnswers ? (
        <div className="survey">
          {surveyAnswers.questions_with_answers_count.map(
            ({ question, total_answers_count, answers }) => (
              <div key={question} className="question-wrapper">
                <h3>{question}</h3>
                <p>Total answers: {total_answers_count}</p>
                {answers.map((answer) => (
                  <div key={answer.value} className="answer-wrapper">
                    <h5>{answer.value}</h5>
                    <p>Count: {answer.count}</p>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      ) : (
        <form onSubmit={submitHandler}>
          <input
            type="text"
            onChange={(e) => (inputValueRef.current = e.currentTarget.value)}
            placeholder="Insert a form hash..."
          />
        </form>
      )}
    </div>
  );
};

export default Results;
