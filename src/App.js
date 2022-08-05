import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import loadable from '@loadable/component'

//components
import MainNavigation from "./components/shared/navigation/MainNavigation.js";
import { AuthProvider, AuthContext} from './context/auth-context.js';
import {useAuth} from './hooks/auth-hook.js'
import ProtectedRoute from './middlewares/ProtectedRoute.js';
import UnprotectedRoute from './middlewares/UnprotectedRoute.js';

//pages
const UserPlaces = loadable(() => import('./pages/UserPlaces.js'));
const Users = loadable(() => import('./pages/Users.js'));
const NewPlace = loadable(() => import('./pages/UpdatePlace.js'))
const UpdatePlace = loadable(() => import('./pages/UpdatePlace.js'));
const Auth = loadable(() => import('./pages/Auth.js'));



const App = () => {
  const { loginHandler, logoutHandler, token, userId} = useAuth()

  return (
    <AuthProvider value = {{isLoggedIn : !!token, token : token, loginHandler : loginHandler, logoutHandler : logoutHandler, userId : userId}}>
      <MainNavigation />
      <main>
        <Routes> 
          <Route path="/" element={<Users />} exact />
          <Route path = "/auth" element = {<UnprotectedRoute><Auth /></UnprotectedRoute>} />
          <Route path = "/places/new" element = {<ProtectedRoute><NewPlace /></ProtectedRoute>} exact/>
          <Route path = "/places/user/:user_id" element = {<UserPlaces />}/>
          <Route path = "/places/:place_id" element = {<ProtectedRoute><UpdatePlace /></ProtectedRoute>} />
          <Route path = "*" element = {<Navigate to = "/" />} />
        </Routes>
      </main>
    </AuthProvider>
  );
};

export default App;
