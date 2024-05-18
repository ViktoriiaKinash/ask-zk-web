import { SyntheticEvent, useRef, useState } from "react";
import axios from "axios";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const APP_ID = import.meta.env.VITE_APP_ID;

type PossibleValue = {
  value: string;
};

type Verification = {
  proof: string;
  merkle_root: string;
  nullifier_hash: string;
  verification_level: VerificationLevel;
};

type Question = {
  multi: boolean;
  possible_values: PossibleValue[];
  value: string;
};

type Survey = {
  FORM: {
    questions: Question[];
  };
};

export const FillSurvey: React.FC = () => {
  const inputValueRef = useRef("");
  const formStateRef = useRef<Record<string, Array<string>>>({});
  const [survey, setSurvey] = useState<Survey>();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.get<Survey>(
        `${VITE_API_URL}/forms/form/${inputValueRef.current}/`
      );
      setSurvey(data);
      formStateRef.current = Object.fromEntries(
        data.FORM.questions.map((question) => [question.value, []])
      );
    } catch (e) {
      console.log(e);
    }
  };

  const sendForm = async (response: Verification) => {
    try {
      await axios.post<Survey>(`${VITE_API_URL}/forms/create-answers/`, {
        payload: response,
        form_id: inputValueRef.current,
        answers: formStateRef.current,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputClick = (
    key: string,
    value: string,
    multi: boolean,
    checked: boolean
  ): void => {
    if (multi) {
      formStateRef.current[key] = checked
        ? [...formStateRef.current[key], value]
        : formStateRef.current[key].filter((val) => val !== value);
      return;
    }
    formStateRef.current[key] = [value];
  };

  const validateFormState = (): boolean => {
    if (!survey) return false;
    return !Object.entries(formStateRef.current).some(([key, values]) => {
      const question = survey.FORM.questions.find((q) => q.value === key);
      if (!question) return true;
      if (!question.multi && values.length !== 1) return true;
      const questionPossibleAnswers = question.possible_values.map(
        ({ value }) => value
      );
      return values.some((val) => !questionPossibleAnswers.includes(val));
    });
  };

  const submitFormHandler = (open: () => void) => {
    if (validateFormState()) open();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => (inputValueRef.current = e.currentTarget.value)}
        />
      </form>
      {survey ? (
        <IDKitWidget
          app_id={APP_ID}
          action={`${inputValueRef.current}-submit`}
          action_description={`vote-for-${inputValueRef.current}`}
          onSuccess={console.log}
          handleVerify={sendForm}
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitFormHandler(open);
              }}
            >
              <h1>FORM</h1>
              {survey.FORM.questions.map(
                ({ multi, possible_values, value }) => (
                  <div key={value}>
                    <h3>{value}</h3>
                    {possible_values.map((possible_value) => (
                      <label key={possible_value.value}>
                        {possible_value.value}
                        <input
                          name={value}
                          type={multi ? "checkbox" : "radio"}
                          onChange={(e) =>
                            handleInputClick(
                              value,
                              possible_value.value,
                              multi,
                              e.target.checked
                            )
                          }
                        />
                      </label>
                    ))}
                  </div>
                )
              )}
              <input type="submit" value="Send" />
            </form>
          )}
        </IDKitWidget>
      ) : null}
    </div>
  );
};
