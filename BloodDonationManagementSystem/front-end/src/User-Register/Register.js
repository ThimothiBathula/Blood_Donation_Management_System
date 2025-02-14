import { useState } from "react"
import styles from './register.module.css'
import { Link } from "react-router-dom"

import axios from 'axios'
const Register=()=>{
    const [reg,setreg]=useState(false)
    const [username,SetUserName]=useState("")

    const [email,SetEmail]=useState("") 
    const [password,SetPassword]=useState("")
    const [res,setRes]=useState("")

   async function Submit(e){
        //  e.preventDefault()
         try{
            const response=await axios.post("http://localhost:4000/api/register",{
                username,
                email,
                password
            })
            setRes(response.data.message)
        setreg(true)
        setTimeout(()=>{
            setreg(false)
        },5000)
         }
         catch(err){
            console.log(err)
         }
        
    }
    return(
        <div className={styles.container}>
             {
                    reg && <div className={styles.popup}>
                        <p>{res}</p> 
                        <button onClick={()=>{
                            setreg(false)
                        }}>X</button>
                    </div>
                }
        <div className={styles.RegContainer}>
               
        <h1>Register Form</h1>
        <div className={styles.UserName}>
            <label htmlFor="UserName">User Name</label>
        <input type='text' placeholder="User Name" name="username" id="UserName" onChange={(e)=>{
            SetUserName(e.target.value)

        }}/>
        </div>
        <div className={styles.Email}>
            <label htmlFor="Email">Email</label>
            <div className={styles.email}>
        <input type='email' placeholder="Enter Email" id="Email" name="email" onChange={(e)=>{
            SetEmail(e.target.value)

        }}/>
        </div>
        </div>
        <div className={styles.Password}>
        <label htmlFor="Password">Password</label>
        <input type='password' name="password" placeholder="Enter Password" id="Password"
        onChange={(e)=>{
            SetPassword(e.target.value)
        }}/>
        </div>
        <div className={styles.submit}>
        <button className={styles.button} onClick={()=>{
            Submit()
        }}>Register</button>
        </div>
        <p className={styles.para}>You have alredy an account ? <Link className={styles.Link} to="/login">Login</Link></p>
        </div>
        </div>
    
    )
}
export default Register