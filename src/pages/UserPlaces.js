import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/places/PlaceList.js";
import LoadingSpinner from '../components/shared/UI/LoadingSpinner.js';
import ErrorModal from '../components/shared/UI/ErrorModal.js';
import { useHttp } from '../hooks/http-hook.js';

const UserPlaces = () => {
  const params = useParams();
  const {isLoading, errorMessage, sendRequest, resetError} = useHttp();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      try{
        const userId = params.user_id;
        const data = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setPlaces(data.places)
      }catch(err){
        console.log(err)
      }
    })()
  }, [sendRequest])

  const deleteHandler = (deletedPlaceId) => {
    console.log('delete handler')
    setPlaces((prevPlaces) => prevPlaces.filter((place) => place.id !== deletedPlaceId))
  }

  return (
    <React.Fragment>
      {isLoading && <div className = "center"><LoadingSpinner asOverlay /></div>}
      <ErrorModal error = {errorMessage} onClear = {resetError} />
      <PlaceList places={places} onDelete = {deleteHandler}/>;
    </React.Fragment>
  )
};

export default UserPlaces;
