import Home from "../../page/Home";
import Login from "../../page/Login";
import Gallery from "../../page/Gallery";
import Signup from "../../page/Signup";

export default  [
    {
        path: '/',
        component: <Home/>,
        protected: "none"
    },
    {
        path: '/login',
        component: <Login/>,
        protected: "guest"
    },
    {
        path: '/signup',
        component: <Signup/>,
        protected: "guest"
    },
    {
        path: '/gallery',
        component: <Gallery/>,
        protected: "auth"
    }
]