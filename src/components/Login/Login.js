import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const EmailHandlerReducer = (state, action) => {
  if (action.type === "Input_User") {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === "Input_Blur") {
    return ({ value: state.value, isValid: state.value.includes('@') })
  }
}
const passwordHandlerReducer = (state, action) => {
  if (action.type === 'User_Password') {
    return {value:action.val,isValid:action.val.trim().length>6}
  }
  if (action.type === 'Password_Blur') {
    return {value:state.value,isvalid:state.value.trim().length>6}
  }
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const[emailstate,dispatchEmail] = useReducer(EmailHandlerReducer,{value:'',isValid:null})
  const[passwordstate,dispatchpassword] = useReducer(passwordHandlerReducer, {value:'',isValid:null})
  
  const { isValid:emailIsvalid } = emailstate;//isValid shiuld be same as emailsate.isValid
  const {isValid : passwordIsValid} = passwordstate
  
  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity email ! ' + emailIsvalid);
      setFormIsValid(
        emailIsvalid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsvalid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "Input_User", val: event.target.value })
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordstate.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({type:'User_Password',val:event.target.value})

    // setFormIsValid(
    //   emailstate.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "Input_Blur" })
  };

  const validatePasswordHandler = () => {
    dispatchpassword({type:"Password_Blur"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordstate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordstate.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
