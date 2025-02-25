import { useState, useEffect } from "react";
import { Navigate, Outlet} from "react-router-dom";

const UserAuthenticate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const validate = async () => {
    const userToken = localStorage.getItem("Admin");
    if (userToken) {
      setIsAuthenticated(true); 
    }
    else{
      setIsAuthenticated(false); 
    }
  };

  useEffect(() => {
    validate(); 
  }, []); 
  return isAuthenticated ? <Outlet /> : <Navigate to="/adminLog" />;
};

export default UserAuthenticate;
