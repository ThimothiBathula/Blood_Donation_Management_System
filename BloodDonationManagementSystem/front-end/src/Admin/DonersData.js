import { useEffect, useState } from 'react'
import styles from './DonersData.module.css'
import axios from 'axios'

const DonersData=()=>{
        const [data,setData]=useState()
        const [DeleteConfirm,setConfirm]=useState(false)
        const [DonerId,setDonerId]=useState()

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
                                            <button>Update</button>
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


        </>
    )
}

export default DonersData