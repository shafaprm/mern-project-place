import React from "react";

import Card from "../shared/UI/Card.js";
import Button from '../shared/form/Button.js';
import PlaceItem from "./PlaceItem.js";
import styles from "./PlaceList.module.css";

const PlaceList = (props) => {
  if (props.places.length === 0) {
    return (
      <div className={`${styles["place-list"]} center`}>
        <Card>
          <h2>No place found</h2>
          <Button to = '/places/new'>Add place</Button>
        </Card>
      </div>
    );
  }

  const placeList = props.places.map((place) => (
    <PlaceItem
      key={place._id}
      id={place._id}
      image={place.image}
      title={place.title}
      description={place.description}
      address={place.address}
      user = {place.user}
      coordinates = {place.coordinates}
      onDelete = {props.onDelete}
    />
  ));

  return (
    <ul className = {styles['place-list']}>{placeList}</ul>
  )
};

export default PlaceList;
