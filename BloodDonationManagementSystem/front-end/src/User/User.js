import styles from './user.module.css'
import { useEffect, useState } from "react"
import axios from 'axios'
const User=()=>{
    const [data,setData]=useState()
    const [loading, setLoading] = useState(true);
    const [Formdata,setFormdata]=useState()
    const [open,Setopen]=useState(false)
    useEffect(()=>{
        submissions()
        
    },[])

    const view=(e)=>{
        setFormdata(e)
        Setopen(true)
    }
    const Close=()=>{
        Setopen(false)
    }
    const submissions= async()=>{
        try{
        const token=localStorage.getItem('user')
        let response= await axios.get('http://localhost:4000/api/submits',{
            headers: {
                'token': token
              }
            }
            
            
        )
        console.log(response.status)
        setLoading(false);
        console.log(response.data)
        setData(response.data)
        // console.log(data)
    }
    catch(err){
        console.log(err)
    }

    }

    const Delete=async (id)=>{
        try{
           let res= await axios.delete("http://localhost:4000/api/deletesub/"+id)
        console.log(res.data)

        }
        catch(err){
            console.log(err)
        }
    }




    if (loading) return <p>Loading...</p>;
    return(
        <>
        <div>
        {data && data.length > 0 ? (
           data.map(e => (
        <div className={styles.conatiner} key={e._id}>
            <div className={styles.Image}>
                <img src={`http://localhost:4000/images/${e.Image}`} />
                </div>
            <h1>{e.Name}</h1>
            <p>{e.BloodGroup}</p>
            <div className={styles.btn}>
                <button onClick={()=>{view(e)}} >View</button>
                <button onClick={()=>Delete(e._id)}>Delete</button>
            </div>
        </div>
         ))
              ) : (
                 <p>No users available</p>
              )}
         </div>


              {open &&
         <div className={styles.view}>
            <div className={styles.formData}>
            <div className={styles.close} onClick={()=>Close()}>❌</div>
            <h1>Your Form</h1>
            <div className={styles.data}>
                <p>Name:&nbsp;{Formdata.Name}</p>
                <p>Age:&nbsp;{Formdata.Age}</p>
                <p>Gender:&nbsp;{Formdata.Gender}</p>
                <p>DOB:&nbsp;{Formdata.Dob}</p>
                <p>Phone:&nbsp;{Formdata.Phone}</p>
                <p>Email:&nbsp;{Formdata.Email}</p>
                <p>Blood-Group:&nbsp;{Formdata.BloodGroup}</p>
                <p>Address:&nbsp;{Formdata.Address}</p>
                <p>Medical-History:&nbsp;{Formdata.MedicalHistory}</p>
                <p>Last-Blood-Donate-Date:&nbsp;{Formdata.LastBloodDonate}</p>
            </div>

         </div>
         </div>
          }
        </>
    )
}

export default User