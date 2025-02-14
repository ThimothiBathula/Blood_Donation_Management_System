import styles from './donerPage.module.css'
const DonerPage=()=>{
    return(
        <>
        <div className={styles.Img}>
            <div className={styles.img}>Image</div>
        </div>
        <div className={styles.details}>
            <h5>Name:</h5>
            <h5>Age:</h5>
            <h5>Phone:</h5>
            <h5>Email:</h5>
            <h5>Blood Group:</h5>
            <h5>Gender:</h5>
            <h5>Medical History:</h5>
            <h5>Last Blood Donate Date:</h5>
            <h5>Address:</h5>
        </div>
        <div className={styles.Button}>
        <button>Contact</button>
        </div>
        </>
    )
}

export default DonerPage