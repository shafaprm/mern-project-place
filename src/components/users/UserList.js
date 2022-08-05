import React from "react";

import UserItem from "./UserItem.js";
import styles from "./UserList.module.css";
import Card from "../shared/UI/Card.js";

const UserList = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  const userList = props.users.map((user) => (
    <UserItem
      key={user._id}
      id={user._id}
      image={user.image}
      name={user.name}
      places={user.places.length}
    />
  ));

  return <ul className={styles["user-list"]}>{userList}</ul>;
};

export default UserList;
