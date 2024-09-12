import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = localStorage.getItem("user");


  useEffect(()=>{
    if(auth){
      navigate('/');
    }
  })


  const collectData = async ()=>{
    console.warn({name,Email,password})
    let result = await fetch('http://localhost:5000/register',{
      method:'post',
      body:JSON.stringify({name,Email,password}),
      headers:{
        'Content-Type':'application/json'
      },
    })
    result = await result.json()
    console.warn(result)
    localStorage.setItem("user",JSON.stringify(result));
    if(result){
      navigate('/')
    }

  }

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="InputBox"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        className="InputBox"
        type="text"
        placeholder="Email"
        value={Email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="InputBox"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="button" className="appButton" onClick={collectData}>
        Signup
      </button>
    </div>
  );
};
export default Signup;
