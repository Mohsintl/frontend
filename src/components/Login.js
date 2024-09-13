import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/')
    }
  },[])
  const logindata=async()=>{
    let result = await fetch('http://localhost:5000/login',{
        method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    result = await result.json();
    console.warn(result)
  if(result.name){
        localStorage.setItem('user',JSON.stringify(result))
        navigate('/')
  }else{
    alert('please enter correct details')
  }
  }

  return (
    <div className="login">
      <h1>Log in </h1>
      <input
        type="text"
        placeholder="Email"
        className="InputBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="password" placeholder="password" className="InputBox" 
      value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button type="button" className="appButton" onClick={logindata}>
        Log in
      </button>
    </div>
  );
};

export default Login;
