import React from 'react'
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../redux/store';

interface AuthCheckProps {
    children: React.ReactNode;
  }
  
  const AuthCheck: React.FC<AuthCheckProps> = ({ children }) => {
    const LoginData =  useAppSelector((state) => state?.authUser.loginData);

    if(LoginData === undefined)
    {
        return (
            <Navigate to={{ pathname:  "/login" }} />
        );
    }
    return <React.Fragment> {children}</React.Fragment>
}

export default AuthCheck