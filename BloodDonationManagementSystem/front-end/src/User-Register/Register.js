import { useState } from "react";
import styles from './register.module.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [reg, setReg] = useState(false);
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState("");
  
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: ""
  });


  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: ""
    };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  async function Submit(e) {

    // e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    try {
      const response = await axios.post("http://localhost:4000/api/register", {
        username,
        email,
        password
      });

      setRes(response.data.message);
      setReg(true);
      setTimeout(() => {
        setReg(false);
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      {
        reg && <div className={styles.popup}>
          <p>{res}</p> 
          <button onClick={() => setReg(false)}>X</button>
        </div>
      }
      <div className={styles.RegContainer}>
        <h1>Register Form</h1>

        <div className={styles.UserName}>
        <label htmlFor="UserName">User Name</label>
        <div className={styles.username}>
          <input 
            type="text" 
            placeholder="User Name" 
            name="username" 
            id="UserName" 
            value={username}
            onChange={(e) => setUserName(e.target.value)} 
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
          </div>
        </div>

        <div className={styles.Email}>
          <label htmlFor="Email">Email</label>
          <div className={styles.email}>
            <input 
              type="email" 
              placeholder="Enter Email" 
              id="Email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
        </div>

        <div className={styles.Password}>
          <label htmlFor="Password">Password</label>
          <div className={styles.password}>
          <input 
            type="password" 
            name="password" 
            placeholder="Enter Password" 
            id="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div> 
        </div>

        <div className={styles.submit}>
          <button className={styles.button} onClick={Submit}>Register</button>
        </div>

        <p className={styles.para}>
          You have already an account? <Link className={styles.Link} to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
