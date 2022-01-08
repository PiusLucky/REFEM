import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.module.css";

import { DASHBOARD } from "../../constants/routes";


axios.defaults.withCredentials = true;

const Login = () => {

  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  // trigger on component mount
  useEffect(() => {
   if (loggedIn) {
       navigate(DASHBOARD);
     }
  }, [loggedIn, navigate]);

  const notify = (msg) => toast(msg);

  const [UserData, setUserData] = useState({
    username_email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const isFormValid = ({username_email, password}) => username_email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isFormValid(UserData)) {
      setLoading(true);
      const BASE_URL = process.env.REACT_APP_API;
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/auth/login`,
          UserData,
          {
            credentials: "include",
          }
        );
        if (data?.msg) {
          notify(data.msg);
          setTimeout(() => {
            setLoading(false);
          }, 3000);

          setTimeout(() => {
            navigate(DASHBOARD);
            // window.location.reload();
          }, 3500);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          notify(`${error.response.data.msg}`);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          return;
        }
      }
    }else {
      notify(`Invalid inputs are not allowed!`);
    }

  };

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className="bg-primary signup-header text-center">
        <div className="container">
          <a href="/">
            <img src="../assets/svg/refem-logo-150.svg" alt="Refem" />
          </a>
        </div>
      </div>
      <div className="container">
        <div className="simple-login-form rounded-12 shadow-dark-80 bg-white">
          <h2 className="mb-3">Sign in</h2>
          <div className="pt-sm-1 pt-md-2 pb-2">
            <span
              className="text-gray-700 font-weight-semibold border rounded px-sm-4 py-2 d-flex align-items-center justify-content-center bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="lock-svg"
                viewBox="0 0 24 24"
                width="14.884"
                height="15.187"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M19 10h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h1V9a7 7 0 1 1 14 0v1zM5 12v8h14v-8H5zm6 2h2v4h-2v-4zm6-4V9A5 5 0 0 0 7 9v1h10z" />
              </svg>
              <span className="ps-2 py-1 my-1 lh-sm">
                Avoid sharing login details
              </span>
            </span>
          </div>
          <div className="position-relative">
            <hr className="bg-gray-200 border-gray-200 opacity-100" />
            <span className="position-absolute top-0 start-50 translate-middle text-gray-600 small bg-white px-2 px-xxl-4 text-nowrap">
              use either email or username as ID
            </span>
          </div>
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="mb-4 pb-md-2">
              <label className="form-label form-label-lg" htmlFor="Username">
                ID
              </label>
              <input
                name="identity"
                type="text"
                className="form-control form-control-xl"
                id="identity"
                placeholder="Username or Email"
                value={UserData.username_email}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    username_email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4 pb-md-2">
              <label className="form-label form-label-lg" htmlFor="Password">
                Password
              </label>
              <input
                type="password"
                className="form-control form-control-xl"
                name="password"
                id="password"
                placeholder="••••••••••••••••"
                value={UserData.password}
                onChange={(e) =>
                  setUserData({
                    ...UserData,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-xl btn-primary"
                disabled={loading}
              >
                {loading ? "Processing..." : "Sign In"}
              </button>
            </div>
            <div className="my-3 my-sm-4 d-flex">
              <Link to="/forgot-password" className="small text-gray-600 ms-auto mt-1">
                Forgot password?
              </Link>
            </div>
            <div className="border-top border-gray-200 pt-3 pt-sm-4 text-center">
              <span className="text-gray-700">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="link-primary">
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
