import { useState } from "react";
import styles from "./doner.module.css";

const Doner = ({ donor, onClose }) => {
    if (!donor) return null; 

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>✖</button>
                <div className={styles.header}>
                    <img className={styles.img} src={`http://localhost:4000/images/${donor.Image}`} alt="Donor" />
                    <h2>{donor.Name}</h2>
                </div>
                <div className={styles.content}>
                    <p><strong>Age:</strong> {donor.Age}</p>
                    <p><strong>Blood Group:</strong> {donor.BloodGroup}</p>
                    <p><strong>Phone:</strong> {donor.Phone}</p>
                    <p><strong>Location:</strong> {donor.Email}</p>
                </div>
                <div className={styles.actions}>
                    <a href={`https://wa.me/${donor.Phone}`} className={styles.contactButton}>Contact</a>
                    <button className={styles.closeModal} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Doner;
