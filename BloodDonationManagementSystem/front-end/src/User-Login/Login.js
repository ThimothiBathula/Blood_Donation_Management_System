import { useState, useEffect } from "react";
import styles from './login.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); 
  const [login, setLogin] = useState(false);
  const [username, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      navigate('/donate');
    }
  }, [navigate]);
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      password: "",
    };

    if (!username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const saveToLocalStorage = (token) => {
    const data = {
      token: token,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem("user", JSON.stringify(data));
  };

 
  const getFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (!data) return null;
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - data.timestamp;

    
    if (elapsedTime > 3600000) {
      localStorage.removeItem("user");
      return null;
    }

    return data.token;
  };

  async function Submit() {
    if (!validateForm()) {
      return;
    }

    try {
      console.log(username, password);
      const response = await axios.post("http://localhost:4000/api/login", {
        username,
        password,
      });

      saveToLocalStorage(response.data.token);

      setLogin(true);

      
      setTimeout(() => {
        setLogin(false);
        navigate("/");  
      }, 5000);

    } catch (error) {
      console.error("Login failed:", error);
    }
  }

 
  useEffect(() => {
    const token = getFromLocalStorage();
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      {login && (
        <div className={styles.popup}>
          <p>Login Success</p>
          <button onClick={() => setLogin(false)}>X</button>
        </div>
      )}

      <div className={styles.LoginContainer}>
        <h1>Login Form</h1>

        <div className={styles.UserName}>
          <label htmlFor="UserName">User Name</label>
          <div className={styles.username}>
            <input
              type="text"
              placeholder="User Name"
              id="UserName"
              value={username}
              onChange={(e) => SetUserName(e.target.value)}
            />
            {errors.username && <p className={styles.error}>{errors.username}</p>}
          </div>
        </div>

        <div className={styles.Password}>
          <label htmlFor="Password">Password</label>
          <div className={styles.password}>
            <input
              type="password"
              placeholder="Enter Password"
              id="Password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>
        </div>

        <div className={styles.submit}>
          <button className={styles.button} onClick={Submit}>
            Login
          </button>
        </div>

        <p className={styles.para}>
          Don't have an account?
          <Link className={styles.Link} to="/reg">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
