import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PatientDashboard  from './components/patients/PatientDashboard' ;
import { PatientRoute } from './components/Routes/PatientRoute';
import BookApointment from './components/patients/BookApointment';
import ScheduleApointment from './components/patients/ScheduleApointment';
import MyApointments from './components/patients/MyApointments';
import Profile from './components/patients/Profile';
import Navigation from './components/Navigation';
import { DoctorRoute } from './components/Routes/DoctorRoute';
import DoctorDashboard from './components/Doctors/DoctorDashboard';
import AcceptedApointments from './components/Doctors/AcceptedApointments';
import PendingApointments from './components/Doctors/PendingApointments';
import Report from './components/Doctors/Report';
import OpenReport from './components/patients/OpenReport';
import { AdminRoute } from './components/Routes/AdminRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddDoctor from './components/Admin/AddDoctor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path = '/' component={Login} />
          <Route exact path = '/register' component={Register} />
          <Route exact path = '/Navigation' component={Navigation} />
          <PatientRoute exact path = '/patients/dashboard' component={PatientDashboard} role={localStorage.getItem("role")}/>
          <PatientRoute exact path = '/patients/bookApointment' component={BookApointment} role={localStorage.getItem("role")}/>
          <PatientRoute exact path = '/patients/scheduleApointment' component={ScheduleApointment} role={localStorage.getItem("role")}/>
          <PatientRoute exact path = '/patients/MyApointments' component={MyApointments} role={localStorage.getItem("role")}/>
          <PatientRoute exact path = '/patients/Profile' component={Profile} role={localStorage.getItem("role")}/>
          <PatientRoute exact path = '/patients/report' component={OpenReport} role={localStorage.getItem("role")}/>

          <DoctorRoute exact path = '/doctor/dashboard' component={DoctorDashboard} role={localStorage.getItem("role")} />
          <DoctorRoute exact path = '/doctor/acceptedApointments' component={AcceptedApointments} role={localStorage.getItem("role")} />
          <DoctorRoute exact path = '/doctor/pendingApointments' component={PendingApointments} role={localStorage.getItem("role")} />
          <DoctorRoute exact path = '/doctor/report' component={Report} role={localStorage.getItem("role")} />

          <AdminRoute exact path = '/admin/dashboard' component={AdminDashboard} role={localStorage.getItem("role")} />
          <AdminRoute exact path = '/admin/addDoctor' component={AddDoctor} role={localStorage.getItem("role")} />

          <Route>{'404 incorrect url'}</Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
