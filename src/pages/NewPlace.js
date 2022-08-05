import React, { useCallback, useReducer, useContext } from "react";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../components/shared/utils/validators.js";
import Input from "../components/shared/form/Input.js";
import Button from "../components/shared/form/Button.js";
import LoadingSpinner from '../components/shared/UI/LoadingSpinner.js';
import ErrorModal from '../components/shared/UI/ErrorModal.js';
import {useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/form-hook.js';
import { useHttp } from '../hooks/http-hook.js';
import {AuthContext} from '../context/auth-context.js';
import ImageUpload from '../components/shared/form/ImageUpload.js';
import styles from "./NewPlace.module.css";

const NewPlace = () => {
  const { isLoading, errorMessage, sendRequest, resetError} = useHttp();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [formState, inputHandler] = useForm({
    title : {
      value : '',
      isValid : false,
    },
    description : {
      value : '',
      isValid : false,
    },
    address : {
      value : '',
      isValid : false
    },
    image : {
      value : null,
      isValid : false,
    }
  }, false)

  const submitHandler = async (event) => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value)

      const data = await sendRequest('https://mern-place-api.herokuapp.com/api/places', 'POST',formData, {'Authorization' : `bearer ${authContext.token}`});

      navigate('/', { replace : true });
    }catch(err){
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      {isLoading && <div className = "center"><LoadingSpinner asOverlay/></div>}
      <ErrorModal error = {errorMessage} onClear = {resetError} />
      <form className={styles["place-form"]} onSubmit = {submitHandler}>
        <Input
          element="input"
          type="text"
          id="title"
          label="title"
          errorMessage="please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          label="description"
          errorMessage="please enter a valid description"
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
        />
        <Input
          element="input"
          type="text"
          id="address"
          label="address"
          errorMessage="please enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <ImageUpload id = "image" onInput = {inputHandler} errorMessage = "please provide an image" />
        <Button type="submit" inverse disabled = {!formState.isValid}>
          add place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
