import { useState ,useEffect} from 'react';
import styles from './adminLog.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const AdminLog = () => {
  const navigate = useNavigate();
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const validateInputs = () => {
    if (!UserName.trim() || !Password.trim()) {
      setError("Username and Password are required!");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const response = await axios.post('http://localhost:4000/adminLog', { UserName, Password });
      const token = response.data.token;
      Cookies.set("Admin", token, { expires: 1 / 24 });
      navigate('/');
      navigate(0);
    } catch (err) {
      setError("Invalid Username or Password!");
    }
  };
useEffect(()=>{
    if(Cookies.get('Admin')){
        return navigate('/')
    }
},[])
  return (
    <div className={styles.Form}>
      <div className={styles.content}>
        <h1>Admin LOGIN</h1>
        
        <input 
          placeholder='User-Name' 
          type='text' 
          value={UserName}
          onChange={(e) => setUserName(e.target.value)} 
        />

        <input 
          placeholder='Password' 
          type='password' 
          value={Password}
          onChange={(e) => setPassword(e.target.value)} 
        />

        {error && <p className={styles.error}>{error}</p>}
        <button 
          className={styles.button} 
          onClick={handleLogin}
          disabled={!UserName.trim() || !Password.trim()}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default AdminLog;
