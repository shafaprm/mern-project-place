import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'

import {AuthContext } from '../context/auth-context.js';

const UnprotectedRoute = (props) => {
    const authContext = useContext(AuthContext);

    if(authContext.isLoggedIn){
        return <Navigate to = '/'/>
    }

    return props.children;
}

export default UnprotectedRoute;