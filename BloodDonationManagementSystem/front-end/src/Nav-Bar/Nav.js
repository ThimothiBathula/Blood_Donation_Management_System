import { Link, useNavigate } from 'react-router-dom'
import styles from './nav.module.css'

const Nav=()=>{
    const navigate=useNavigate()
    return(
        <div className={styles.navConatiner}>
            <div className={styles.leftSide}>
                <h1>LOGO</h1>
            </div>

            <div className={styles.menu}>menu</div>
            <div className={styles.rightSide}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/doners">Doners</Link></li>
                <li><Link to="/donate">Donate</Link></li>
               
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/about">About Us</Link></li>
                {
                !localStorage.getItem('Admin')&& <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/reg">Register</Link></li>
                <li><Link to="/adminLog">Admin Log</Link></li>
                </>
               } 
               {
                 localStorage.getItem('Admin')&& 
                <>
                 <li><Link to="/users">Users Data</Link></li>
                 <li><Link to="/admins">Admins Data</Link></li>
                 <li><Link to="/donersList">Doners Data</Link></li>

                 <li><button onClick={()=>{localStorage.removeItem("Admin");
                    navigate(0)
                 }} className={styles.logout}>LogOut</button></li>
                </>
               }
               
            </div>
        </div>
    )

}


export default Nav