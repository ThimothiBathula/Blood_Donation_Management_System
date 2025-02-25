import { useState } from "react";
import Carousel from "./Carousle"
import Content1 from "./Content1"
import Content2 from './Content2'
import styles from './Home.module.css'
import { useLocation } from "react-router-dom";
const Home=()=>{
    const location = useLocation();
    const message = location.state?.message;
    const [showMessage, setShowMessage] = useState(!!message);
    return(
        <>
         {showMessage && message && (<div className={styles.alert}>
            <div className={styles.content}>{message}</div>
         <div className={styles.cross} onClick={()=>setShowMessage(false)}>❌</div>
         </div>
         )}
       <Carousel/>
       <Content2/>
       <Content1/>
        </>
    )
}
export default Home