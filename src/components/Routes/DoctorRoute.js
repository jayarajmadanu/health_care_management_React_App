import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { ROLE } from '../constants/Role';


export const DoctorRoute = ({component:Component, role, ...rest})=>(
    <Route {...rest} render ={ (props)=>{
        if(role==ROLE.Doctor)
        return <Component {...props} />
        else return (<Redirect to="/" />);
    }
    }/>
)
