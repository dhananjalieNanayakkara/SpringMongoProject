import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const NavBar = ({navLinks, isLoginProp}) => {

    const {isLogin, userData, setUserData, setIsLogin} = useContext(AuthContext);
    
    const navigate = useNavigate();

    const handleLogout = () => {
        setUserData({id: null, name: null, mobile: null, email: null, role: null});
        setIsLogin(false);
        navigate('/');
    }

 return (
    <>
        <nav className="navbar bg-body-tertiary">
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1 ">ABC LAB</span>
    <ul className="list-inline">
        {
            navLinks.length > 0 && navLinks?.map(navObj => {
                return (
                    <>
                        <li className="list-inline-item me-4 mt-2">
                            <Link to={navObj.link} className="nav-link">{navObj.name}</Link>
                        </li>
                    </>
                )
            })
        }
        { !isLoginProp && <li className="list-inline-item me-4 mt-2">
                        <button onClick={()=>{navigate('/')}} className="btn btn-primary">Login</button>
                        </li>}
        { isLoginProp && <li className="list-inline-item me-4 mt-2">
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </li>}
    </ul>
    
  </div>
</nav>
    </>
 )
}

export default NavBar;