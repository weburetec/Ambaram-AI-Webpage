import React from "react";
import "../Css_Files/header.scss";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { signOut } from "../../Redux/Actions/userAction";
import jwt from "jwt-decode";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies(); 
  const token =  cookies.get('_user_')

  return (
    <div className="container">
      <div className="childContainer">
        <h2
        onClick={()=>navigate("/")}
          className="logoImage"
          
        >ambaram</h2>
        <p>Products</p>
        <p>Teams</p>
        <p>Platform</p>
        <p>Resources</p>
      </div>
      <div className="childContainer">
      {token? jwt(token).user.role==="ADMIN" ?
        <p onClick={()=>navigate("/editPrice")}>Edit Pricing</p> : "" : ""
      }
        <p>Contact sales</p>
        {cookies.get('_user_')?<p onClick={()=>dispatch(signOut(navigate))} >Logout</p>:<p onClick={()=>navigate("/login")} >Login</p>}
        <p className="getStartedBtn">{`Get Started`}</p>
      </div>
    </div>
  );
};

export default Header;
