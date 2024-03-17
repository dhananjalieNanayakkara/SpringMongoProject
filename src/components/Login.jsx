import axios from "axios";
import { useContext } from "react";
import {AuthContext} from "./../contexts/AuthContext"
import { typeImplementation } from "@testing-library/user-event/dist/type/typeImplementation";

const Login = () => {

    const auth = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(JSON.stringify(event.target.email.value).trim() && JSON.stringify(event.target.psw.value).trim()){
            axios.post('/auth/login', {email: event.target.email.value, password: event.target.psw.value})
            .then(data => {
                auth.setIsLogin(true)
                auth.setUserData({id: data.data._id, name: data.data?.name, email: data.data?.email, mobile: data.data?.mobile, role: data.data?.role})
            })
            .catch(err => {
                console.log('[error]', err);
            })
        }else{
            //do something when one of both credentials are empty
        }
    }

    return (
     <><div class="container">
        
        <row>
            <div className="offset-4 col-4">
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
                    <h3 className="text-center">Login Form</h3>
                <form onSubmit={handleSubmit}>
                    <label for="uname"><b>Email:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Username" name="email" required /><br />

                    <label for="psw"><b>Password:</b></label>
                    <input className="form-control" type="password" placeholder="Enter Password" name="psw" required />

                    <button class="btn btn-primary mt-4" type="submit">Submit</button><br />
                    <label>
                        <input type="checkbox" checked="checked" name="remember" /> Remember me</label><br />

                    <button class="btn btn-primary mt-4" type="button" >Cancel</button><br />
                    <span class="psw">Forgot <a href="#">password?</a></span>
                </form>
                </div>
            </div>
        </row>
        </div>
        </>

        
    )
}

export default Login;