import React from 'react'
import { useSelector } from 'react-redux';
import {Redirect, Route} from 'react-router-dom';
const ProtectedRoute = ({ component: Component, ...restComponents }) => {
    const { loading, isAuthenticated, user } = useSelector(state => state.user);
  return (
    <>
        {
            !loading && (
            <Route 
            {...restComponents}
            render = {(props) => {
                if(isAuthenticated) {
                    return <Redirect to="/login" />
                }
                return <Component {...props}/>
            }}
            >
            </Route>
            )
        }
    </>
  )
}

export default ProtectedRoute