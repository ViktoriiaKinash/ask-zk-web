import { useState } from "react";
import { QuestionEntityType } from "./types";
import QuestionEntity from "./components/QuestionEntity";
import axios from "axios";

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

  const submitSurvey = () => {
    const param = { form: [] };
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
    <div>
      <h1>Create Survey</h1>
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
        Add question
      </button>
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
      <button onClick={submitSurvey}>Submit</button>
    </div>
  );
};

export default CreateSurvey;
