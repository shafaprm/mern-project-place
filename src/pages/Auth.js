import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/shared/UI/Card.js";
import Input from "../components/shared/form/Input.js";
import Button from "../components/shared/form/Button.js";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/shared/utils/validators.js";
import { useForm } from "../hooks/form-hook.js";
import { AuthContext } from "../context/auth-context.js";
import styles from "./Auth.module.css";
import ErrorModal from "../components/shared/UI/ErrorModal.js";
import LoadingSpinner from "../components/shared/UI/LoadingSpinner.js";
import ImageUpload from '../components/shared/form/ImageUpload.js';
import { useHttp } from "../hooks/http-hook.js";

const Auth = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const navigate = useNavigate();
  const { isLoading, errorMessage, sendRequest, resetError } = useHttp();
  const [formState, inputHandler, setFormValue] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const authContext = useContext(AuthContext);

  const switchPageHandler = () => {
    if (!isLoginPage) {
      setFormValue(
        {
          ...formState.inputs,
          name: undefined,
          image : {
            value : null, 
            isValid : false,
          }
        },
        formState.inputs.name.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormValue(
        {
          ...formState.inputs,
          email: {
            value: "",
            isValid: false,
          },
          password : {
            value : '', 
            isValid : false,
          }
        },
        false
      );
    }

    setIsLoginPage((prevPage) => {
      return !prevPage;
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (isLoginPage) {
      try{
        const data = await sendRequest(
          "https://mern-place-api.herokuapp.com/api/users/login",
          "POST",
          JSON.stringify({
            email : formState.inputs.email.value,
            password : formState.inputs.password.value
          }),{'Content-Type' : 'application/json'}
        );

        authContext.loginHandler(data.id, data.token);
        navigate("", { replace: true });
      }catch(err){
        console.log(err);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('email', formState.inputs.email.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);

        const data = await sendRequest(
          "https://mern-place-api.herokuapp.com/api/users/register",
           "POST",
          formData,
        );

        authContext.loginHandler(data.id, data.token);
        navigate("", { replace: true });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const signUpComponent = (
    <React.Fragment>
      <Input
        id="name"
        element="input"
        label="name"
        errorMessage="please enter a valid name"
        type="text"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <ImageUpload id = "image" center onInput = {inputHandler}/>
    </React.Fragment>
  );


  return (
    <React.Fragment>
      <ErrorModal error={errorMessage} onClear={resetError} />
      <Card className={styles["authentication"]}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginPage ? "login" : "sign up"}</h2>
        <hr />
        <form onSubmit={submitHandler}>
          {!isLoginPage && signUpComponent}
          <Input
            id="email"
            element="input"
            errorMessage="please enter a valid email"
            type="email"
            label="email"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            errorMessage="please enter a valid password"
            type="password"
            label="password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginPage ? "login" : "sign up"}
          </Button>
        </form>
        <Button inverse type="button" onClick={switchPageHandler}>
          {isLoginPage
            ? "doesnt have an account? click here to sign up"
            : "already have an account? click here to login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
