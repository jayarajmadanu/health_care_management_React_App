import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container,Form, Button } from 'react-bootstrap';
import MenuIcon from '@material-ui/icons/Menu';
import { Select, FormControl,InputLabel, MenuItem } from '@material-ui/core';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import { BASE_URL, GET_USER_BY_ID, GET_TIMESLOTS, SCHEDULE_APOINTMENT } from '../constants/url';


export default function ScheduleApointment(props) {

    const query = new URLSearchParams(props.location.search);
    const docId = query.get("docId");

    const [user, setuser] = useState({
        isLoggedIn: localStorage.getItem("userId")!=null,
        role: localStorage.getItem("role"),
        userId: localStorage.getItem("userId")
    });

    const [userDetails, setuserDetails] = useState('')

    useEffect(() => {
        axios.post(BASE_URL + GET_USER_BY_ID,{
            userId: user.userId
        })
        .then(res=>{
            setuserDetails({
                firstName: res.data.user.firstName,
                lastName: res.data.user.lastName,
                gender: res.data.user.gender
            })
        })
        .catch()
    }, [])

    const validateSubmit = ()=>{
        return date=='select Date' || date=='' || time == 'select Time' || time=='';
    }

    const [date, setdate] = useState('select Date');
    const [time, settime] = useState('select Time')
    const [description, setdescription] = useState('')
    const timeSlots = ['10-11 AM','11-12 AM', '01-02 PM','02-03 PM', '03-04 PM'];
    const [availableTimeSlots, setAvailableTimeSlots] = useState([])

    useEffect(() => {
        axios.post(BASE_URL+ GET_TIMESLOTS,{
            doc_id: docId,
            Booking_date: date
        })
        .then(res=>{
            var ar1 = timeSlots;
            var ar2 = ar1.filter(function(ele){ 
                return !res.data.timeSlots.includes(ele)
            });
            console.log(res.data.timeSlots)
            setAvailableTimeSlots(ar2);
            console.log(ar2)
        })
        .catch()
    }, [date])

    const timeConstraint ={
        hours:{
            min:10,
            max:16,
        }
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        axios.post(BASE_URL+ SCHEDULE_APOINTMENT,{
            userId: user.userId,
            doc_id: docId,
            description: description,
            date: date,
            time:time
        })
        .then(res=>{
            props.history.push('/patients/bookApointment');
        })
        .catch()
    }

    
    const validateDate =(current)=>{
        const yesterday = moment().subtract(1, 'day');
        const future_7_days = moment().add(7,'day');
        return  current.isAfter(yesterday) && current.isBefore(future_7_days);
    }

    const logout =()=>{
        
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        setuser({isLoggedIn:false,role:'none'})
        
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

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
            <div>
               <h1> Schedule Your Apointment</h1>
            </div>
            <div style={{width:'60%', margin:'auto',marginTop:'20px', border:'1px solid gray',boxShadow:'5px 5px gray'}}>
                <Form style={{width:'80%', margin:'auto'}} onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><b>First Name</b></Form.Label>
                        <Form.Control type="text" value={userDetails.firstName} disabled={true}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Last Name</b></Form.Label>
                        <Form.Control type="text" value={userDetails.lastName} disabled={true}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label><b>Description</b></Form.Label>
                        <Form.Control type="text" autoFocus={true} value={description}onChange={e=>setdescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label><b>Gender</b></Form.Label>
                        <Form.Control type="text" value={userDetails.gender} disabled={true}/>
                    </Form.Group>

                    <div style={{width:'200px', margin:'auto', display:'flex'}}>
                                <DatePicker
                                    value={date}
                                    dateFormat='DD/MM/yyyy'
                                    timeFormat={false}
                                    timeConstraints={timeConstraint}
                                    onChange={val=>{

                                        setdate(new Intl.DateTimeFormat('en-US', {day: '2-digit', month: '2-digit',year: 'numeric'}).format(val));
                                    }}
                                    isValidDate={validateDate}
                                />
                                <Select style={{marginLeft:'5px'}} onChange={(event)=>settime(event.target.value)} >
                                    <option value=''>None</option>
                                    {
                                        availableTimeSlots.map((time,key)=>{
                                            return <option value={time} key={key}>{time}</option>
                                        })
                                    }
                                </Select>
                    </div>
                    <Button variant="primary" type="submit" style={{margin:'10px'}} disabled={validateSubmit()}>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}
