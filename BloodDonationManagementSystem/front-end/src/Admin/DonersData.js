import { useEffect, useState } from 'react'
import styles from './DonersData.module.css'
import axios from 'axios'

const DonersData=()=>{
        const [data,setData]=useState()
        const [DeleteConfirm,setConfirm]=useState(false)
        const [DonerId,setDonerId]=useState()
        const [UpdateUser,setUpdateUser]=useState()
        const [msg,Setmsg]=useState('')
        const [Update,setUpdate]=useState(false)
        useEffect(()=>{
            Get()
        },[])

        const Get= async()=>{
            try{
                let res= await axios.get('http://localhost:4000/api/admin/doners')
                setData(res.data.data)
            }
            catch(err){
                console.log(err)
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
                try{
                    if(DonerId){
                    let res= await axios.delete('http://localhost:4000/api/admin/donerDelete/'+DonerId)
                    }
                    setDonerId(null)
                    setConfirm(false)
                }
                catch(err){
                    console.log(err)
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
            let d = {
                Name:data.Name,
                Age:data.Age,
                Gender:data.Gender,
                Dob:data.Dob,
                Phone:data.Phone,
                Email:data.Email,
                BloodGroup:data.BloodGroup,
                Address:data.Address,
                MedicalHistory:data.MedicalHistory,
                LastBloodDonate:data.LastBloodDonate
            }
                try{
                    let response= await axios.put('http://localhost:4000/api/admin/updateDoner/'+data.id,d)
                    console.log(response.data.message)
                    setUpdate(false)
                    setTimeout(()=>{
                        Setmsg("")
                    },5000)
                    Setmsg(response.data.message)
                    Get()
                }catch(err){
                    console.log(err)
                }
        }


    return(
        <>
             {
                            !data ?
                            <h1>loading..</h1>:
                           <table className={styles.table}>
                            <thead>
                                <tr className={styles.heading}>
                                    <td>ID</td>
                                    <td>NAME</td>
                                    <td>AGE</td>
                                    <td>GENDER</td>
                                    <td>USER NAME</td>
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
                                        <td>{e.Gender}</td>
                                        <td>{e.username}</td>

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
                        
                        }


            {DeleteConfirm && <div className={styles.confirm}>
                <div className={styles.pop}>
                    <div className={styles.close} onClick={()=>ClosePop()} >❌</div>
                    <h1>Are You Sure ?</h1>
                    <div className={styles.confirmbutton}>
                    <button className={styles.confirmBtn} onClick={()=>{Delete()}}>Confirm</button>
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
                            <div className={styles.pass}>
                            <input type="text" placeholder="Gender"
                            name="Gender"
                            onChange={changeFormData}
                            value={UpdateUser.Gender}/>
                            </div>
                            <div className={styles.email}>
                            <input type="text" placeholder="DOB"
                            name="Dob"
                             onChange={changeFormData} value={UpdateUser.Dob}/>
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
                            <input type="email" placeholder="Address"
                            name="Address"
                             onChange={changeFormData} value={UpdateUser.Address}/>
                            </div>
                            <div className={styles.email}>
                            <input type="email" placeholder="MedicalHistory"
                            name="MedicalHistory"
                             onChange={changeFormData} value={UpdateUser.MedicalHistory}/>
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