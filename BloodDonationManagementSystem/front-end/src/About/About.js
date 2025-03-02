import { Link } from 'react-router-dom'
import styles from './about.module.css'

const About=()=>{
    return(
        <>
        <div className={styles.image}>
            <img src='about.png'/>
        </div>
        <div className={styles.boxes}>
            <Link to='/donate'><div>Donate</div></Link>
            <Link to='/login'><div>Login</div></Link>
            <Link to='/reg'><div>Register</div></Link>
            <Link to='/doners'><div>Doners</div></Link>
        </div>
        <div className={styles.content}>
            <h1>Types of donation</h1>
            
            <p>The average human body contains about five liters of blood, which is made of several cellular and non-cellular components such as Red blood cell, Platelet, and Plasma.</p>
            <p>Each type of component has its unique properties and can be used for different indications. The donated blood is separated into these components by the blood centre and one donated unit can save upto four lives depending on the number of components separated from your blood.</p>
        </div>
        </>
    )
}
export default About