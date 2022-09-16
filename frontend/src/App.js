import React, {useEffect, useState} from "react"
import axios from "axios"
import './App.css';

function App() {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    getNames();
  },[])

  const getNames = async () => {
    const res = await axios.get(`http://localhost:8000/api/hello_world!`)
    const {data} = res
    setUserName(data)
  }

  return (
    <>
      <h1>My Frontend</h1>
      <h3>
        {userName && JSON.stringify(userName, null, 4)}
      </h3>
    </>
  ); 
}

export default App;
