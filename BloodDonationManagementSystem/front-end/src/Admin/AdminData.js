import styles from './AdminData.module.css'
import { useEffect, useState } from "react"
import axios from "axios"

const SkeletonTable = () => {
  const a=[1,2,3,4]
  return(
  <table className={styles.tableSkeleton}>
      <thead>
          <tr className={styles.headingSkeleton}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
          </tr>
      </thead>
      <tbody>
          {a.map((e) => {(
              <tr key={e} className={styles.skeletonRow}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className={styles.buttons}>
                      <div className={styles.skeletonButton}></div>
                      <div className={styles.skeletonButton}></div>
                  </td>
              </tr>
          )
        })
      }
      </tbody>
  </table>
  )
};

const AdminData=()=>{
    const [UserName,SetUserName]=useState("")
    const [Update,setUpdate]=useState(false)
    const [Password,SetPassword]=useState("")
    const [msg,Setmsg]=useState('')
    const [users,Setusers]=useState(null)
    const [Pop,SetPop]=useState(false)
    const [CrPop,SetCrPop]=useState(false)
    const [temp,Settemp]=useState(null)
    const [UpdateUser,setUpdateUser]=useState()
    

    let changeFormData = (event) => {
        const { name, value } = event.target;
        setUpdateUser({ ...UpdateUser, [name]: value })
    }

    const updateDetails=async(data)=>{
            try{
                let {UserName,Password}=data
                // console.log(d)
                const token=localStorage.getItem('Admin')
                let response= await axios.put('http://localhost:4000/admin/update/'+data.id,{UserName,Password},{
                    headers: {
                        'token': token
                      }
                })
                setUpdate(false)
                setTimeout(()=>{
                    Setmsg("")
                },5000)
                Setmsg(response.data.message)
                Getusers()
            }catch(err){
                console.log(err)
            }
    }
    
   const Submit=async()=>{
         try{
            const token=localStorage.getItem('Admin')
            const response=await axios.post("http://localhost:4000/adminReg",{
                UserName,
                Password
            },{headers: {
                'token': token
              }})
              setTimeout(()=>{
                Setmsg("")
            },5000)
            Setmsg("Created New Admin Success")
            SetPop(false)
            Getusers()
            SetCrPop(false)


         }
         catch(err){
            console.log(err)
         }
        
    }


    const Getusers=async()=>{
        const token=localStorage.getItem('Admin')
    let res=await axios.get('http://localhost:4000/admins',{
        headers: {
            'token': token
          }
    })
    Setusers(res.data)
   }
   useEffect(()=>{
    setTimeout(()=>{
        Getusers()
    },3000)
   },[])


const DeleteUser=async(id)=>{
    try{
        const token=localStorage.getItem('Admin')
        let res=await axios.delete('http://localhost:4000/admin/delete/'+id,{
        headers: {
            'token': token
          }
    })
    setTimeout(()=>{
        Setmsg("")
    },5000)
    Setmsg(res.data.message)
    Getusers()
    SetPop(false)
}
catch(err){
    console.log(err)
}
}

const update=(e)=>{
    setUpdate(true)
    setUpdateUser({id:e._id,UserName:e.UserName,Password:e.Password})
}
const open=(e)=>{
    SetPop(true)
    Settemp(e)
}

const OpenCreate=()=>{
    SetCrPop(true)
}
    return(
        <>
        {msg &&<div className={styles.msg}>{msg}</div> }
            {
                !users ?
                <>
                <SkeletonTable></SkeletonTable>
                </>:
                <>
                <div className={styles.CreateButton}>
                    <button onClick={()=>{
                        OpenCreate()
                    }}>Create Admin</button>
                </div>
                <div className={styles.tableCap}>
                    Admins Data
                </div>
               <table className={styles.table}>
                <thead>
                    <tr className={styles.heading}>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PASSWORD</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {
                    users.map((e)=>{
                        return(
                        <tr key={e._id} className={styles.content}>
                            <td>{e._id.slice(-3)}</td>
                            <td>{e.UserName}</td>
                            <td>{e.Password}</td>
                            <td className={styles.buttons}>
                                <button onClick={()=>{update(e)}}>Update</button>
                                <button onClick={()=>{open(e._id)}}>Delete</button>
                            </td>
                        </tr>
                        )
                    })
                    }
                    
                </tbody>
                
                </table>
                </>

            
            }
            {Pop &&
            <div className={styles.Delete}>
                <div className={styles.Pop}>
                <div className={styles.cross}>
                    <div onClick={()=>{SetPop(false)}}>❌</div>
                </div>
                <div className={styles.sub}>
                    <p>Are you sure you want to delete user?</p>
                    <button className={styles.btn} onClick={()=>{
                        DeleteUser(temp)
                    }}>Submit</button>
                </div>
                </div>
            </div>
            }

            {CrPop &&
            <div className={styles.CreatePop}>
            <div className={styles.create}>
                <div className={styles.closeBtn}>
                    <div className={styles.close} onClick={()=>SetCrPop(false)}>❌</div>
                </div>
                <div className={styles.content}>
                <h1>Create User</h1>
                <div className={styles.Username}>
                <input type="text" placeholder="User Name" onChange={(e)=>{
                 SetUserName(e.target.value)}}/>
                </div>
                <div className={styles.pass}>
                <input type="password" placeholder="Password"
                onChange={(e)=>{
                    SetPassword(e.target.value)
                }}/>
                </div>
                <div className={styles.btn}>
                <button onClick={()=>{
                    Submit()
                }}>Submit</button>
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
                <h1>Update User</h1>
                <div className={styles.Username}>
                <input type="text" placeholder="User Name" name="UserName" onChange={changeFormData} value={UpdateUser.UserName}/>
                </div>
                
                <div className={styles.pass}>
                <input type="password" placeholder="Password"
                name="Password"
                onChange={changeFormData}
                value={UpdateUser.Password}/>
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

export default AdminData