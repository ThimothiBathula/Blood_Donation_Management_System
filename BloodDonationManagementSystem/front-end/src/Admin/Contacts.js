import { useEffect, useState } from 'react';
import styles from './Contacts.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Contacts=()=>{
    const navigate = useNavigate();
    const [contacts,setContacts]=useState([]);
    const checkSessionExpiration = () => {
        const loginTime = localStorage.getItem("AdminloginTime");
    
        if (loginTime) {
            const currentTime = Date.now();
            const oneHour = 60 * 60 * 1000;
    
            if (currentTime - loginTime > oneHour) {
                localStorage.removeItem("Admin");
                localStorage.removeItem("loginTime");
                navigate("/", { state: { message: "Your session has expired. Please login again." } });
                return true;
            }
        }
        return false;
    };
    const GetContacts=async()=>{
        if (checkSessionExpiration()) return;
        try{
            const Admin =JSON.parse(localStorage.getItem('Admin'))
            const token=Admin.token
            let res= await axios.get('http://localhost:4000/api/contacts',{
                headers:{
                    'token':token
                }
            })
            console.log(res.data)
            setContacts(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        GetContacts();
    },[])

    return(
        <>
        <h1>Contacts</h1>
        <div className={styles.cards}>
            {contacts.map((e)=>{
                return(
                  <div className={styles.card} key={e._id}>
                  <div className={styles.dots}>⋮</div>
                      <div className={styles.top}>
                      <div className={styles.image}><img src='user.png'/></div>
                      <div className={styles.name}>{e.Name}</div>
                      </div>
                      <div className={styles.bottom}>
                          <div className={styles.email}><img src='send.png'/>
                          <div>{e.Email}</div>
                          </div>
                      </div>
                  </div>
                )
            })}
          
        </div>
        </>
    )
}

export default Contacts