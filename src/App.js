import { useContext, useEffect, useState } from "react";
import parient from "./components/patient";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import PaymentForm from "./components/PaymentForm";
import AppointmentForm from "./components/AppointmentForm";
import UpdatePatientDetails from "./components/UpdatePatientDetails";
import UploadTestReport from "./components/UploadTestReport";
import UpdateTestReport from "./components/UpdateTestReport";
import UserRegistrationForm from "./components/UserRegistrationForm";
import { UserRoles } from "./constants/UserRoles";
import { AuthContext } from "./contexts/AuthContext";
import TestReportDetails from "./components/TestReportDetails";
import NavBar from "./components/NavBar";


function App() {


const [isLogin, setIsLogin] = useState(false);
const [userData, setUserData] = useState({id: null, name: null, mobile: null, email: null, role: null});

const getNavs = (role) => {
  switch(role){
    case UserRoles.DOCTOR:
      return [
          {
            name: 'Appointments',
            link: '/'
          },
          {
            name: 'User Registration',
            link: '/user-registration-form'
          }
      ]

      case UserRoles.TECHNICIAN:
        return [
          {
            name: 'Upload Reports',
            link: '/'
          }
        ]

        default:
          return [
            {
              name: 'Patient Registration',
              link: '/patient'
            },
            {
              name: 'Payment',
              link: '/payment'
            },
            {
              name: 'Check Reports',
              link: '/check-reports'
            },
          ]
  }
}

  axios.defaults.baseURL = 'http://localhost:8080/api/v1';

  const getRoutes = (role) => {
    switch (role) {
      case UserRoles.DOCTOR:
        return (
          <>
            <Route path="/" Component={AppointmentForm}/>
            <Route path="/updatePatientDetails" Component={UpdatePatientDetails}/>
            <Route path="/user-registration-form" Component={UserRegistrationForm}/>
          </>
        )
      case UserRoles.TECHNICIAN:
        return (
          <>
            <Route path="/" Component={UploadTestReport}/>
          </>
        )

      default:
        return (
          <>
            <Route path="/" Component={Login}/>
            <Route path="/patient" Component={parient}/>
            <Route path="/payment" Component={PaymentForm}/>
            <Route path="/check-reports" Component={TestReportDetails}/>
          </>
        )
    }
  }
  

  return (
    <div>
      <AuthContext.Provider value={{isLogin, userData, setUserData, setIsLogin}}>
      <NavBar navLinks={getNavs(userData.role)} isLoginProp={isLogin}/>
      <Routes>
      {getRoutes(userData?.role)}
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
