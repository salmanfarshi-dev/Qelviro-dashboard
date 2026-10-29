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
import AddProduct from "./pages/AddProduct";
import ViewProduct from "./pages/ViewProduct";
import CreateVarient from "./pages/CreateVarient";
import ViewVarient from "./pages/ViewVarient";
import CreateCategory from "./pages/CreateCategory";
import ViewCategory from "./pages/ViewCategory";
import CreateSubCategory from "./pages/CreateSubCategory";
import ViewSubCategory from "./pages/ViewSubCategory";
import CreateDisconunt from "./pages/CreateDiscount";
import ViewDiscount from "./pages/ViewDiscount";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/otpverification/:email"
        element={<OtpVerification />}
      ></Route>
      <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
      <Route path="/resetpassword/:email" element={<ResetPassword />}></Route>
      <Route path="/dashboard" element={<Home />}>
        <Route path="addproduct" element={<AddProduct />}></Route>
        <Route path="viewproduct" element={<ViewProduct />}></Route>
        <Route path="createvarient" element={<CreateVarient />}></Route>
        <Route path="viewvarient" element={<ViewVarient />}></Route>
        <Route path="createcategory" element={<CreateCategory />}></Route>
        <Route path="viewcategory" element={<ViewCategory />}></Route>
        <Route path="createsubcategory" element={<CreateSubCategory />}></Route>
        <Route path="viewsubcategory" element={<ViewSubCategory />}></Route>
        <Route path="creatediscount" element={<CreateDisconunt />}></Route>
        <Route path="viewdiscount" element={<ViewDiscount />}></Route>
      </Route>
    </>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
