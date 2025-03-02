import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import classNames from "classnames";
import styles from './submits.module.css';

const Submits = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedCard, setExpandedCard] = useState(null);

  const Delete = async (id) => {
    const token = Cookies.get('user');  
    if (!token) {
      setError("Unauthorized access. Please log in.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/delete/${id}`, {
        headers: {
          'token': token
        }
      });

      
      setData(data.filter(item => item._id !== id));
    } catch (err) {
      setError("Failed to delete submission. Please try again.");
    }
  };

 
  useEffect(() => {
    const fetchSubmits = async () => {
      try {
        const token = Cookies.get("user"); 
        if (!token) {
          setError("Unauthorized access. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:4000/api/submits", {
          headers: {
            token: token,
          },
        });

        if (response.data.message) {
          setError(response.data.message);
        } else {
          setData(response.data);
        }
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmits();
  }, []);

  const handleView = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className={styles.submitsContainer}>
      <h2>User Submissions</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && data.length === 0 && (
        <p className={styles.noData}>No submissions found.</p>
      )}
      {!loading && data.length > 0 && (
        <div className={styles.cardList}>
          {data.map((item, index) => (
            <div
              key={index}
              className={classNames(styles.card, {
                [styles.expanded]: expandedCard === index,
              })}
            >
              <div className={styles.cardContent}>
                <h3>Name:&nbsp;{item.Name}</h3>
                <p><span>Blood Group:</span>&nbsp;{item.BloodGroup}</p>
                {expandedCard === index && (
                  <div className={styles.cardDetails}>
                    <p><span>Age:</span>&nbsp;{item.Age}</p>
                    <p><span>Email:</span>&nbsp;{item.Email}</p>
                    <p><span>Last Blood Donate:</span>&nbsp;{item.LastBloodDonate}</p>
                    <p><span>Phone:</span>&nbsp;{item.Phone}</p>
                  </div>
                )}
                <div className={styles.cardActions}>
                  <button onClick={() => handleView(index)}>
                    {expandedCard === index ? "Collapse" : "View"}
                  </button>
                  <button onClick={() => Delete(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Submits;
