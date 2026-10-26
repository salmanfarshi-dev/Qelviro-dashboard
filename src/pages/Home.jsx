import React from 'react'
import { useSelector } from 'react-redux'

function Home() {

  let data = useSelector( state => state.userinfo.value);

  return (
    <div>This is home page</div>
  )
}

export default Home