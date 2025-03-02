import { useState } from 'react';
import styles from './Form.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';  // Import js-cookie

const Form = () => {
    const [Image, SetImage] = useState("");
    const [Name, setName] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("");
    const [Dod, setDob] = useState("");
    const [Phone, setPhone] = useState("");
    const [Email, setEmail] = useState("");
    const [BloodGroup, setBloodgroup] = useState("");
    const [Address, setAddress] = useState("");
    const [MedicalHistory, setmH] = useState("");
    const [LastBloodDonate, setdate] = useState("");
    const [msg, setMsg] = useState("");

    async function submit() {
        if (Name.length < 3) {
            setMsg("Name must be greater than three characters");
            setTimeout(() => setMsg(""), 5000);
            return;
        }
        if (parseInt(Age) < 18 || parseInt(Age) > 60 || isNaN(Age)) {
            setMsg("Age must be in numbers and between 18 to 60");
            setTimeout(() => setMsg(""), 5000);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("Image", Image);
            formData.append("Name", Name);
            formData.append("Age", Age);
            formData.append("Gender", Gender);
            formData.append("Dod", Dod);
            formData.append("Phone", Phone);
            formData.append("Email", Email);
            formData.append("BloodGroup", BloodGroup);
            formData.append("Address", Address);
            formData.append("MedicalHistory", MedicalHistory);
            formData.append("LastBloodDonate", LastBloodDonate);

            const token = Cookies.get("token");

            const response = await axios.post("http://localhost:4000/api/donate", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "token": token
                },
            });

            console.log(response);
            setMsg(response.data.message);
            setTimeout(() => setMsg(""), 5000);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='popUp'>{msg && <p>{msg}</p>}</div>
            <div className={styles.Form}>
                <h1>Blood Donation Form</h1>
                <input type="file" onChange={(e) => SetImage(e.target.files[0])} />
                <input type="text" placeholder="Enter Donor Name" onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Enter Donor Age" onChange={(e) => setAge(e.target.value)} />
                <select onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                </select>
                <input type="date" onChange={(e) => setDob(e.target.value)} />
                <input type="text" placeholder="Enter Phone" onChange={(e) => setPhone(e.target.value)} />
                <input type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                <select onChange={(e) => setBloodgroup(e.target.value)}>
                    <option value="">Select Blood Group</option>
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
                <input type="text" placeholder="Enter Address" onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Enter Medical History" onChange={(e) => setmH(e.target.value)} />
                <input type="date" onChange={(e) => setdate(e.target.value)} />
                <button onClick={submit}>Submit</button>
            </div>
        </>
    );
};

export default Form;
