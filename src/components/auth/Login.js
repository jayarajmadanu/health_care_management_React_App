import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import { Redirect } from 'react-router';
import axios from 'axios';
import {ROLE} from '../constants/Role';
import { BASE_URL, LOGIN_URL } from '../constants/url';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            email:"",
            password:"",
            loggedIn:false,
            error:"",
            role:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        axios.post(BASE_URL + LOGIN_URL,
            {
                email:this.state.email,
                password: this.state.password
        })
        .then(response =>{
            localStorage.setItem("userId", response.data.user.id);
            localStorage.setItem("role", response.data.user.role);
            this.setState({role:response.data.user.role})
            this.setState({loggedIn:true});
            console.log(this.state.role)
        })
        .catch(err =>{
            console.log(err);
            this.setState({error:"enter valid email and password"})
        })
        
    }
    validate(){
        return this.state.email.length>0 && this.state.password.length > 0;
    }

    render() {
        if(this.state.loggedIn )
        {
            if(this.state.role==ROLE.Patient)
            return (<Redirect to={{
                pathname:"/patients/dashboard",
                state:{
                    isLoggedIn:true,
                    role:this.state.role
                }
            }} />);
            else if(this.state.role==ROLE.Doctor)
            return (<Redirect to={{
                pathname:"/doctor/dashboard",
                state:{
                    isLoggedIn:true,
                    role:this.state.role
                }
            }} />)
            else if(this.state.role==ROLE.Admin)
            return (<Redirect to={{
                pathname:"/admin/dashboard",
                state:{
                    isLoggedIn:true,
                    role:this.state.role
                }
            }} />)
        }
        else
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand >J-Hosp</Navbar.Brand>
                    <p>
                    <Nav className="me-auto" >
                        <Nav.Link href="/register" >Sign up</Nav.Link>
                    </Nav>
                    </p>
                    </Container>
                </Navbar>
                {this.state.error && <div> {this.state.error} </div>}
                <div style = {{paddingTop:'40px'}}>
                    <h3><b>Login</b></h3>
                </div>
                <Paper elevation={3} style = {{height:'40%', width:'25%', display:'inline-flex' ,marginTop:'50px',backgroundColor:'#4d4d4d'}}>
                    <Form style = {{padding:'20px',  margin:'auto', color:'white'}} onSubmit = {this.handleSubmit} >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <b><Form.Label>Email address</Form.Label></b>
                            <Form.Control type="email" 
                                placeholder="Enter email"  
                                name="email" 
                                autoFocus 
                                onChange = {(event)=>
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                onSubmit = {(event)=> {event.preventDefault();}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <b><Form.Label>Password</Form.Label></b>
                            <Form.Control type="password" 
                                placeholder="Password" 
                                name="password" 
                                onChange = {(event)=>{
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                }
                             />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={!this.validate()}>
                            Submit
                        </Button>
                        <div style = {{marginTop:'10px'}}>
                            Don't have account? | <span><a href = '/register'>register here</a></span>
                        </div>
                    </Form>
                </Paper>

            </div>
        )
    }
}
