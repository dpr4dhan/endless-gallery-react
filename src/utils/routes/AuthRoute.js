import React, {useContext} from 'react';
import AppContext from "../../context/AppContext";
import {Navigate} from "react-router-dom";

export default function AuthRoute({element, ...props}){
    const [isLoggedIn] = useContext(AppContext);

    return isLoggedIn  ?  element : (<Navigate to="/login" replace/>)
}