import React, { useState, useContext } from "react";

import Card from "../shared/UI/Card.js";
import Button from "../shared/form/Button.js";
import Modal from "../shared/UI/Modal.js";
import Map from "../shared/UI/Map.js";
import styles from "./PlaceItem.module.css";
import LoadingSpinner from '../shared/UI/LoadingSpinner.js';
import ErrorModal from '../shared/UI/ErrorModal.js';
import {useHttp } from '../../hooks/http-hook.js';
import { AuthContext } from '../../context/auth-context.js';

const PlaceItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { isLoading, errorMessage, sendRequest, resetError} = useHttp();
  const authContext = useContext(AuthContext);

  const showMapHandler = () => {
    setShowMap((prevShowMap) => {
      return !prevShowMap;
    });
  };

  const showDeleteHandler = () => {
    setShowDelete((prevShowDelete) => {
      return !prevShowDelete
    })
  }

  const deleteHandler = async () => {
    try{
      const data = await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE', null, {'Authorization': `bearer ${authContext.token}`});

      props.onDelete(props.id);
    }catch(err){
      console.log(err);
    }
    showDeleteHandler()
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error = {errorMessage} onClear = {resetError} />
      <Modal
        show={showMap}
        onCancel={showMapHandler}
        header={props.address}
        headerClassName={styles["place-item__modal-content"]}
        footerClassName={styles["place-item__modal-actions"]}
        footer={<Button onClick={showMapHandler}>close</Button>}
      >
        <div className={styles["map-container"]}>
          <Map center={props.coordinates} zoom={1} />
        </div>
      </Modal>
      <Modal
        show = {showDelete}
        onCancel = {showDeleteHandler}
        header="delete proceed"
        footerClassName={styles["place-item__modal-actions"]}
        headerClassName={styles["place-item__modal-content"]}
        footer = {
          <React.Fragment>
            <Button inverse onClick = {showDeleteHandler}>cancel</Button>
            <Button danger onClick = {deleteHandler}>delete</Button>
          </React.Fragment>
        }
      >
        <p>are you sure you want to delete this post?</p>
      </Modal>
      <li className={styles["place-item"]}>
        <Card className={styles["place-item__content"]}>
          <div className={styles["place-item__image"]}>
            <img src={`http://localhost:5000/${props.image}`} alt={props.title} />
          </div>
          <div className={styles["place-item__info"]}>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className={styles["place-item__actions"]}>
            <Button inverse onClick={showMapHandler}>
              view
            </Button>
            {authContext.userId === props.user && 
              <React.Fragment>
                <Button to={`/places/${props.id}`}>edit</Button>
                <Button danger onClick = {showDeleteHandler}>delete</Button>
              </React.Fragment>
            }
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
