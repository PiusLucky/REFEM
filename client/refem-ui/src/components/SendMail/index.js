import React, {useEffect} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { addDays, subMonths } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DOMPurify from "dompurify";
import axios from "axios";
/* eslint-disable react/prop-types */

const SendMailComp = ({
  handleCheckbox,
  handleDateChange,
  handleRoleChange,
  formInputsValid,
  setLoading,
  sendMailData,
  setSendMailData,
  setPreviewHtml,
  options,
  Roles,
  setSuccessCompile,
  startDate,
  loggedIn,
  apiUsed,
  notify,
  setMailComp,
  used,
  activateResumeUpload
}) => {
  // apex const declarations
  const BASE_URL = process.env.REACT_APP_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    document.body.classList.toggle("customize-box");

    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/mail/preview`,
        sendMailData,
        {
          credentials: "include",
        }
      );
      const sanitizeHtml = DOMPurify.sanitize(data.html);
      setPreviewHtml(sanitizeHtml);
      setSuccessCompile(true);
      setLoading(false);
      notify(data.msg);
      // if (!loading) {
      //   document
      //     .querySelector(".simplebar-content-wrapper")
      //     .classList.remove("only-on-load");
      // }
    } catch (error) {
      setLoading(false);
      setSuccessCompile(false);
    }
  };

  //useEffect
  useEffect(() => {
    let mounted = true;
    if (mounted) {
       setMailComp(true)
    }
    return () => {
      setMailComp(false)
      mounted = false;
    };
  }, []);

  return (
    <div className="container-fluid px-0">
      <div className="row">
        <div className="col-md-6 col-lg-12 col-xl-6 col-xxl-3">
          <div className="card mb-4 rounded-12 shadow">
            <div className="card-body p-3 p-xl-3 p-xxl-4">
              <div className="row align-items-center">
                <div className="col-5 col-xxl-6">
                  <span className="caption text-gray-600 d-block mb-1">
                    <svg
                      aria-hidden="true"
                      role="img"
                      style={{ verticalAlign: "-0.125em" }}
                      width="14"
                      height="14"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                    {loggedIn?.ipGeo.ip}
                  </span>
                  <span className="h3 mb-0">{loggedIn?.ipGeo.country}</span>
                  <span className="d-block fs-11 mt-2 font-weight-semibold">
                    {loggedIn?.ipGeo.countryCode} ({`${loggedIn?.ipGeo?.longitude}' ${loggedIn?.ipGeo?.latitude}'`})
                  </span>
                </div>
                <div className="col-7 col-xxl-6 pe-xxl-0">
                  <img src={loggedIn?.ipGeo.flag} alt="country flag" className="country-flag" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-12 col-xl-6 col-xxl-3">
          <div className="card mb-4 rounded-12 shadow">
            <div className="card-body p-3 p-xl-3 p-xxl-4">
              <div className="row align-items-center">
                <div className="col-5 col-xxl-6">
                  <span className="caption text-gray-600 d-block mb-1">
                    Email Sent
                  </span>
                  <span className="h3 mb-0">{loggedIn?.mails.length}</span>
                  <span className="d-block fs-11 mt-2 font-weight-semibold">
                    <svg
                      className="me-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                    >
                      <g
                        data-name="icons/tabler/trend-up"
                        transform="translate(0)"
                      >
                        <rect
                          data-name="Icons/Tabler/Trend background"
                          width="16"
                          height="16"
                          fill="none"
                        />
                        <path
                          d="M.249,9.315.18,9.256a.616.616,0,0,1-.059-.8L.18,8.385,5.1,3.462A.616.616,0,0,1,5.9,3.4l.068.059L8.821,6.309,13.9,1.231H9.641A.616.616,0,0,1,9.031.7L9.025.616a.617.617,0,0,1,.532-.61L9.641,0h5.728a.614.614,0,0,1,.569.346h0l0,.008,0,.008h0a.613.613,0,0,1,.048.168V.541A.621.621,0,0,1,16,.61V6.359a.616.616,0,0,1-1.226.083l-.005-.083V2.1L9.256,7.615a.616.616,0,0,1-.8.059l-.069-.059L5.539,4.768,1.05,9.256a.615.615,0,0,1-.8.059Z"
                          transform="translate(0 3)"
                          fill="#20C997"
                        />
                      </g>
                    </svg>
                    success
                  </span>
                </div>
                <div className="col-7 col-xxl-6 pe-xxl-0">
                  <span className="badge badge-lg badge-warning text-uppercase">Daily Threshold ~ {used}/50 </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div
            className="bg-blue-50 p-4 p-md-5 position-relative overflow-hidden rounded-12 mb-4 alert alert-dismissible zIndex-0"
            role="alert"
          >
            <div className="row mb-0 mb-sm-5 mb-md-0 ps-xl-3">
              <div className="col-lg-12 col-xl-8 col-xxl-4 pb-md-5 mb-md-5 mb-lg-0">
                <a
                  className="btn btn-light btn-icon rounded-pill position-absolute top-16 end-16"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                >
                  <svg
                    data-name="icons/tabler/close"
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                  >
                    <rect
                      data-name="Icons/Tabler/Close background"
                      width="16"
                      height="16"
                      fill="none"
                    />
                    <path
                      d="M.82.1l.058.05L6,5.272,11.122.151A.514.514,0,0,1,11.9.82l-.05.058L6.728,6l5.122,5.122a.514.514,0,0,1-.67.777l-.058-.05L6,6.728.878,11.849A.514.514,0,0,1,.1,11.18l.05-.058L5.272,6,.151.878A.514.514,0,0,1,.75.057Z"
                      transform="translate(2 2)"
                      fill="#1E1E1E"
                    />
                  </svg>
                </a>
                <span className="badge badge-lg badge-warning text-uppercase">
                  Become a Pro
                </span>
                <h2 className="my-2">
                  Send Up to 100,000 Email Daily{" "}
                  <img
                    src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/right-arrow.svg"
                    className="ms-2 arrow-icon"
                    alt="img"
                  />
                </h2>
              </div>
              <div className="col-lg-8">
                <div className="get-started-img">
                  <img
                    src="../assets/img/get-started.png"
                    className="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xl-8 mb-4">
          <div className="card rounded-12 shadow-dark-80">
            <div className="card-body px-0">
              <form className="pt-3" onSubmit={handleSubmit}>
                <div className="d-flex align-items-center border-bottom border-gray-200 pb-3 mb-2 px-3 px-md-4">
                  <h5 className="card-header-title mb-0 font-weight-semibold ps-md-2">
                    Alert Recruiter
                  </h5>

                  <div className="ms-auto pe-md-2">
                    <div className="dropdown export-dropdown">
                      <a
                        role="button"
                        id="UserOverview"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className="btn btn-outline-dark border-gray-700 text-gray-700 px-3"
                      >
                        <span>{sendMailData.positionType} Role </span>
                        <svg
                          className="ms-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                        >
                          <rect
                            data-name="Icons/Tabler/Chevron Down background"
                            width="13"
                            height="13"
                            fill="none"
                          />
                          <path
                            d="M.214.212a.738.738,0,0,1,.952-.07l.082.07L7.1,5.989a.716.716,0,0,1,.071.94L7.1,7.011l-5.85,5.778a.738.738,0,0,1-1.034,0,.716.716,0,0,1-.071-.94l.071-.081L5.547,6.5.214,1.233A.716.716,0,0,1,.143.293Z"
                            transform="translate(13 3.25) rotate(90)"
                            fill="#495057"
                          />
                        </svg>
                      </a>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="UserOverview"
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={(e) => handleRoleChange(e)}
                          >
                            <span>{Roles.default}</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={(e) => handleRoleChange(e)}
                          >
                            <span>{Roles.backend}</span>
                          </button>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={(e) => handleRoleChange(e)}
                          >
                            <svg
                              aria-hidden="true"
                              role="img"
                              style={{ verticalAlign: "-0.125em" }}
                              width="22"
                              height="22"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 24 24"
                            >
                              <rect
                                x="0"
                                y="0"
                                width="24"
                                height="24"
                                fill="none"
                                stroke="none"
                              />
                              <path d="M3 20h18v2H3z" fill="currentColor" />
                              <path
                                d="M21 19H3L2.147 7.81A2 2 0 1 1 5 6a1.914 1.914 0 0 1-.024.3l2.737 2.189l2.562-4.486A1.948 1.948 0 0 1 10 3a2 2 0 0 1 4 0a1.946 1.946 0 0 1-.276 1.004l2.558 4.485l2.741-2.19A1.906 1.906 0 0 1 19 6a2 2 0 1 1 2.853 1.81zM4.92 17h14.16l.73-8.77l-4.106 3.281L12 5.017l-3.71 6.494l-4.1-3.28z"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="ms-2">{Roles.fullstack}</span>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body-inner px-3 px-md-4 mt-5">
                  <div className="mb-4 pb-md-2">
                    <label
                      className="form-label form-label-lg"
                      htmlFor="subjectLine"
                    >
                      Subject Line
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-xl"
                      id="subjectLine"
                      required
                      placeholder="e.g Senior Developer, Frontend, DevOps Application."
                      value={sendMailData.subjectLine}
                      onChange={(e) =>
                        setSendMailData({
                          ...sendMailData,
                          subjectLine: e.target.value.replaceAll(/Role/gi, ""),
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 pb-md-2">
                    <label
                      className="form-label form-label-lg"
                      htmlFor="recruiterName"
                    >
                      Recruiter Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-xl"
                      id="recruiterName"
                      placeholder="(optional)"
                      value={sendMailData.recruiterName}
                      onChange={(e) =>
                        setSendMailData({
                          ...sendMailData,
                          recruiterName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 pb-md-2">
                    <label
                      className="form-label form-label-lg"
                      htmlFor="recruiterEmail"
                    >
                      Recruiter Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-xl"
                      id="recruiterEmail"
                      placeholder="recruiter@andela.com"
                      required
                      value={sendMailData.recruiterEmail}
                      onChange={(e) =>
                        setSendMailData({
                          ...sendMailData,
                          recruiterEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 pb-md-2">
                    <label
                      className="form-label form-label-lg"
                      htmlFor="companyName"
                    >
                      Company&apos;s Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-xl"
                      id="companyName"
                      placeholder="Andela"
                      required
                      value={sendMailData.companyName}
                      onChange={(e) =>
                        setSendMailData({
                          ...sendMailData,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-4 pb-md-2">
                    <label
                      className="form-label form-label-lg"
                      htmlFor="Username"
                    >
                      Resume Submission Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => handleDateChange(date)}
                      minDate={subMonths(new Date(), 3)}
                      maxDate={addDays(new Date(), 0)}
                      placeholderText="Resume Submission Date"
                      className="form-control form-control-xl"
                    />
                  </div>
                  <div className="badge bg-teal-50 text-teal-500">
                    Template
                  </div>
                  <div className="my-3 my-sm-4 d-flex">
                    <div className="form-check form-check-sm mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="gridCheck"
                        defaultChecked={true}
                        onChange={(e) => handleCheckbox(e)}
                      />
                      <label
                        className="form-check-label small text-gray-600"
                        htmlFor="gridCheck"
                      >
                        Use Custom Template (optional)
                      </label>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-xl btn-primary"
                      disabled={loggedIn?.isVerified? !formInputsValid? true: false: true}
                    >
                      {loggedIn?.isVerified
                        ? "Preview"
                        : "Please verify to continue"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4 mb-4">
          <div className="card h-100 rounded-12 shadow-dark-80">
            <div className="card-body px-0">
              <div className="d-flex align-items-center border-bottom border-gray-200 pb-3 mb-2 px-3 px-md-4">
                <h5 className="card-header-title mb-0 font-weight-semibold ps-md-2">
                  API Usage
                </h5>

                <div className="ms-auto pe-md-2 dropdown">
                  <a
                    role="button"
                    id="morebtn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    className="btn btn-dark-100 btn-icon btn-sm rounded-circle"
                  >
                    <svg
                      data-name="Icons/Tabler/Notification"
                      xmlns="http://www.w3.org/2000/svg"
                      width="13.419"
                      height="13.419"
                      viewBox="0 0 13.419 13.419"
                    >
                      <rect
                        data-name="Icons/Tabler/Dots background"
                        width="13.419"
                        height="13.419"
                        fill="none"
                      />
                      <path
                        d="M0,10.4a1.342,1.342,0,1,1,1.342,1.342A1.344,1.344,0,0,1,0,10.4Zm1.15,0a.192.192,0,1,0,.192-.192A.192.192,0,0,0,1.15,10.4ZM0,5.871A1.342,1.342,0,1,1,1.342,7.213,1.344,1.344,0,0,1,0,5.871Zm1.15,0a.192.192,0,1,0,.192-.192A.192.192,0,0,0,1.15,5.871ZM0,1.342A1.342,1.342,0,1,1,1.342,2.684,1.344,1.344,0,0,1,0,1.342Zm1.15,0a.192.192,0,1,0,.192-.192A.192.192,0,0,0,1.15,1.342Z"
                        transform="translate(5.368 0.839)"
                        fill="#6c757d"
                      />
                    </svg>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="morebtn">
                    <li className="dropdown-sub-title">
                      <span>More Options</span>
                    </li>
                    <li>
                      <a href="/documentation" role="button" className="dropdown-item">
                        <svg
                          data-name="Icons/Tabler/Paperclip"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <rect
                            data-name="Icons/Tabler/Paperclip background"
                            width="16"
                            height="16"
                            fill="none"
                          ></rect>
                          <path
                            d="M6.766,1.178A4.018,4.018,0,0,1,12.591,6.71l-.147.155-5.1,5.11A2.352,2.352,0,0,1,3.9,8.77l.114-.123,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11a.981.981,0,0,0,1.3,1.465l.086-.076,5.1-5.11A2.648,2.648,0,0,0,7.861,2.028l-.127.119-5.1,5.11a4.315,4.315,0,0,0,5.941,6.255l.156-.149,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11A5.685,5.685,0,0,1,1.5,6.457l.162-.169Z"
                            transform="translate(1)"
                            fill="#1e1e1e"
                          ></path>
                        </svg>
                        <span className="ms-2">Documentation</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="d-flex justify-content-center mt-4 custom-flex">
                <div className="custom-flex--progressbar">
                  <span className="font-weight-semibold mb-3 d-block text-gray-700">
                    <span className="text-success">{apiUsed}%</span> of SendMail
                    API Consumed
                  </span>
                  <div
                    className="progress rounded-pill"
                    style={{ height: "5px", width: "100%" }}
                  >
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{
                        width: `${apiUsed}%`,
                        ariaValueNow: apiUsed,
                        ariaValueMin: "0",
                        ariaValueMax: "100",
                      }}
                    ></div>
                  </div>
                </div>
                <HighchartsReact highcharts={Highcharts} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xxl-7 mb-4">
          <div className="bg-blue-50 p-4 p-md-5 position-relative overflow-hidden rounded-12 h-100 zIndex-0">
            <div className="row ps-xl-3 pt-xl-3">
              <div className="col-lg-6 col-xl-6 pb-md-5 pb-md-0 mb-md-5 mb-lg-0 pe-xxl-0">
                <span className="badge badge-lg badge-warning text-uppercase">
                  Upload Resume
                </span>
                <h2 className="mt-2 h1 pt-1 mb-4 pb-1">
                  Is your resume looking a little rusty?
                </h2>
                <a className="btn btn-xl btn-dark" onClick={(e) => activateResumeUpload(e)}>Upload Resume</a>
                <p className="text-gray-600 small pt-3">
                  ***Without a resume, you cannot send mail(s).
                </p>
              </div>
              <div className="col-lg-6">
                <div className="get-startedtwo">
                  <img
                    src="../assets/img/resume-in-drawer.png"
                    className="img-fluid"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMailComp;
