import { PossibleValuesType } from "../../types";
import "./ExpectedValue.css";

interface ExpectedValueProps {
  expectedValue: PossibleValuesType;
  questionId: string;
  removeQuestionExpectedValue: (questionId: string, valueId: string) => void;
  changeExpectedValue: (
    questionId: string,
    valueId: string,
    value: string
  ) => void;
}

const ExpectedValue = ({
  expectedValue,
  questionId,
  removeQuestionExpectedValue,
  changeExpectedValue,
}: ExpectedValueProps) => {
  return (
    <div className="new-question-wrapper">
      <input
        type="text"
        value={expectedValue.value}
        onChange={(e) => {
          changeExpectedValue(questionId, expectedValue.id, e.target.value);
        }}
      ></input>
      <button
        onClick={() =>
          removeQuestionExpectedValue(questionId, expectedValue.id)
        }
      >
        Delete
      </button>
    </div>
  );
};

export default ExpectedValue;
