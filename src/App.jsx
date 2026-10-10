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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/otpverification" element={<OtpVerification />}></Route>
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
