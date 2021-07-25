import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { ROLE } from '../constants/Role';

export const PatientRoute = ({component:Component, role, ...rest})=>(
    <Route {...rest} render ={ (props)=>{
        if(role==ROLE.Patient)
        return <Component {...props} />
    }
    }/>
)
