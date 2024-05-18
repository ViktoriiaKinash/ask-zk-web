import { QuestionEntityType } from "../../types";
import ExpectedValue from "../ExpectedValue";
import "./QuestionEntity.css";

interface QuestionEntityProps extends QuestionEntityType {
  deleteQuestion: (id: string) => void;
  changeQuestionTitle: (id: string, value: string) => void;
  addQuestionExpectedValue: (id: string) => void;
  removeQuestionExpectedValue: (questionId: string, valueId: string) => void;
  changeExpectedValue: (
    questionId: string,
    valueId: string,
    value: string
  ) => void;
}

const QuestionEntity = ({
  id,
  value,
  deleteQuestion,
  changeQuestionTitle,
  addQuestionExpectedValue,
  removeQuestionExpectedValue,
  changeExpectedValue,
}: QuestionEntityProps) => {
  return (
    <div>
      <div className="new-question-wrapper">
        <input
          type="text"
          value={value.value}
          onChange={(e) => {
            changeQuestionTitle(id, e.target.value);
          }}
        />
        <button
          onClick={() => {
            deleteQuestion(id);
          }}
        >
          Delete
        </button>
      </div>
      <div>
        {value.possible_values.map((possibleValue) => (
          <ExpectedValue
            key={possibleValue.id}
            expectedValue={possibleValue}
            questionId={id}
            removeQuestionExpectedValue={removeQuestionExpectedValue}
            changeExpectedValue={changeExpectedValue}
          />
        ))}
      </div>
      <button
        onClick={() => {
          addQuestionExpectedValue(id);
        }}
      >
        Add an answer
      </button>
    </div>
  );
};

export default QuestionEntity;
