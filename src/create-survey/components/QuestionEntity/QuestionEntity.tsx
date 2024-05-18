import { QuestionEntityType } from "../../types";
import ExpectedValue from "../ExpectedValue";

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
    <div style={{ display: "flex", flexDirection: "column", marginTop: 30 }}>
      <div>
        <input
          value={value.value}
          onChange={(e) => {
            changeQuestionTitle(id, e.target.value);
          }}
        ></input>
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
        Add default value
      </button>
    </div>
  );
};

export default QuestionEntity;
