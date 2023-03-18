import React, {useContext} from 'react';
import AppContext from "../../context/AppContext";
import {Navigate, Route} from "react-router-dom";

export default function GuestRoute({element, ...props}){
    const [isLoggedIn] = useContext(AppContext);

    return !isLoggedIn  ?  element : (<Navigate to="/" replace/>)
}