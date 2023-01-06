import React, { useContext } from 'react'
import { Navigate, Route } from 'react-router';
import { UserContext } from '../App';
import Login from './Login';
type Props = {
    children:JSX.Element;
}

const ProtectedRoute = ({children}:Props) => {
    const currentUser:any = useContext(UserContext);
    if(!currentUser.user) return <Navigate to='/login' replace/>
    return children;
}

export default ProtectedRoute