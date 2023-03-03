import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import Edit from "../Components/EditPrice/Edit";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Home from "../Components/HomePage/Home";
import PrivateRoutes from "../protected/PrivateRoutes";
import jwt from "jwt-decode";
import { Cookies } from "react-cookie";

const MainRoutes = () => {
 const cookies = new Cookies();
 const token =  cookies.get('_user_')

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            {token? jwt(token).user.role==="ADMIN" ?
            <Route exact path="/editPrice" element={<Edit />} /> : "" :""
            }
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default MainRoutes;
