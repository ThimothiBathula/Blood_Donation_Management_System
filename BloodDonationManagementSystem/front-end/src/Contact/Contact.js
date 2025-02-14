import { useState } from 'react'
import styles from './contact.module.css'

const Contact=()=>{
    const[firstName,setName]=useState()
    const[second,setsName]=useState()
    const[email,setEmail]=useState()
    const[msg,setMsg]=useState()
    const submit=()=>{
        console.log(firstName,second,email,msg)
    }

    return(
        <>
        <div className={styles.container}>
        <h1>Contact Form</h1>
        <div className={styles.first}>
            <input type="text" placeholder="First Name"
            onChange={(e)=>{setName(e.target.value)}}/>
        </div>
        <div className={styles.second}>
            <input type="text" placeholder="Second Name"
            onChange={(e)=>{setsName(e.target.value)}}/>
        </div>
        <div className={styles.email}>
            <input type="email" placeholder="Email"
            onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        <div className={styles.msg}>
            <textarea type="text" placeholder="Message"
            onChange={(e)=>{setMsg(e.target.value)}}/>
        </div>
        <div className={styles.btn}>
            <button onClick={()=>submit()}>Submit</button>
        </div>
        </div>
        </>
    )
}


export default Contact