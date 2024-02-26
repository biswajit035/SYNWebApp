import React from 'react'
import '../Dashboard/Updatedash.css'
// import { FaUser } from "react-icons/fa6";
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";



const Dropdown = () => {
    let navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token')
        navigate("/login");
    }
    return (

                <div class="dropdown">
                    {/* <button class="btn btn-secondary dropdown-toggle" style={{ backgroundColor: "white", color: "black", border: "none" }} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={()=>{navigate("/")}}>My Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={()=>{navigate("update")}}>Update Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
                    </ul> */}
                    <div className='dashItems-2'>
                    <Link className={`indiVal ${window.location.pathname ==='/' ? "dashActive" :""}`} to="/">Profile</Link>
                    <Link className={`indiVal ${window.location.pathname ==='/update' ? "dashActive" :""}`} to="/update">Update profile</Link>
                    <span onClick={handleLogout}>Logout</span>
                </div>
                </div>
           
    )
}

export default Dropdown