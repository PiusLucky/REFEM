import React, { useState } from "react";
/* eslint-disable no-unused-vars */
import { validateEmail, lengthValidator, strengthChecker } from "../../utils/validator";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DASHBOARD } from "../../constants/routes";

const Register = () => {
    const notify = (msg) => toast(msg);
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
      username: "",
      firstname: "",
      lastname: "",
      phoneNumber: "",
      email: "",
      password: "",
      repeatPassword: "",
    });

    const [ step1, setStep1 ] = useState(true)
    const [ step2, setStep2 ] = useState(false)
    const [ step3, setStep3 ] = useState(false)
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false)

    const stepActivator = (step1, step2, step3) => {
       setStep1(step1) 
       setStep2(step2) 
       setStep3(step3) 
    }

    const step1Validator = () => {
        const user = registerData
        const usernameValid = lengthValidator(user.username, 20, 6);
        if(!usernameValid) {
          setError("Username must have a minimum of 6 and maximum of 20 characters") 
        }
        const firstnameValid = lengthValidator(user.firstname, 20, 2);
        if(!firstnameValid) {
          setError("First name must have a minimum of 2 and maximum of 20 characters") 
        }
        const lastnameValid =lengthValidator(user.lastname, 20, 2);
        if(!lastnameValid) {
          setError("Last name must have a minimum of 2 and maximum of 20 characters") 
        }

        if(usernameValid && firstnameValid && lastnameValid) {
          setError("")
          stepActivator(false, true, false) 
        }
    }

    const step2Validator = () => {
        const user = registerData
        const phoneNumberValid =lengthValidator(user.phoneNumber, 18, 5);
        if(!phoneNumberValid) {
          setError("Phone number must have a minimum of 5 and maximum of 18 characters") 
        }
        const emailValid = validateEmail(user.email);
        if(!emailValid) {
          setError("Enter a valid email") 
        }

        if(phoneNumberValid && emailValid) {
          setError("")
          stepActivator(false, false, true)  
        }
    }

    const step3Validator = () => {
        const user = registerData
        
        const password = strengthChecker(user.password);
        const passwordValid = password.status !== "weak"
        if (!passwordValid) { 
            setError("Add symbols, lowercase and uppercase to make password's strength stronger!") 
        }

        const passwordMatch = user.password === user.repeatPassword
        if (!passwordMatch) { 
            setError("Password and Repeat Password fields do not match!") 
        }

        if(passwordValid && passwordMatch) {
          setError("")
          handleFinalSubmit()
        }
    }



    const handleFinalSubmit = async () => {
      try {
        setLoading(true)
        const BASE_URL = process.env.REACT_APP_API;
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/auth/register`,
          registerData,
          {
            credentials: "include",
          }
        );
        if(data.status === 201) {
           const Login = await axios.post(
             `${BASE_URL}/api/v1/auth/login`,
             {
                 username_email: registerData.username || registerData.email,
                 password: registerData.password
             },
             {
               credentials: "include",
             }
           ); 

           if (Login.data?.msg) {
             notify(data.msg);
             setTimeout(() => {
               setLoading(false);
             }, 3000);

             setTimeout(() => {
               navigate(DASHBOARD);
             }, 3500);
           }

        }
        
      } catch (error) {
        setError("")
        setLoading(false)
        notify(error.response?.data?.msg);
      }
    };

    const validator = () => {
        const user = registerData
        const usernameValid = lengthValidator(user.username, 20, 6);

        const passwordValid = strengthChecker(user.password);
        if (passwordValid === "strong" || passwordValid === "medium") { 
            setError("Add symbols, lowercase and uppercase to make password's strength stronger!") 
        }

        const passwordMatch = user.password === user.repeatPassword
        if (passwordValid === "strong" || passwordValid === "medium") { 
            setError("Password and Repeat Password fields do not match!") 
        }

    }


    return (
      <>
        <ToastContainer autoClose={3000} />
        <div className="bg-primary signup-header text-center">
          <div className="container">
            <a href="#">
              <img src="../assets/svg/refem-logo-150.svg" alt="Refem" />
            </a>
          </div>
        </div>
        <div className="container">
          <div className="simple-login-form rounded-12 shadow-dark-80 bg-white">
            <h2 className="mb-3">Getting Started</h2>
            {/* // Make this conditional in React */}
            {step1 && <ul className="step-list zero-m-bottom mb-4 mb-md-5">
      <li className="active">
      <span className="circle circle-lg bg-primary">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.394 12L10 7.737v8.526L16.394 12zm2.982.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z" fill="rgba(255,255,255,1)"/></svg>
      </span>
      <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">Basic Info</h5>
      </li>
      <li>
        <span className="circle circle-lg bg-gray-200">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z" fill="grey"/></svg>
        </span>
      <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">Contact</h5>
      </li>
      <li>
      <span className="circle circle-lg bg-gray-200">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="grey"/></svg>
      </span>
      <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">Finish!</h5>
      </li>
      </ul> }
            {step2 && 
                <>
                <ul className="step-list zero-m-bottom mb-4 mb-md-5">
                  <li className="active">
                    <span className="circle circle-lg bg-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M16.394 12L10 7.737v8.526L16.394 12zm2.982.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"
                          fill="rgba(255,255,255,1)"
                        />
                      </svg>
                    </span>
                    <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">Basic Info</h5>
                  </li>
                  <li className="active">
                    <span className="circle circle-lg bg-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z"
                          fill="rgba(255,255,255,1)"
                        />
                      </svg>
                    </span>
                    <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">Contact</h5>
                  </li>
                  <li>
                    <span className="circle circle-lg bg-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={24}
                        height={24}
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
                          fill="grey"
                        />
                      </svg>
                    </span>
                    <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">Finish!</h5>
                  </li>
                </ul>
                </>

            }
            {/* // step 3 */}
            {step3 && <ul className="step-list zero-m-bottom mb-4 mb-md-5">
              <li className="active">
                <span className="circle circle-lg bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M16.394 12L10 7.737v8.526L16.394 12zm2.982.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                </span>
                <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">
                  Basic Info
                </h5>
              </li>
              <li className="active">
                <span className="circle circle-lg bg-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M9.366 10.682a10.556 10.556 0 0 0 3.952 3.952l.884-1.238a1 1 0 0 1 1.294-.296 11.422 11.422 0 0 0 4.583 1.364 1 1 0 0 1 .921.997v4.462a1 1 0 0 1-.898.995c-.53.055-1.064.082-1.602.082C9.94 21 3 14.06 3 5.5c0-.538.027-1.072.082-1.602A1 1 0 0 1 4.077 3h4.462a1 1 0 0 1 .997.921A11.422 11.422 0 0 0 10.9 8.504a1 1 0 0 1-.296 1.294l-1.238.884zm-2.522-.657l1.9-1.357A13.41 13.41 0 0 1 7.647 5H5.01c-.006.166-.009.333-.009.5C5 12.956 11.044 19 18.5 19c.167 0 .334-.003.5-.01v-2.637a13.41 13.41 0 0 1-3.668-1.097l-1.357 1.9a12.442 12.442 0 0 1-1.588-.75l-.058-.033a12.556 12.556 0 0 1-4.702-4.702l-.033-.058a12.442 12.442 0 0 1-.75-1.588z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                </span>
                <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">
                  Contact
                </h5>
              </li>
              <li className="active">
                <span className="circle circle-lg bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"
                      fill="rgba(128,0,128,1)"
                    />
                  </svg>
                </span>
                <h5 className="mb-0 mt-3 font-weight-semibold reduce-font">
                  Finish!
                </h5>
              </li>
            </ul>}
            <div className="pt-sm-1 pt-md-2 pb-2">
              <span
                className="text-gray-700 font-weight-semibold border rounded px-sm-4 py-2 d-flex align-items-center justify-content-center bg-white"
              >
              {!error &&
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
              }
                <span className={`ps-2 py-1 my-1 lh-sm ${error?"text-danger":""}`}>
                  {error?error:"Only relevant data will be emailed."}
                </span>
              </span>
            </div>
            <div className="position-relative">
              <hr className="bg-gray-200 border-gray-200 opacity-100" />
              <span className="position-absolute top-0 start-50 translate-middle text-gray-600 small bg-white px-2 px-xxl-4 text-nowrap">
               Do provide authentic information. Thanks.
              </span>
            </div>
            <form className="pt-3">
              <div className="row">
                 {step1 &&
                     <>
                <div className="col-md-6 mb-4 pb-md-2">
                    <label className="form-label form-label-lg" htmlFor="FirstName">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-xl"
                      id="FirstName"
                      value={registerData.firstname}
                      placeholder="First name"
                      required
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          firstname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-md-6 mb-4 pb-md-2">
                    <label className="form-label form-label-lg" htmlFor="LastName">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-xl"
                      id="LastName"
                      placeholder="Last name"
                      value={registerData.lastname}
                      required
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          lastname: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 pb-md-2">
                    <label className="form-label form-label-lg" htmlFor="Username">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-xl"
                      id="Username"
                      value={registerData.username}
                      placeholder="Your username"
                      required
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                  </>
                 }   
                {step2 &&
                  <>
                    <div className="mb-4 pb-md-2">
                      <label className="form-label form-label-lg" htmlFor="phoneNumber">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-xl"
                        id="phoneNumber"
                        value={registerData.phoneNumber}
                        placeholder="Phone Number"
                        required
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4 pb-md-2">
                      <label className="form-label form-label-lg" htmlFor="EmailAddress">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-xl"
                        id="EmailAddress"
                        value={registerData.email}
                        placeholder="Your Email"
                        required
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                }
                {step3 &&
                    <>
                <div className="mb-4 pb-md-2">
                  <label className="form-label form-label-lg" htmlFor="Password">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-xl"
                    id="Password"
                    placeholder="••••••••••••••••"
                    value={registerData.password}
                    required
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4 pb-md-2">
                  <label className="form-label form-label-lg" htmlFor="RPassword">
                    Repeat Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-xl"
                    id="RPassword"
                    placeholder="••••••••••••••••"
                    value={registerData.repeatPassword}
                    required
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        repeatPassword: e.target.value,
                      })
                    }
                  />
                </div>
                </>
                }

                <div className={`${!step1?"row flex-now":"d-grid"}`}>
                {!step1 &&
                <button disabled={loading?true:false} className="col-md-5 btn btn-xl  btn-outline-primary" type="button" onClick={step2?() => stepActivator(true, false, false):() => stepActivator(false, true, false)}>
                  Back
                </button>
                }

                  <button disabled={loading?true:false} className={`btn btn-xl btn-primary ${!step1?"col-md-5":""}`} type="button" onClick={step1?() => step1Validator():step2?() => step2Validator():() => step3Validator()}>
                    {step3? loading?
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              style={{ margin: "auto", background: "none" }}
                              width="50"
                              height="40"
                              display="block"
                              preserveAspectRatio="xMidYMid"
                              viewBox="0 0 100 100"
                            >
                              <circle cx="30" cy="50" r="20" fill="purple">
                                <animate
                                  attributeName="cx"
                                  begin="-0.5s"
                                  dur="1s"
                                  keyTimes="0;0.5;1"
                                  repeatCount="indefinite"
                                  values="30;70;30"
                                ></animate>
                              </circle>
                              <circle cx="70" cy="50" r="20" fill="#fff">
                                <animate
                                  attributeName="cx"
                                  begin="0s"
                                  dur="1s"
                                  keyTimes="0;0.5;1"
                                  repeatCount="indefinite"
                                  values="30;70;30"
                                ></animate>
                              </circle>
                              <circle cx="30" cy="50" r="20" fill="purple">
                                <animate
                                  attributeName="cx"
                                  begin="-0.5s"
                                  dur="1s"
                                  keyTimes="0;0.5;1"
                                  repeatCount="indefinite"
                                  values="30;70;30"
                                ></animate>
                                <animate
                                  attributeName="fill-opacity"
                                  calcMode="discrete"
                                  dur="1s"
                                  keyTimes="0;0.499;0.5;1"
                                  repeatCount="indefinite"
                                  values="0;0;1;1"
                                ></animate>
                              </circle>
                            </svg>
                        :"Finish!":"Next"}
                  </button>
                </div>
                {step3 &&
                <div className="my-3 my-sm-4 d-flex pb-1">
                  <label
                    className="form-check-label small text-gray-600"
                    htmlFor="gridCheck"
                  >
                    By clicking “
                    <a href="#0" className="text-gray-600">
                      Finish
                    </a>
                    ”, you agree that your <strong>firstname</strong>,{" "}
                    <strong>lastname</strong>, <strong>phone number</strong> and{" "}
                    <strong>email</strong> are to be sent to your recruiter (or
                    potential employer).
                  </label>
                </div>
                }
                <div className="border-top border-gray-200 pt-3 pt-sm-4 text-center">
                  <span className="text-gray-700">
                    Already have an account?{" "}
                    <Link to="/login" className="link-primary">
                      Sign in
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    )
}

export default Register;