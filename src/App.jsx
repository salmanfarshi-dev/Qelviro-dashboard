import React from "react";
import Registration from "./pages/registration";
import Login from "./pages/Login";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router";
import Home from "./pages/Home";
import OtpVerification from "./pages/OtpVerification";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/otpverification/:email" element={<OtpVerification />}></Route>
       <Route path="/forgetpassword" element={<ForgetPassword/> }></Route>
       <Route path="/resetpassword/:email" element={ <ResetPassword/> }></Route>
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
