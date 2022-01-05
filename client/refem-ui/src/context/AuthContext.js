import React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
/* eslint-disable react/prop-types */
import moment from "moment";
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [triggerRender, setTriggerRender] = useState(null);
  const BASE_URL = process.env.REACT_APP_API;
  const MAX_API_HOURS = 24;

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      if (isMounted) {
        if (triggerRender) {
          console.log("Triggered again");
          try {
            const loggedInRes = await axios.get(
              `${BASE_URL}/api/v1/auth/loggedIn`
            );

            console.log(loggedInRes);

            if(loggedInRes) {
              const initialDate = loggedInRes?.usage?.date;
              const initialDate24 = moment(initialDate).add(
                MAX_API_HOURS,
                "hours"
              ).valueOf();
              const currentDate = moment().add(1, "hours").valueOf()
              if (
                initialDate24 <= currentDate
              ) {
                await axios.get(`${BASE_URL}/api/v1/mail/zero-count`);
                setTriggerRender(true)
              }
            }

            
            setLoggedIn(loggedInRes.data.info);
          } catch (err) {
            console.log(err);
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
        setTriggerRender,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
