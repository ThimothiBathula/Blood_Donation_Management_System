import { useState } from 'react'
import styles from './contact.module.css'
import axios from 'axios'
const Contact=()=>{
    const[Name,setName]=useState("")
    const[Email,setEmail]=useState("")
    const[Message,setMsg]=useState("")
    const [style,setstyle]=useState()
    const [pop,setPop]=useState()
    const submit=async ()=>{
        try{
            if(Name.length<3 || Email.length<3 || Message.length<3){
                setstyle({"color":"white","background-color":"red"})
                setPop("Enter proper details")
                setTimeout(()=>{
                    setPop()
                    setstyle()
                },5000)
                
            }
            else{
            let res= await axios.post('http://localhost:4000/api/contact',{Name,Email,Message})
            setPop(res.data.message)
            setstyle({"color":"white","background-color":"green"})
            setTimeout(()=>{
                setPop("")
                setstyle()

            },3000)
        }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const Close=()=>{
        setPop()
    }

    return(
        <>
        {pop && <div className={styles.pop} style={style}>
                    <p className={styles.popLeft}>{pop}</p>
                    <p className={styles.popRight} onClick={()=>{Close()}}>X</p>
                </div>
        }
        <div className={styles.container}>
        <h1 className={styles.ContactHead}>Contact Form</h1>
        <div className={styles.first}>
            <input type="text" placeholder="Full Name"
            onChange={(e)=>{setName(e.target.value)}}/>
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