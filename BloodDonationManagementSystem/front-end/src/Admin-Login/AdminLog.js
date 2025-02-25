import { useState, useEffect } from 'react';
import styles from './adminLog.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLog = () => {
  const navigate = useNavigate();
  const [UserName, SetUserName] = useState("");
  const [Password, SetPassword] = useState("");


  const AdminLog = async () => {
    try {
      let response = await axios.post('http://localhost:4000/adminLog', { UserName, Password });
      let token = response.data.token;
      localStorage.setItem("Admin", JSON.stringify({ token: token }));
      localStorage.setItem("AdminloginTime", Date.now())
      navigate('/');
      navigate(0)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.Form}>
        <div className={styles.content}>
          <h1>Admin LOGIN</h1>
          <input 
            placeholder='User-Name' 
            type='text' 
            onChange={(e) => SetUserName(e.target.value)} 
          />
          <input 
            placeholder='Password' 
            type='password' 
            onChange={(e) => SetPassword(e.target.value)} 
          />
          <button className={styles.button} onClick={AdminLog}>
            LOGIN
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminLog;
