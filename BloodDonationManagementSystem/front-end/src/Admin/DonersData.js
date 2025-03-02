import { useEffect, useState } from 'react'
import styles from './DonersData.module.css'
import axios from 'axios'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const DonersData=()=>{
        const navigate = useNavigate();
        const [data,setData]=useState()
        const [DeleteConfirm,setConfirm]=useState(false)
        const [DonerId,setDonerId]=useState()
        const [UpdateUser,setUpdateUser]=useState()
        const [msg,Setmsg]=useState('')
        const [Update,setUpdate]=useState(false)
        useEffect(()=>{
            Get()
        },[])
        // const checkSessionExpiration = () => {
        //     const loginTime = localStorage.getItem("loginTime");
        
        //     if (loginTime) {
        //         const currentTime = Date.now();
        //         const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
        
        //         if (currentTime - loginTime > oneHour) {
        //             localStorage.removeItem("Admin");
        //             localStorage.removeItem("AdminloginTime");
        //             navigate("/", { state: { message: "Your session has expired. Please login again." } });
        //             navigate(0);
        //             return true;
        //         }
        //     }
        //     return false;
        // };

        const Get= async()=>{
            // if (checkSessionExpiration()) return;
            try{
            const token = Cookies.get("Admin")
                let res= await axios.get('http://localhost:4000/api/admin/doners',{
                    headers:{
                        "token":token
                    }
                })
                setData(res.data.data)
            }
            catch(err){
                if (err.response) {
                    const statusCode = err.response.status;
                    if(statusCode===401){
                        Cookies.remove("Admin");
                        navigate("/", { state: { message: "Your login is expired. Please login again." } });
                        return null;
        
                    }
                }
        
            }
        }

        const ClosePop=()=>{
            setConfirm(false)
            setDonerId(null)
        }

        const OpenPop=(id)=>{
            setConfirm(true)
            setDonerId(id)
        }
        const Delete=async()=>{
                // if (checkSessionExpiration()) return;
                try{
                    if(DonerId){
                        const token =Cookies.get("Admin")
                    let res= await axios.delete('http://localhost:4000/api/admin/donerDelete/'+DonerId,{
                        headers: {
                            'token': token
                          }
                    })
                    }
                    setDonerId(null)
                    setConfirm(false)
                    navigate(0)
                }
                catch(err){
                    if (err.response) {
                        const statusCode = err.response.status;
                        if(statusCode===401){
                            Cookies.remove("Admin");
                            navigate("/", { state: { message: "Your login is expired. Please login again." } });
                            navigate(0);
                            return null;
            
                        }
                    }
            
                }
        }

        let changeFormData = (event) => {
            const { name, value } = event.target;
            setUpdateUser({ ...UpdateUser, [name]: value })
        }


        const update=(e)=>{
            setUpdate(true)
            setUpdateUser({id:e._id,Name:e.Name,Age:e.Age,Gender:e.Gender,Dob:e.Dob,Phone:e.Phone,
                Email:e.Email,BloodGroup:e.BloodGroup,
                Address:e.Address,MedicalHistory:e.MedicalHistory,LastBloodDonate:e.LastBloodDonate
            })
        }
        const updateDetails=async(data)=>{
                // if (checkSessionExpiration()) return;
                try{
                    let d = {
                        Name:data.Name,
                        Age:data.Age,
                        Phone:data.Phone,
                        Email:data.Email,
                        BloodGroup:data.BloodGroup,
                        LastBloodDonate:data.LastBloodDonate
                    }
                    const token = Cookies.get("Admin")
                    let response= await axios.put('http://localhost:4000/api/admin/updateDoner/'+data.id,d,{
                        headers:{
                            "token":token
                        }
                    })
                    console.log(response.data.message)
                    setUpdate(false)
                    setTimeout(()=>{
                        Setmsg("")
                    },5000)
                    Setmsg(response.data.message)
                    Get()
                }catch(err){
                    if (err.response) {
                        const statusCode = err.response.status;
                        if(statusCode===401){
                            Cookies.remove("Admin");
                            navigate("/", { state: { message: "Your login is expired. Please login again." } });
                            navigate(0);
                            return null;
            
                        }
                    }
            
                }
        }


    return(
        <>
             {
                            !data ?
                            <h1>loading..</h1>:
                            <>
                             <div className={styles.tableCap}>
                                                Doners Data
                                            </div>
                           <table className={styles.table}>
                            <thead>
                                <tr className={styles.heading}>
                                    <td>ID</td>
                                    <td>NAME</td>
                                    <td>AGE</td>
                                    <td>USER ID</td>
                                    <td>ACTIONS</td>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {
                                data.map((e)=>{
                                    return(
                                    <tr key={e._id} className={styles.content}>
                                        <td>{e._id.slice(-3)}</td>
                                        <td>{e.Name}</td>
                                        <td>{e.Age}</td>
                                        <td>{e.User_id}</td>

                                        <td className={styles.buttons}>
                                            <button onClick={()=>{update(e)}}>Update</button>
                                            <button onClick={()=>{OpenPop(e._id)}} >Delete</button>
                                        </td>
                                    </tr>
                                    )
                                })
                                }
                                
                            </tbody>
                            
                            </table>
                            </>
                        
                        }


            {DeleteConfirm && <div className={styles.confirm}>
                <div className={styles.pop}>
                    <div className={styles.close} onClick={()=>ClosePop()} >❌</div>
                    <div>
                    <h1>Are You Sure ?</h1>
                    <div className={styles.confirmbutton}>
                    <button className={styles.confirmBtn} onClick={()=>{Delete()}}>Confirm</button>
                    </div>
                    </div>
                </div>
                </div>

            }
            {Update &&
                        <div className={styles.CreatePop}>
                        <div className={styles.create}>
                            <div className={styles.closeBtn}>
                                <div className={styles.close} onClick={()=>setUpdate(false)}>❌</div>
                            </div>
                            <div className={styles.content}>
                            <h1>Update Doner</h1>
                            <div className={styles.Username}>
                            <input type="text" placeholder="User Name" name="Name" onChange={changeFormData} value={UpdateUser.Name}/>
                            </div>
                            <div className={styles.email}>
                            <input type="email" placeholder="Age"
                            name="Age"
                             onChange={changeFormData} value={UpdateUser.Age}/>
                            </div>
                            <div className={styles.email}>
                            <input type="email" placeholder="Phone"
                            name="Phone"
                             onChange={changeFormData} value={UpdateUser.Phone}/>
                            </div> 
                            <div className={styles.email}>
                            <input type="email" placeholder="Email"
                            name="Email"
                             onChange={changeFormData} value={UpdateUser.Email}/>
                            </div>
                            <div className={styles.email}>
                            <input type="email" placeholder="BloodGroup"
                            name="BloodGroup"
                             onChange={changeFormData} value={UpdateUser.BloodGroup}/>
                            </div>
                            <div className={styles.email}>
                            <input type="email" placeholder="LastBloodDonate"
                            name="LastBloodDonate"
                             onChange={changeFormData} value={UpdateUser.LastBloodDonate}/>
                            </div> 
                            <div className={styles.btn}>
                            <button onClick={()=>{
                                updateDetails(UpdateUser)
                            }}>Update</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        }
            


        </>
    )
}

export default DonersData