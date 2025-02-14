import { useState } from "react"

import styles from './login.module.css'
import { Link } from "react-router-dom"
import axios from "axios"
const Login=()=>{
    const [login,setLogin]=useState(false)
    const [username,SetUserName]=useState("")
    const [password,SetPassword]=useState("")
    
   async function Submit(){
        console.log(username,password)
        let response= await axios.post("http://localhost:4000/api/login",{username,password})
        console.log(response.data)
        // sessionStorage.setItem()
        localStorage.setItem("user",response.data.token)
        setLogin(true)
        setTimeout(()=>{
            setLogin(false)
        },5000)
    }
    return(
        <div className={styles.container}>
             {
                    login && <div className={styles.popup}>
                        <p>Login Success</p> 
                        <button onClick={()=>{
                            setLogin(false)
                        }}>X</button>
                    </div>
                }
        <div className={styles.LoginContainer}>
               
        <h1>Login Form</h1>
        <div className={styles.UserName}>
            <label htmlFor="UserName">User Name</label>
        <input type='text' placeholder="User Name" id="UserName" onChange={(e)=>{
            SetUserName(e.target.value)

        }}/>
        </div>
        <div className={styles.Password}>
        <label htmlFor="Password">Password</label>
        <input type='password' placeholder="Enter Password" id="Password"
        onChange={(e)=>{
            SetPassword(e.target.value)
        }}/>
        </div>
        <div className={styles.submit}>
        <button className={styles.button} onClick={()=>{
            Submit()
        }}>Login</button>
        </div>
        <p className={styles.para}>Don't have an account ? <Link className={styles.Link} to="/reg">Register</Link></p>
        </div>
        </div>
    )
}
export default Login