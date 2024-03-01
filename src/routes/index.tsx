import { Navigate } from "react-router-dom";

// Authentication
import Login from "../pages/Authentication/Login";

// Pages
import Lists from "../pages/Todo/Lists";


const publicRoutes = [
    { path: "/login", component: <Login /> },
]; 

const authProtectedRoutes = [
    { path: "/", component: <Lists /> },
    { path: "/", exact: true, component: <Navigate to="/" />},
]

export { publicRoutes, authProtectedRoutes };
