import axios from "axios";
import { useState } from "react";
import {UserRoles} from "./../constants/UserRoles"
import Swal from "sweetalert2";

const UserRegistrationForm = () => {

    const [passwordMatch, setPasswordMatch] = useState(false);

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        setPasswordMatch(false);

 if(event.target.password.value===event.target.confirmpassword.value){

    const payload= {
        name: event.target.name.value,
        mobile: event.target.mobile.value,
        email: event.target.email.value,
        password: event.target.password.value,
        role: event.target.role.value,
    }

    axios.post('/user/save', payload)
    .then(data => {

      document.getElementById("reg-form").reset()
      
      Toast.fire({
        icon: "success",
        title: "User Registration Success"
      });
    })
    .catch(err => {
      
      Toast.fire({
        icon: "error",
        title: "Unexpected error occured"
      });
    })
 }else{
    setPasswordMatch(true)
 }
    } 

    

    return (
        <>
        <div class="container">
        
        <row>
            <div className="offset-3 col-6">
            {passwordMatch && (<div class="alert alert-warning alert-dismissible fade show" role="alert">
               <strong>Passwords do not match..!</strong> Please check the password again
               <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>)}
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
                    <h3 className="text-center">User Registration Form</h3>
                <form id="reg-form" onSubmit={handleSubmit}>
                    <label for="name"><b>Name:</b></label>
                    <input className="form-control" type="text" placeholder="" name="name" required /><br/>

                    <label for="mobile"><b>Mobile:</b></label>
                    <input className="form-control" type="text" placeholder="" name="mobile" required /><br />

                    <label for="email"><b>Email:</b></label>
                    <input className="form-control" type="text" placeholder="" name="email" required /><br />
                    
                    <label for="password"><b>Password:</b></label>
                    <input className="form-control" type="password" placeholder="" name="password" required /><br />

                    <label for="confirmpassword"><b>Confirm Password:</b></label>
                    <input className="form-control" type="password" placeholder="" name="confirmpassword" required /><br />

                    <label>Select Role : </label>
                  <select name='role' className='form-control'>
                    <option value={UserRoles.DOCTOR}>Doctor</option>
                    <option value={UserRoles.TECHNICIAN}>Lab Technician</option>
                  </select>

                    <button className="btn btn-primary mt-4" type="submit"><b>Register</b></button>


                
                </form>
                </div>
            </div>
        </row>
        </div>
        
        
        
        </>

    )
}
export default UserRegistrationForm;