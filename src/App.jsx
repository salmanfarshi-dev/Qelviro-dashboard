import React from "react";
import Registration from "./pages/registration";
import Login from "./pages/Login";

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
  <>
  <Route path="/" element={ <Registration/> }></Route>
  <Route path="/login" element={ <Login/> }></Route>
  <Route path="/home" element={ <Home/> }></Route>

  </>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App;
