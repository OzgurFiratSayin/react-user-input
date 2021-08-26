import { useState } from "react";

const SimpleInput = (props) => {

  const [enteredName, setEnteredName] = useState('')
  const [nameInputIsTouched, setNameInputIsTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim().length > 0;
  const nameInputIsInvalid = !enteredNameIsValid && nameInputIsTouched;

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setNameInputIsTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setNameInputIsTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    setEnteredName('');
    setNameInputIsTouched(false);
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
