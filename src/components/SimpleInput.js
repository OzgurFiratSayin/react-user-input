import { useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();

  const [enteredName, setEnteredName] = useState('')
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [nameInputIsTouched, setNameInputIsTouched] = useState(false);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  }

  const nameInputBlurHandler = (event) => {
    setNameInputIsTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setNameInputIsTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    setEnteredName('');
    // nameInputRef.current.value = '';  NOT IDEAL (MANIPULATING THE DOM)
  }

  const nameInputisInvalid = !enteredNameIsValid && nameInputIsTouched;

  const nameInputClasses = nameInputisInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputisInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
