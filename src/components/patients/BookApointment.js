import React, { useEffect, useState } from 'react'
import { Select, FormControl,InputLabel, MenuItem } from '@material-ui/core';
import { Navbar, Nav, Container,Form, Button, Card } from 'react-bootstrap';
import { Redirect } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';


import { BASE_URL, SPECIFICATIONS_URL, GET_DOCTORS_URL } from '../constants/url';

export default function BookApointment(props) {

    const [user, setuser] = useState({
        isLoggedIn:localStorage.getItem("userId")!=null,
        role:localStorage.getItem("role")
    })

    const [specification, setspecification] = useState('*');
    
    const [specifications, setspecifications] = useState([]);

    useEffect(() => {
       axios.get(BASE_URL + SPECIFICATIONS_URL)
       .then(res=>{
        setspecifications(res.data.specifications)
           console.log(specifications)
       }
       )
       .catch()
    }, [])

    const [doctors, setdoctors] = useState([]);

    useEffect(() => {
        axios.post(BASE_URL + GET_DOCTORS_URL,{
            specification:specification
        })
        .then(res=>{
            setdoctors(res.data.doctors)
            console.log(res.data.doctors)
        })
        .catch(err=>{

        })
        
    }, [specification])

    const logout =()=>{
        setuser({isLoggedIn:false,role:'none'})
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };
    
    if(!user.isLoggedIn)
        return (<Redirect to="/" />);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >J-Hosp</Navbar.Brand>
                    <div className='menu'>
                        <Button variant="outline-primary" className='menuButton' onClick={handleOpen}>
                            <MenuIcon/>
                        </Button>
                        <FormControl >
                            <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            hidden={!open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <a href = '/patients/Profile' style={{textDecoration:'none'}}><MenuItem >Profile</MenuItem></a>
                            <MenuItem  onClick={logout}>Logout</MenuItem>
                            
                            </Select>
                        </FormControl>
                    </div>
                </Container>
            </Navbar>
            <div style={{display:'flex',margin:'auto'}}>
                <span style={{margin:'2%'}}><i>Search Doctors by Specification</i></span>
                <FormControl style={{float:'left', marginLeft:'5%', marginTop:'1%'}}>
                    <InputLabel id="demo-mutiple-name-label">specifications</InputLabel>
                    <Select 
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        value={specification}
                        onChange={(e)=>setspecification(e.target.value)}>
                            <option value='*' >All</option>
                        {
                            specifications.map((s,key)=>{
                                return(
                                    <option value={s} key={key}>{s}</option>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            <div style={{marginTop:'10px'}}>
                {
                    doctors.map((doc,key)=>{
                        return(
                        <Card key={key} style={{width:'80%', height:'20%', margin:'auto',marginTop:'10px',boxShadow: '10px 10px 5px grey'}}>
                            <Card.Header style={{backgroundColor:'#00284d', color:'white'}}>{doc.firstName+" "+doc.lastName}</Card.Header>
                            <Card.Body>
                                <Card.Title>{doc.specification}</Card.Title>
                                <Card.Text>
                                <p>{doc.description}</p>
                                <p>Gender  :   {doc.gender}</p>
                                <p>Email  :   {doc.email}</p>
                                <p>Hospital  :   {doc.hospital}</p>
                                </Card.Text>
                                {/*<div style={{width:'200px', margin:'auto', display:'flex'}}>
                                <DatePicker
                                    value={date}
                                    dateFormat='DD-MM-yyyy'
                                    timeFormat={false}
                                    timeConstraints={timeConstraint}
                                    onChange={val=>{
                                        setdate(val);
                                        getValidDatesForDoctor(doc.id,val);
                                    }}
                                    isValidDate={validateDate}
                                />
                                <Select style={{marginLeft:'5px'}}>
                                    <option>a</option>
                                    <option>a</option>
                                    <option>a</option>
                                </Select>
                                </div>*/}
                                <a href={"/patients/scheduleApointment?docId="+doc.id}><Button>Schedule Apointment</Button></a>
                            </Card.Body>
                        </Card>
                        )
                    })
                }
                
            </div>
        </div>
    )
}
