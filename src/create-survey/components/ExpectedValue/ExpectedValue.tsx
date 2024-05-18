import { PossibleValuesType } from "../../types";

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
    <div key={expectedValue.id}>
      <input
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
