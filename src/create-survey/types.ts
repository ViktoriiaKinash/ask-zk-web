export interface PossibleValuesType {
  id: string;
  value: string;
}

export interface QuestionType {
  value: string;
  possible_values: PossibleValuesType[];
}

export interface QuestionEntityType {
  id: string;
  value: QuestionType;
}
