import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../slices/UserinfoSlies";
import { useNavigate } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let data = useSelector((state) => state.userinfo.value);

   let handlelogout = () => {
    dispatch(logout(JSON.stringify(data.data)));
    navigate("/login")
  };


  useEffect(() => {
    if (data == null) {
      navigate("/login");
    }
  }, []);
 

  return (
    <div className="flex justify-end mr-10 mt-10">
      <div className="flex flex-col justify-center items-center gap-3 border border-black p-2 rounded shadow-2xl w-100 h-80">
        <div className="w-20 h-20 rounded-full bg-red-300"></div>
        <h5>Name: Salman farshi</h5>
        <h5>Email: sfarshi222@gmail.com</h5>
        <h4 onClick={handlelogout} className="text-xl font-bold cursor-pointer">
          Logout
        </h4>
      </div>
    </div>
  );
}

export default Home;
