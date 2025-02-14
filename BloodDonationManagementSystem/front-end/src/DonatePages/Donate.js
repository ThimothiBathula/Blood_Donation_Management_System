import { useState } from 'react'
import styles from './donate.module.css'
import axios from 'axios'

const Donate=()=>{
            const [Image,SetImage]=useState("")
            const [Name,setName]=useState("")
            const [Age,setAge]=useState("")
            const [Gender,setGender]=useState("")
            const [Dod,setDob]=useState("")
            const [Phone,setPhone]=useState("")
            const [Email,setEmail]=useState("")
            const [BloodGroup,setBloodgroup]=useState("")
            const [Address,setAddress]=useState("")
            const [MedicalHistory,setmH]=useState("")
            const [LastBloodDonate ,setdate]=useState("")
            const [msg,setMsg]=useState("")
            async function submit(){
                if(Name.length<3){
                    setMsg("Name Must Greater than three characters")
                    setTimeout(()=>{
                        setMsg("")
                    },5000)
                    
                }
                if(parseInt(Age)<18 || parseInt(Age)>60 || isNaN(Age) ){
                    setMsg("Age must in Numbers and in between 18 to 60")
                    setTimeout(()=>{
                        setMsg("")
                    },5000)
                    
                }
                else{
                    try{
                        const formData = new FormData();
      formData.append("Image", Image);
      formData.append("Name", Name);
      formData.append("Age", Age);
      formData.append("Gender", Gender);
      formData.append("Dob", Dod);
      formData.append("Phone", Phone);
      formData.append("Email", Email);
      formData.append("BloodGroup", BloodGroup);
      formData.append("Address", Address);
      formData.append("MedicalHistory", MedicalHistory);
      formData.append("LastBloodDonate", LastBloodDonate);
      const token=localStorage.getItem("user")

      // Send data to backend
      const response = await axios.post("http://localhost:4000/api/donate", formData, {
        headers: { "Content-Type": "multipart/form-data",
                    "token": token
         },
      });
                        console.log(response)
                    setMsg(response.data.message)
                    setTimeout(()=>{
                        setMsg("")
                    },5000)
                     }
                     catch(err){
                        console.log(err)
                     }
                    
                
                }
                
            }

    return(
        <>
        <div className='popUp'>
            {
                msg && <p>{msg}</p>
            }
        </div>
        <div className={styles.Form}>
        <h1>Blood Donation Form</h1>
        <div className={styles.image}>
                <label htmlFor="img" className={styles.label}>Image:</label>
                <input type="file" id="img" onChange={(e)=>SetImage(e.target.files[0])}                 />
            </div>
            <div className={styles.name}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input type="text" id="name" placeholder='Enter Doner Name'
                onChange={(e)=>{
                    setName(e.target.value)
                }}
                />
            </div>
            <div className={styles.age}>
                <label htmlFor="age" className={styles.label} >Age:</label>
                <input type="text" placeholder='Enter Doner Age' id="age"
                onChange={(e)=>{
                    setAge(e.target.value)
                }}/>
            </div>
            <div className={styles.gender}>
                <label htmlFor="gender" className={styles.label} >Gender:</label>
                  <select onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>  
            </div>
            <div className={styles.dob}>
                <label htmlFor="dob" className={styles.label} >Date of Birth:</label>
                <input type="date" placeholder='Enter Doner DOB' id="dob"
                onChange={(e)=>{
                    setDob(e.target.value)
                }}/>
            </div>
            <div className={styles.phone}>
                <label htmlFor="age" className={styles.label} >Phone:</label>
                <input type="text" placeholder='Enter Doner Phone' id="phone"
                onChange={(e)=>{
                    setPhone(e.target.value)
                }}/>
            </div>
            <div className={styles.email}>
                <label htmlFor="email" className={styles.label} >Email:</label>
                <input type="text" placeholder='Enter Doner Email' id="email"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
            </div>
            <div className={styles.bloodGroup}>
                <label htmlFor="bloodGroup" className={styles.label} >Blood-Group:</label>
                <select onChange={(e)=>{setBloodgroup(e.target.value)}}>
                    <option selected>Select Blood-Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>Unknown</option>
                  </select> 
            </div>
            <div className={styles.address}>
                <label htmlFor="address" className={styles.label} >Address:</label>
                <input type="text" placeholder='Enter Doner Address' id="address"
                onChange={(e)=>{
                    setAddress(e.target.value)
                }}/>
            </div>
            <div className={styles.MedicalHistory}>
                <label htmlFor="MedicalHistory" className={styles.label} >Medical-History:</label>
                <input type="text" placeholder='Enter Doner Medical Issue' id="MedicalHistory"
                onChange={(e)=>{
                    setmH(e.target.value)
                }}/>
            </div>
            <div className={styles.LastBloodDonate}>
                <label htmlFor="LastBloodDonate" className={styles.label} >Donate-Date:</label>
                <input type="date" placeholder='Enter Doner Last Donate date' id="LastBloodDonate"
                onChange={(e)=>{
                    setdate(e.target.value)
                }}/>
            </div>
            <div className={styles.button}>
                <button onClick={()=>{
                    submit()
                }}>Submit</button>
            </div>
        </div>
        
        </>
    )
}
export default Donate