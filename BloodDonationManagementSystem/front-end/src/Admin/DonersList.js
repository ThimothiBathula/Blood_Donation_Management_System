import styles from "./admin.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
const Doners=()=>{
   const [doners,Setdoners]=useState(null)
   const GetDoners=async()=>{
    let res=await axios.get('http://localhost:4000/api/doners')
    Setdoners(res.data)
   }
   useEffect(()=>{
    setTimeout(()=>{
        GetDoners()
    },3000)
    
    // console.log(users)
   },[])
    return(
        <>
            {
                !doners ?
                <h1>loading..</h1>:
               <table className={styles.table}>
                <thead>
                    <tr className={styles.heading}>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>PASSWORD</td>
                        <td>ACTIONS</td>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                    doners.map((e)=>{
                        return(
                        <tr key={e.username} className={styles.content}>
                            <td>{e._id.slice(-3)}</td>
                            <td>{e.username}</td>
                            <td>{e.email}</td>
                            <td>{e.password}</td>
                            <td className={styles.buttons}>
                                <button onClick={()=>{}}>Update</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                        )
                    })
                    }
                    
                </tbody>
                
                </table>
            
            }
        </>
    )
}

export default Doners