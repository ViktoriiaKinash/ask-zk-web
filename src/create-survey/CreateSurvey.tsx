import { useState } from "react";
import { QuestionEntityType } from "./types";
import QuestionEntity from "./components/QuestionEntity";
import axios from "axios";
import "./CreateSurvey.css";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const APP_ID = import.meta.env.VITE_APP_ID;

type Verification = {
  proof: string;
  merkle_root: string;
  nullifier_hash: string;
  verification_level: VerificationLevel;
};

const CreateSurvey = () => {
  const [survey, setSurvey] = useState<QuestionEntityType[]>([]);

  const deleteQuestion = (id: string) => {
    setSurvey(survey.filter((question) => question.id !== id));
  };

  const changeQuestionTitle = (id: string, value: string) => {
    setSurvey(
      survey.map((question) =>
        question.id === id
          ? { ...question, value: { ...question.value, value } }
          : question
      )
    );
  };

  const addQuestionExpectedValue = (id: string) => {
    setSurvey(
      survey.map((question) =>
        question.id === id
          ? {
              ...question,
              value: {
                ...question.value,
                possible_values: [
                  ...question.value.possible_values,
                  {
                    id: Math.random().toString(),
                    value: "New value",
                  },
                ],
              },
            }
          : question
      )
    );
  };

  const changeExpectedValue = (
    questionId: string,
    valueId: string,
    value: string
  ) => {
    setSurvey(
      survey.map((question) =>
        question.id === questionId
          ? {
              ...question,
              value: {
                ...question.value,
                possible_values: question.value.possible_values.map(
                  (possibleValue) =>
                    possibleValue.id === valueId
                      ? { ...possibleValue, value }
                      : possibleValue
                ),
              },
            }
          : question
      )
    );
  };

  const removeQuestionExpectedValue = (questionId: string, valueId: string) => {
    setSurvey(
      survey.map((question) =>
        question.id === questionId
          ? {
              ...question,
              value: {
                ...question.value,
                possible_values: question.value.possible_values.filter(
                  (value) => value.id !== valueId
                ),
              },
            }
          : question
      )
    );
  };

  const submitSurvey = (result: Verification) => {
    const param = { form: [], payload: result } as {
      form: { value: string; possible_values: string[] }[];
    };
    survey.forEach((question) => {
      console.log("question ", question);
      const paramVal = {
        value: question.value.value,
        possible_values: question.value.possible_values.map(
          (value) => value.value
        ),
      };
      param.form.push(paramVal);
    });
    console.log("param ", param);
    axios.post("http://127.0.0.1:8000/forms/create/", param);
  };

  return (
    <div className="container">
      <h1>ASK.ZK</h1>
      <button
        onClick={() => {
          setSurvey([
            ...survey,
            {
              id: Math.random().toString(),
              value: {
                value: "Title",
                possible_values: [],
              },
            },
          ]);
        }}
      >
        Add a question
      </button>
      <div className="survey">
        {survey.map((question) => (
          <QuestionEntity
            key={question.id}
            {...question}
            deleteQuestion={deleteQuestion}
            changeQuestionTitle={changeQuestionTitle}
            addQuestionExpectedValue={addQuestionExpectedValue}
            removeQuestionExpectedValue={removeQuestionExpectedValue}
            changeExpectedValue={changeExpectedValue}
          />
        ))}
        <IDKitWidget
          app_id={APP_ID}
          action="askzk-test"
          onSuccess={console.log}
          handleVerify={submitSurvey}
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => <input type="submit" onClick={open} value="SUBMIT" />}
        </IDKitWidget>
      </div>
    </div>
  );
};

export default CreateSurvey;
