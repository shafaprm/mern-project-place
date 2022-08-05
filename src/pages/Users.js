import React, { useEffect, useState } from "react";

import UserList from "../components/users/UserList.js";
import LoadingSpinner from "../components/shared/UI/LoadingSpinner.js";
import ErrorModal from "../components/shared/UI/ErrorModal.js";
import { useHttp } from '../hooks/http-hook.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const {isLoading, errorMessage, sendRequest, resetError} = useHttp();

  useEffect(() => {
    (async () => {
      try {
        const data = await sendRequest('http://localhost:5000/api/users');

        setUsers(data.users);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error = {errorMessage} onClear = {resetError} />
      {isLoading && <div className = "center"><LoadingSpinner overlay /></div>}
      <UserList users={users} />
    </React.Fragment>
  )
};

export default Users;
