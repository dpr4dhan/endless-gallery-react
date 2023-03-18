import React, {useEffect, useState} from "react";
import "./assets/css/tailwind.css";
import {BrowserRouter as Router, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import routes from "./utils/routes/index";
import Header from "./components/Header";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import firebaseApp from "./config/firebase";
import AppContext from "./context/AppContext";
import AuthRoute from "./utils/routes/AuthRoute";
import GuestRoute from "./utils/routes/GuestRoute";
import Loading from "./components/Loading";
import NotFound from "./page/404";
import {AnimatePresence, motion} from 'framer-motion';
import RouteWrapper from "./utils/routes/RouterWrapper";

function App(){
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth(firebaseApp);

    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            } else {
                setIsLoggedIn(false);
                setUser({});
            }
            setIsLoading(false);
        });
    }, []);

    if(isLoading)
        return <Loading/>

    return (
        <Router>
            <AppContext.Provider value={[isLoggedIn, user]}>
                <Header/>
                <Routes>
                    {
                        routes.map((route, index) => {
                            if(route.protected === 'guest'){
                                return <Route element={<RouteWrapper ><GuestRoute element={route.component}/></RouteWrapper>} path={route.path}  key={index}/>;
                            }else if(route.protected === 'auth'){
                                return (
                                    <Route element={<RouteWrapper><AuthRoute element={route.component}/></RouteWrapper>} path={route.path}  key={index}/>
                                )
                            }else{
                                return <Route element={<RouteWrapper>{route.component}</RouteWrapper>} path={route.path}  key={index}/>
                            }
                        })
                    }
                    <Route path="*" element={<NotFound/>} ></Route>
                </Routes>
            </AppContext.Provider>
        </Router>
    );
}

export default  App;