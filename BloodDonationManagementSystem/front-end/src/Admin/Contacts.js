import { useEffect, useState } from "react";
import styles from "./Contacts.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Contacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [query, setQuery] = useState("");
 const [pop,setPop]=useState(false);
 const [details,setDetails]=useState();
 const open=(e)=>{
    setPop(true);
    setDetails({...e});
 }

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setQuery(value);

    if (value.trim() === "") {
      setFilteredContacts(contacts); 
    } else {
      setFilteredContacts(
        contacts.filter((item) => item.Name?.toLowerCase().includes(value))
      );
    }
  };

  // const checkSessionExpiration = () => {
  //   const loginTime = localStorage.getItem("AdminloginTime");

  //   if (loginTime) {
  //     const currentTime = Date.now();
  //     const oneHour = 60 * 60 * 1000;

  //     if (currentTime - loginTime > oneHour) {
  //       localStorage.removeItem("Admin");
  //       localStorage.removeItem("loginTime");
  //       navigate("/", {
  //         state: { message: "Your session has expired. Please login again." },
  //       });
  //       navigate(0)
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const GetContacts = async () => {
    try {
      const token = Cookies.get("Admin")
      let res = await axios.get("http://localhost:4000/api/contacts", {
        headers: {
          token: token,
        },
      });

      setContacts(res.data);
      setFilteredContacts(res.data);
    } catch (err) {
        if (err.response) {
            const statusCode = err.response.status;
            if(statusCode===401){
              Cookies.remove("Admin");
                navigate("/", { state: { message: "Your login is expired. Please login again." } });
                navigate(0);
                return null;

            }
        }


    }
  };

  useEffect(() => {
    GetContacts();
  }, []);

  return (
    <>
      <h1>Contacts</h1>
      <div className={styles.searchCon}>
        <input
          className={styles.search}
          placeholder="Search"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.cards}>
        {filteredContacts.map((e) => {
          return (
            <div className={styles.card} key={e._id} onClick={()=>open(e)}>
              <div className={styles.top}>
                <div className={styles.image}>
                  <img src="user.png" alt="User" />
                </div>
                <div className={styles.name}>{e.Name}</div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.email}>
                  <img src="send.png" alt="Email" />
                  <div>{e.Email}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {pop &&
      <div className={styles.view}>
        <div className={styles.pop}>
            <div className={styles.close} onClick={()=>{setPop(false)}}>❌</div>
            <h1>Contact</h1>
            <p>Name:&nbsp;{details.Name}</p>
            <p>Email:&nbsp;{details.Email}</p>
            <p>Message:{details.Message}</p>
        </div>
      </div>
    }
    </>
  );
};

export default Contacts;
