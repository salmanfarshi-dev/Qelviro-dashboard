import React, { useEffect } from 'react'
import axios from "axios";


function ViewCategory() {

  useEffect(()=>{

  async  function allcategory(){
       const data = await axios.get(
        "http://localhost:3000/api/v1/product/viewcategory",)
        console.log(data);
        
    }

    allcategory()
  })
  return (
    <div>ViewCategory</div>
  )
}

export default ViewCategory