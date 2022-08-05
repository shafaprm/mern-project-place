import React, { useCallback, useReducer } from "react";

const reducer = (state, actions) => {
  switch (actions.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (let input in state.inputs) {
        if(!state.inputs[input]){
          continue;
        }
        if (input === actions.input) {
          formIsValid = formIsValid && actions.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [actions.input]: { value: actions.value, isValid: actions.isValid },
        },
        isValid: formIsValid,
      };

    case "SET_FORM":
      return {
        inputs: actions.inputs,
        isValid: actions.isValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialValidity) => {
  const [formState, dispatch] = useReducer(reducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value, isValid, input: id });
  }, []);

  const setFormValue = useCallback((inputData, initialValidity) => {
    dispatch({ type: "SET_FORM", inputs: inputData, isValid: initialValidity });
  }, []);

  return [formState, inputHandler, setFormValue];
};
