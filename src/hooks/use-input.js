import { useReducer } from 'react';

const initialInputState = {
  enteredValue: '',
  isTouched: false
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { enteredValue: action.value, isTouched: state.isTouched };
  }

  if (action.type === 'BLUR') {
    return { isTouched: true, enteredValue: state.enteredValue };
  }

  if (action.type === 'RESET') {
    return initialInputState;
  }

  return inputStateReducer;
};

const useInput = (validateValue) => {

  const [inputState, dispatchFunction] = useReducer(inputStateReducer, initialInputState)

  // const [enteredValue, setEnteredValue] = useState('');
  // const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(inputState.enteredValue);
  const hasError = !isValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatchFunction({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    // setIsTouched(true);
    dispatchFunction({ type: 'BLUR' });
  };

  const reset = () => {
    // setEnteredValue('');
    // setIsTouched(false);
    dispatchFunction({ type: 'RESET' });
  }

  return {
    enteredValue: inputState.enteredValue,
    isValid: isValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
