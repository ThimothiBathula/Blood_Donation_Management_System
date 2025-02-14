import { useEffect, useState } from 'react'
import styles from './doners.module.css'
import axios from 'axios'


const SkeletonLoader = () => (
    <div className={styles.detailsSkeleton}>
    <div className={styles.ImgSkeleton}></div>
    <div className={styles.detailsContent}>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
    </div>
    <div className={styles.contactButton}>
        <div className={styles.skeletonButton}></div>
        <div className={styles.skeletonButton}></div>
    </div>
</div>
);



const Doners=()=>{
    const [doners,setDoners]=useState(null)
    const GetDoners=async()=>{
    let response= await axios.get('http://localhost:4000/api/doners')
        setDoners(response.data)
    }
useEffect(()=>{
    setTimeout(()=>{
        GetDoners()
    },3000)
   
},[])
    return(
        <>
        { !doners ?<>
        <SkeletonLoader/>
        <SkeletonLoader/>
        <SkeletonLoader/>
        </>:

        doners.map(element => {
            return(
            <div className={styles.deatils} key={element._id}>
            <div className={styles.Img}><img className={styles.img}src={`http://localhost:4000/images/${element.Image}`}/></div>

            <div className={styles.details}>
                <p>Name:&nbsp;{element.Name}</p>
                <p>Age&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{element.Age}</p>
                <p>Group:&nbsp;{element.BloodGroup}</p>
                
            </div>
            <div className={styles.contactButton}>
                <button>
                    <a href={'https://wa.me/'+element.Phone}>Contact</a></button>
                <button>View</button>
            </div>
        </div>
            )
      
            
      
          })
        }
        </>
    )
}


export default Doners
