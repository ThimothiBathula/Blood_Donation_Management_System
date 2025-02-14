import styles from './content2.module.css'

const Content2=()=>{
    return(
        <>
        <div className={styles.container}>
            <div className={styles.left}>
                <img src='content.jpg'/>
            </div>
            <div className={styles.right}>
                <h1>A SAFER,MORE PLENTIFUL 
                    <br/>SUPPLY</h1>
                <p>
                Every day in the world’s poorest countries, 
                people die because of a shortage of blood. GBF 
                helps blood collectors in these countries by 
                providing money, equipment, training and other 
                forms of support – including launching voluntary 
                blood donation programs.
                </p>
            </div>
            </div></>
    )
}

export default Content2