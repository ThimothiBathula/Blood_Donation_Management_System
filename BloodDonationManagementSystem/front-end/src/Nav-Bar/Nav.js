import { Link, useNavigate } from 'react-router-dom';
import styles from './nav.module.css';
import { useEffect, useState } from 'react';

const Nav = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  const adminValidate = async () => {
    const adminToken = localStorage.getItem('Admin');
    if (adminToken) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  };

  const userValidate = async () => {
    const userToken = localStorage.getItem('user');
    if (userToken) {
      setUser(true);
    } else {
      setUser(false);
    }
  };

  useEffect(() => {
    adminValidate();
    userValidate();
  }, []);

  return (
    <div className={styles.navConatiner}>
      <div className={styles.leftSide}>
        <h1>LOGO</h1>
      </div>

      <div className={styles.menu}>menu</div>

      <div className={styles.rightSide}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About Us</Link></li>
        {user ? (
          <>
            <li><Link to="/doners">Doners</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><button onClick={() => {
              localStorage.removeItem('user');
              setUser(false);
              navigate(0);
            }} className={styles.userlogout}>LogOut</button></li>
          </>
        ) : (
       
          !admin && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/reg">Register</Link></li>
            </>
          )
        )}

        {admin ? (
          <>
            <li><Link to="/users">Users Data</Link></li>
            <li><Link to="/admins">Admins Data</Link></li>
            <li><Link to="/donersList">Doners Data</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li><button onClick={() => {
              localStorage.removeItem('Admin');
              setAdmin(false);
              navigate(0);
            }} className={styles.logout}>LogOut</button></li>
          </>
        ) : (
          !user && (
            <li><Link to="/adminLog">Admin Log</Link></li>
          )
        )}
      </div>
    </div>
  );
};

export default Nav;
