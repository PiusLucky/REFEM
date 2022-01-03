import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { DASHBOARD, LOGIN } from "../../constants/routes";
import SVGCustomLoader from "../SVGCustomLoader";


const EmailVerify = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { setLoggedIn } = useContext(AuthContext);
  const BASE_URL = process.env.REACT_APP_API;


  const logout = async (e) => {
    try {
      e.preventDefault();
      await axios.get(`${BASE_URL}/api/v1/auth/logout`);
      await setLoggedIn(null);
      window.location.href = LOGIN
    } catch (err) {
      return err
    }
  };

  const [searchParams] = useSearchParams();

  const token = searchParams.get("token")
  const email = searchParams.get("email")

  useEffect(() => {
     let isMounted = true;
     async function fetchData() {
       if (isMounted) {
         try {
            const { data } = await axios.post(
              `${BASE_URL}/api/v1/auth/email-verify?email=${email}&token=${token}`,
              {
                credentials: "include",
              }
            );
            setError('')
            setSuccess(data.msg)
            setTimeout(() => {
              navigate(DASHBOARD);
            }, 2500);
         } catch (err) { 
            setSuccess('')
            setError(err.response.data)
         }
       }
     }
     fetchData();

     return () => {
       isMounted = false;
     };


  }, [BASE_URL, token, email, navigate])

  return (
    <>
      <div className="bg-primary signup-header text-center">
        <div className="container">
          <a href="#">
            <img src="../assets/svg/refem-logo-150.svg" alt="Refem" />
          </a>
        </div>
      </div>
      <div className="container">
        <div className="simple-login-form rounded-12 shadow-dark-80 bg-white mb-0 text-center">
          <h2 className="mb-3">Email Verification</h2>
          <form className="pt-md-1">
            <p className="text-gray-700 pb-md-4">
              {error?.msg? <span className="text-danger">Oops, we failed to verify your email, check reason below </span> : 
              <span className="text-success">{success} </span>  } <br />
              <br />
              {error?.msg? <span>Reason: {error.msg} </span>: success ? "You will be redirected to the Dashboard within a few seconds": <SVGCustomLoader />}
              {error?._help && (
                <p>
                  <br />
                   <span className={`${error?.status === 401? "text-success":"text-danger"}`}>Hint: {error?._help}</span> 
                  </p> 
              )
              }
            </p>

            <div className="d-grid pb-1">
              <button type="button" className="btn btn-xl btn-primary" onClick={() => navigate(DASHBOARD)}>
                Go to Dashboard
              </button>
            </div>
            <div className="mt-3 mt-sm-4 border-top border-gray-200 pt-3">
              <p className="text-gray-700 mb-0">
                Feel something ain&apos;t right?{" "}
                <a href="#0"  onClick={ (e) => logout(e)} className="link-primary">
                  Logout
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-600 small">
            If you’re having any trouble verifying your mail, contact the{" "}
            <a href="#" className="text-gray-600">
              <u>developer</u>
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
