import { useState } from "react";

const SimpleInput = (props) => {

  const [enteredName, setEnteredName] = useState('')
  const [nameInputIsTouched, setNameInputIsTouched] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('')
  const [emailInputIsTouched, setEmailInputIsTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim().length > 0;
  const nameInputIsInvalid = !enteredNameIsValid && nameInputIsTouched;

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const enteredEmailIsValid = validateEmail(enteredEmail);
  const emailInputIsInvalid = !enteredEmailIsValid && emailInputIsTouched;


  let formIsValid = false

  if (enteredNameIsValid && enteredEmailIsValid) {
   formIsValid = true
  }

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const nameInputBlurHandler = (event) => {
    setNameInputIsTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const emailInputBlurHandler = (event) => {
    setEmailInputIsTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    setNameInputIsTouched(true);
    setEmailInputIsTouched(true);

    if (!formIsValid) {
      return;
    }

    setEnteredName('');
    setEnteredEmail('');
    setNameInputIsTouched(false);
    setEmailInputIsTouched(false);
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

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
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your e-mail</label>
        <input
          type='email'
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && <p className="error-text">Please enter a vlaid e-mail</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
