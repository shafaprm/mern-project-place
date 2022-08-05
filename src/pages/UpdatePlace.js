import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../components/shared/utils/validators.js";
import Input from "../components/shared/form/Input.js";
import Button from "../components/shared/form/Button.js";
import { AuthContext } from "../context/auth-context.js";
import { useForm } from "../hooks/form-hook.js";
import Card from "../components/shared/UI/Card.js";
import { useHttp } from "../hooks/http-hook.js";
import LoadingSpinner from "../components/shared/UI/LoadingSpinner.js";
import ErrorModal from "../components/shared/UI/ErrorModal.js";
import styles from "./UpdatePlace.module.css";

const UpdatePlace = () => {
  const { isLoading, errorMessage, sendRequest, resetError } = useHttp();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const authContext = useContext(AuthContext);

  const placeId = params.place_id;

  const [formState, inputHandler, setFormValue] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    (async () => {
      try {
        const data = await sendRequest(
          `https://mern-place-api.herokuapp.com/${placeId}`
        );
        setPlace(data.place);

        setFormValue(
          {
            title: {
              value: data.place.title,
              isValid: true,
            },
            address: {
              value: data.place.address,
              isValid: true,
            },
            description: {
              value: data.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.log(err);
      }
    })();
  }, [placeId, sendRequest, setFormValue]);

  if (!place || place.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place</h2>
        </Card>
      </div>
    );
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = await sendRequest(
        `https://mern-place-api.herokuapp.com/${placeId}`,
        "PUT",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address : formState.inputs.address.value,
        }),
        {'Content-Type' : 'application/json', 'Authorization' : `bearer ${authContext.token}`},
      );

      const userId = authContext.userId;
      navigate(`/places/user/${userId}`, { replace : true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <ErrorModal error={errorMessage} onClear={resetError} />
      <form className={styles["place-form"]} onSubmit={submitHandler}>
        <Input
          element="input"
          type="text"
          id="title"
          label="title"
          errorMessage="please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          value={formState.inputs.title.value}
          onInput={inputHandler}
          isValid={formState.inputs.title.isValid}
        />
        <Input
          element="input"
          type="text"
          id="address"
          label="address"
          errorMessage="please enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          value={formState.inputs.address.value}
          onInput={inputHandler}
          isValid={formState.inputs.address.isValid}
        />
        <Input
          id="description"
          label="description"
          errorMessage="please enter a valid description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          value={formState.inputs.description.value}
          onInput={inputHandler}
          isValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          edit place
        </Button>
      </form>
    </React.Fragment>
  );
};

export default UpdatePlace;
