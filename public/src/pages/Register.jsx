import React,{useState,useEffect} from 'react'
import styled from 'styled-components';
import {Link,useNavigate} from "react-router-dom";
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import axios from"axios";
import { registerRoute } from "../utils/APIRoutes";
function Register() {

    const navigate = useNavigate();
    const toastOptions = {
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme:"dark",
    };
    useEffect(() => {
      if (localStorage.getItem("chat-app-user")) {
        navigate("/setAvatar");
      }
    }, []);
    const [values,setValues] = useState({
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    })
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (handleValidation()) {
        const { email, username, password } = values;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      }
    };
  
    const handleValidation = ()=>{
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const {password, confirmPassword, email, username} = values;
      if (password !== confirmPassword){
        toast.error("password and confirm password must be same.",toastOptions
        );
        return false;
        }else if(username.length<3){
          toast.error("username must be greater than 3 characters",toastOptions);
          return false;
      }else if(password.length<3){
        toast.error("password must be of 8 characters",toastOptions);
        return false;
    } else if(!emailPattern.test(email)){
      toast.error("Enter a valid email",toastOptions);
    }
    return true
  }

    const handleChange = (event)=>{
      setValues({...values,[event.target.name]:event.target.value});
    }
  return (
    <>
    <FormContainer>
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>Snappy</h1>
        </div>
        <input type="text" placeholder='Username' name="username" onChange={e => handleChange(e)} />
        <input type="#" placeholder='Email' name="email" onChange={e => handleChange(e)} />
        <input type="password" placeholder='Password' name="password" onChange={e => handleChange(e)} />
        <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={e => handleChange(e)} />
        <button type="submit">Create User</button>
        <span>Already have an account? <Link to="/login">Login</Link></span>
      </form>
    </FormContainer>
    <ToastContainer />
  </>  
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register
