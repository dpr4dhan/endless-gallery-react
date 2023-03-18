import React, {useContext} from 'react';
import { NavLink, useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import firebaseApp from "../config/firebase";
import AppContext from "../context/AppContext";

export default function Header(){
    const [isLoggedIn, user] = useContext(AppContext);
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();


    function logout(){
       signOut(auth).then(() => {
            // Sign-out successful.
           return navigate('/login', {replace: true})
        }).catch((error) => {
            // An error happened.
           console.log(error);
        });
    }

    return (
        <nav className="py-5 bg-gray-900 text-white justify-between flex">
            <ul className="flex justify-between px-10">
                <li className="mr-5">
                    <NavLink to="/" end className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "underline text-blue-200" : ""
                    }>
                        Home
                    </NavLink>
                </li>
                <li className="mr-5">
                    <NavLink to="/gallery" className={({ isActive, isPending }) =>
                        isPending ? "" : isActive ? "underline text-blue-200" : ""
                    }>Gallery</NavLink>
                </li>
            </ul>
            <ul className="flex justify-between px-10">
                <li className="ml-5">
                    {isLoggedIn
                        ? (<button onClick={logout}>Logout</button>)
                        : (<NavLink to="/login" className={({ isActive, isPending }) =>
                            isPending ? "" : isActive ? "underline text-blue-200" : ""
                        }>Login</NavLink>)
                    }
                </li>
                { !isLoggedIn && (
                    <li className="ml-5">
                        <NavLink to="/signup" className={({ isActive, isPending }) =>
                                isPending ? "" : isActive ? "underline text-blue-200" : ""
                            }>SignUp</NavLink>
                    </li>
                )}

            </ul>
        </nav>
    );
}