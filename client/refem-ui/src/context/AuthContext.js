import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
/* eslint-disable react/prop-types */

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [triggerRender, setTriggerRender] = useState(null);
  const BASE_URL = process.env.REACT_APP_API;

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      if (isMounted) {
        if(triggerRender) {
                 try {
          const loggedInRes = await axios.get(
            `${BASE_URL}/api/v1/auth/loggedIn`
          );
            setLoggedIn(loggedInRes.data.info);
        } catch (err) {
           console.log(err.response);
         } 
        }

      }
    }
    fetchData();
    return () => {
      setLoggedIn(null);
      isMounted = false;
    };
  }, [triggerRender]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        triggerRender,
        setTriggerRender
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
