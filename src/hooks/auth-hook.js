import React, { useState, useEffect, useCallback, useContext } from "react";

import {AuthContext} from '../context/auth-context.js';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [expiration, setExpiration] = useState(null);
  const authContext = useContext(AuthContext);

  const loginHandler = useCallback((id, jwtToken, storedExpiration) => {
    setToken(jwtToken);
    setUserId(id);

    const expiration =
      storedExpiration ||
      new Date(new Date().getTime() + 100 * 60 * 60).toISOString();
    setExpiration(expiration);

    localStorage.setItem(
      "user",
      JSON.stringify({ id: id, token: jwtToken, expiration: expiration })
    );
  }, []);

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserId(null);
    setExpiration(null);
    localStorage.remove("user");
  }, []);

  useEffect(() => {
    let logoutTimer;
    if (token && expiration) {
      const remainingTime =
        new Date(expiration).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logoutHandler, expiration]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (
      data &&
      data.token &&
      data.id &&
      new Date(data.expiration) > new Date()
    ) {
      loginHandler(data.id, data.token, data.expiration);
    }
  }, []);

  return { loginHandler, logoutHandler, token, userId};
};
