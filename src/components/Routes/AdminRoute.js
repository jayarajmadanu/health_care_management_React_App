import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { ROLE } from '../constants/Role';


export const AdminRoute = ({component:Component, role, ...rest})=>(
    <Route {...rest} render ={ (props)=>{
        if(role==ROLE.Admin)
        return <Component {...props} />
        else return (<Redirect to="/" />);
    }
    }/>
)
