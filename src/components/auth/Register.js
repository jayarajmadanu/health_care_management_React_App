import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { Redirect } from 'react-router';
import {ROLE} from '../constants/Role';
import axios from 'axios'
import { BASE_URL, REGISTER_URL } from '../constants/url';

export default class Register extends Component {

    constructor(props){
        super(props);
        this.state ={
            firstName:"",
            lastName:"",
            gender:"male",
            email:"",
            password:"",
            loggedIn:false,
            error:"",
            role:'patient'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();
        axios.post(BASE_URL + REGISTER_URL,{
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            gender:this.state.gender
        }).then(response =>{
            localStorage.setItem("userId", response.data.id)
            localStorage.setItem("role",response.data.role);
            this.setState({loggedIn:true})
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })
        
    }
    validate(){
        return this.state.email.length>0 && this.state.password.length > 0 && this.state.firstName.length>0 && this.state.lastName.length>0 ;
    }

    render() {
        if(this.state.loggedIn )
        {
            if(this.state.role=='patient')
            return (<Redirect to="/patients/dashboard" />)
        }
        return (
            <div>
                 <Navbar bg="dark" variant="dark" >
                    <Container>
                    <Navbar.Brand >J-Hosp</Navbar.Brand>
                    <p>
                    <Nav className="me-auto" >
                        <Nav.Link href="/" >Login</Nav.Link>
                    </Nav>
                    </p>
                    </Container>
                </Navbar>
                
                    {this.state.error && <div>{this.state.error}</div>}
                
                <div style = {{paddingTop:'20px'}}>
                    <h3><b>Sign Up</b></h3>
                </div>

                <Paper elevation={3} style = {{height:'40%', width:'25%', display:'inline-flex' ,marginTop:'30px',backgroundColor:'#4d4d4d'}}>
                    <Form style = {{padding:'20px',  margin:'auto', color:'white'}} onSubmit = {this.handleSubmit} >

                    <Form.Group className="mb-3" controlId="firstName">
                            <b><Form.Label>First Name</Form.Label></b>
                            <Form.Control type="text" 
                                placeholder="Enter First Name"  
                                name="firstName" 
                                autoFocus 
                                onChange = {(event)=>
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                onSubmit = {(event)=> {event.preventDefault();}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lastName">
                            <b><Form.Label>Last Name</Form.Label></b>
                            <Form.Control type="text" 
                                placeholder="Enter Last Name"  
                                name="lastName" 
                                onChange = {(event)=>
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                onSubmit = {(event)=> {event.preventDefault();}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lastName">
                            <b><Form.Label>Gender</Form.Label></b>
                            <br/>
                            <Select native  
                                name="gender" 
                                variant="outlined" 
                                style={{backgroundColor:'white',width:'100%'}} 
                                onChange = {(event)=>
                                    this.setState({
                                    [event.target.name]: event.target.value
                                    })}
                                onSubmit = {(event)=> {event.preventDefault();}}
                                >
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </Select>
                            
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <b><Form.Label>Email address</Form.Label></b>
                            <Form.Control type="email" 
                                placeholder="Enter email"  
                                name="email" 
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
                        <div style = {{marginTop:'10px'}} >
                        Already have account? | <span><a href = '/'>login here</a></span>
                    </div>
                    </Form>
                    
                </Paper>

            </div>
        )
    }
}
