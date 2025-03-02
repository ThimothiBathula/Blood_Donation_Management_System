import { useState, useEffect } from "react";
import styles from './login.module.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate(); 
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ username: "", password: "" });

    const validateForm = () => {
        let valid = true;
        const newErrors = { username: "", password: "" };

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

    const saveToCookies = (token) => {
        Cookies.set("user", token, { expires: 1 / 24 });
    };
useEffect(()=>{
    if(Cookies.get('user')){
        return navigate('/')
    }
},[])
    async function Submit() {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/api/login", { username, password });

            saveToCookies(response.data.token);
            setLogin(true);

            setTimeout(() => {
                setLogin(false);
                navigate("/");
                navigate(0)
            }, 2000);
            
        } catch (error) {
            if (error.response) {
                setErrors({
                    username: error.response.data.message.includes("User does not exist") ? error.response.data.message : "",
                    password: error.response.data.message.includes("Incorrect username or password") ? error.response.data.message : "",
                });
            } else {
                alert("Something went wrong. Please try again.");
            }
        }
    }
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
                            onChange={(e) => setUsername(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
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
                    <Link className={styles.Link} to="/reg">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
