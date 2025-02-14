import React, { useState } from 'react';
import styles from  './carousle.module.css'

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const Images=['0.jpg','1.jpg','2.jpg']
  const length = 3;
  const handlePrevious = () => {
    const newIndex = index - 1;
   setIndex(newIndex < 0 ? length - 1 : newIndex);
  };
  const Next=">"
  const Previous="<"
  const handleNext = () => {
    const newIndex = index + 1;
    setIndex(newIndex >= length ? 0 : newIndex);
  };
  setTimeout(()=>{
    if(index===2){
        setIndex(0)
    }
    else{
        setIndex(index+1)
    }
  },5000)
  return (
    <div className={styles.carousel}>
      <button onClick={handlePrevious} className={styles.Previous}>{Previous}</button>

     
      <img src={Images[index]} className={styles.CarousleImg}/>
      <button onClick={handleNext} className={styles.Next}>{Next}</button>
      {/* <p>{index}</p> */}
    </div>
  );
};

export default Carousel;