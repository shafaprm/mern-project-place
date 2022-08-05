import React from "react";
import { Link } from "react-router-dom";

import styles from "./UserItem.module.css";
import Avatar from "../shared/UI/Avatar.js";
import Card from "../shared/UI/Card.js";

const UserItem = (props) => {
  return (
    <li className={styles["user-item"]}>
      <Card className = {styles['user-item__content']}>
        <Link to={`/places/user/${props.id}`}>
          <div className={styles["user-item__image"]}>
            <Avatar image={`http://localhost5000/${props.image}`} alt={props.name} />
          </div>
          <div className={styles["user-item__info"]}>
            <h2>{props.name}</h2>
            <h3>
              {`${props.places} ${props.places === 1 ? 'place' : 'places'}`}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
