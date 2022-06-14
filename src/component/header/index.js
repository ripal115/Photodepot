import React, { useState } from "react";
import "./header.scss";
import ChatIcon from '../../assets/icons/chat-icon.svg';
import HeartIcon from '../../assets/icons/heart-icon.svg';
import NotificationIcon from '../../assets/icons/notification.svg';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "../../helpers/Auth";
import { useHistory } from "react-router-dom";

export default function Header() {

  const history = useHistory()

  const handleLogout = async () => {
    localStorage.removeItem("userinfo")
    localStorage.removeItem("token")
    toast.success("logout successfully")
    // setTimeout(() => {
       history.push("/")
      // window.location.reload()
    // },2000)
  };

  const handleLogin = () => {
    history.push("/login")
  }

  const userInfo = localStorage.getItem("userinfo")

  const [ profileDropdown , setProfileDropdown ] = useState(false);
  
  return (
    <div>
      <header>
        <ToastContainer />
        <div className="container">
          <div className="header-alignment">
            <div className="logo">
              <h1>
                Photo <span>depot</span>
              </h1>
            </div>
            <div className="menu">
                <img src={ChatIcon} alt="ChatIcon"/>
                <img src={HeartIcon} alt="HeartIcon"/>
                <img src={NotificationIcon} alt="NotificationIcon"/>
                <span>Orders</span>
                <div className="relative-profile">
                    <div className="profile-show" onClick={()=> setProfileDropdown(!profileDropdown)}>M</div>
                    <div className={profileDropdown ? "profile-dropdown profile-dropdown-show" : "profile-dropdown profile-dropdown-hidden"}>
                      <div className="profile-submenu-alignment">
                        <a>Profile</a>
                        <a>Dashboard</a>
                        <a>Job History</a>
                        <a>My job</a>
                        <a>Setting</a>
                        {
                        userInfo ? <a onClick={() => handleLogout()}>Logout</a> : <a onClick={() => handleLogin()}>Login</a>
                        }
                        
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
