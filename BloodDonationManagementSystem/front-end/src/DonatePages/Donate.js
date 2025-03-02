import { useState } from "react";
import styles from "./donate.module.css";
import axios from "axios";
import Cookies from "js-cookie";
const Donate = () => {
  const [Image, SetImage] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [BloodGroup, setBloodgroup] = useState("");
  const [LastBloodDonate, setdate] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    let newErrors = {};

    if (!Name || Name.length < 3) newErrors.Name = "Name must be at least 3 characters long.";

    if (!Age || isNaN(Age) || Age < 18 || Age > 50) newErrors.Age = "Age must be between 18 and 50.";
    if (!Phone || !/^\d{10}$/.test(Phone)) newErrors.Phone = "Phone number must be 10 digits.";
    if (!Email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) newErrors.Email = "Enter a valid email address.";
    if (!BloodGroup) newErrors.BloodGroup = "Please select a blood group.";
    if (!Image) newErrors.Image = "Please upload an image.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function submit() {
    setErrors({});

    if (!validateForm()) return;

    try {
      const formData = new FormData();
      formData.append("Image", Image);
      formData.append("Name", Name);
      formData.append("Age", Age);
      formData.append("Phone", Phone);
      formData.append("Email", Email);
      formData.append("BloodGroup", BloodGroup);
      formData.append("LastBloodDonate", LastBloodDonate);

      const User = JSON.parse(Cookies.get('user') || "{}");
      const token = User.token;
      const response = await axios.post("http://localhost:4000/api/donate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      alert(response.data.message);
      
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className={styles.Form}>
      <h1>Blood Donation Form</h1>
      <div className={styles.inputGroup}>
        <label htmlFor="img">Image:</label>
        <input type="file" id="img" onChange={(e) => SetImage(e.target.files[0])} />
        {errors.Image && <p className={styles.error}>{errors.Image}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Enter Donor Name" onChange={(e) => setName(e.target.value)} />
        {errors.Name && <p className={styles.error}>{errors.Name}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" placeholder="Enter Donor Age" onChange={(e) => setAge(e.target.value)} />
        {errors.Age && <p className={styles.error}>{errors.Age}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" placeholder="Enter Donor Phone" onChange={(e) => setPhone(e.target.value)} />
        {errors.Phone && <p className={styles.error}>{errors.Phone}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" placeholder="Enter Donor Email" onChange={(e) => setEmail(e.target.value)} />
        {errors.Email && <p className={styles.error}>{errors.Email}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="bloodGroup">Blood Group:</label>
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
        </select>
        {errors.BloodGroup && <p className={styles.error}>{errors.BloodGroup}</p>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="LastBloodDonate">Last Blood Donation Date:</label>
        <input type="date" id="LastBloodDonate" onChange={(e) => setdate(e.target.value)} />
        {errors.LastBloodDonate && <p className={styles.error}>{errors.LastBloodDonate}</p>}
      </div>
      <div className={styles.button}>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default Donate;
