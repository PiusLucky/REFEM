import React, { useRef, useState, useEffect, useContext } from "react";
// import Chart from 'react-apexcharts'
// import ApexCharts from 'apexcharts'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import AuthContext from "../../context/AuthContext";
import { LOGIN } from "../../constants/routes";
import { shortenString } from "../../utils/stringShortener";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import startTimer from "../../utils/timer";
import returnNull from "../../utils/returnNull";
import { validateEmail, validateDate } from "../../utils/validator";
import { addDays, subMonths } from "date-fns";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import DOMPurify from "dompurify";
import SVGCustomLoader from "../SVGCustomLoader";

const Dashboard = () => {
  const BASE_URL = process.env.REACT_APP_API;
  let today = new Date();
  const { loggedIn, setLoggedIn, triggerRender, setTriggerRender } = useContext(
    AuthContext
  );
  const [startDate, setStartDate] = useState(today);
  const [hasResume, setHasResume] = useState(false);
  const [successCompile, setSuccessCompile] = useState(false);
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);
  const dateFormatted = (date) => {
    if (date) {
      return moment(date).format("DD/MM/YYYY");
    }
  };

  const [previewHtml, setPreviewHtml] = useState(null);

  // sendMail Functionality
  const [sendMailData, setSendMailData] = useState({
    subjectLine: "",
    recruiterName: "",
    recruiterEmail: "",
    resumeSubmissionDate: dateFormatted(today),
    rawDate: today,
    companyName: "",
    positionType: "Frontend",
    templateType: "Email01",
  });

  const [formInputsValid, setFormInputsValid] = useState(false);
  const [apiUsed, setApiUsed] = useState(0);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (loggedIn) {
        const count = loggedIn.usage.count;
        const percent = parseInt((count / 50) * 100);
        setApiUsed(percent);
      }
    }
    return () => {
      mounted = false;
    };
  }, [loggedIn]);

  const count = loggedIn?.usage?.count;
  const used = count;
  const free = 50 - count;
  const freePercent = 100 - apiUsed;

  useEffect(() => {
    const userInput = sendMailData;
    const subjectLineValid =
      userInput.subjectLine.length >= 6 && userInput.subjectLine.length <= 60;
    const recruiterEmailValid = validateEmail(userInput.recruiterEmail);
    const resumeSubmissionDateValid =
      userInput.resumeSubmissionDate &&
      validateDate(userInput.resumeSubmissionDate);
    const companyNameValid =
      userInput.companyName.length >= 2 && userInput.companyName.length <= 40;
    const positionTypeValid =
      userInput.positionType.length >= 5 && userInput.positionType.length <= 10;
    const templateTypeValid = userInput.templateType.length === 7;
    if (
      subjectLineValid &&
      recruiterEmailValid &&
      resumeSubmissionDateValid &&
      companyNameValid &&
      positionTypeValid &&
      templateTypeValid
    ) {
      setFormInputsValid(true);
    } else {
      setFormInputsValid(false);
    }
  }, [sendMailData, setSendMailData]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    document.body.classList.toggle("customize-box");
    document
      .querySelector(".simplebar-content-wrapper")
      .classList.add("only-on-load");

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
      if (!loading) {
        document
          .querySelector(".simplebar-content-wrapper")
          .classList.remove("only-on-load");
      }
    } catch (error) {
      setLoading(false);
      setSuccessCompile(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (triggerRender) {
      setTriggerRender(false);
    }
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/mail/send`,
        sendMailData,
        {
          credentials: "include",
        }
      );
      setPreviewHtml(null);
      // setNewEmailSent(true)
      setTriggerRender(true);
      document.body.classList.remove("customize-box");
      document
        .querySelector(".simplebar-content-wrapper")
        .classList.remove("only-on-load");
      notify(data.msg);
    } catch (error) {
      // setNewEmailSent(false)
      notify(error.response?.data?.msg);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function retrieveResumeLink() {
      if (isMounted) {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/api/v1/resume-upload/retrieve`,
            {
              credentials: "include",
            }
          );
          if (data.status === 200) {
            setHasResume(true);
          } else {
            setHasResume(false);
          }
        } catch (err) {
          console.log(err);
          setHasResume(false);
        }
      }
    }

    retrieveResumeLink();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && loading) {
      setSuccessCompile(false);
    }

    return () => {
      isMounted = false;
    };
  }, [loading]);

  const Roles = {
    default: "Frontend",
    backend: "Backend",
    fullstack: "Fullstack",
  };

  const handleRoleChange = (e) => {
    e.preventDefault();
    const role = e.target.textContent;
    setSendMailData({
      ...sendMailData,
      positionType: role,
    });
  };

  const handleCheckbox = (e) => {
    let isChecked = e.target.checked;
    setSendMailData({
      ...sendMailData,
      templateType: isChecked ? "Email01" : "Email02",
    });
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setSendMailData({
      ...sendMailData,
      rawDate: date,
      resumeSubmissionDate: dateFormatted(date),
    });
  };

  //set state
  const [timerr, setTimerr] = useState(0);

  const resendText = `Resend in ${timerr} second${timerr !== 1 ? "s" : ""}...`;

  const logout = async (e) => {
    try {
      e.preventDefault();
      await axios.get(`${BASE_URL}/api/v1/auth/logout`);
      await setLoggedIn(null);
      window.location.href = LOGIN;
    } catch (error) {
      console.log(error.message);
    }
  };

  const resendVerifyLink = async (e) => {
    e.preventDefault();
    if (loggedIn) {
      startTimer(30, setTimerr);
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/auth/resend-activation-code`,
          {
            email: loggedIn?.email,
          },
          {
            credentials: "include",
          }
        );
        notify(data.msg);
      } catch (err) {
        notify(err.msg);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      if (isMounted) {
        try {
          const loggedInRes = await axios.get(
            `${BASE_URL}/api/v1/auth/loggedIn`
          );
          await setLoggedIn(loggedInRes.data.info);
        } catch (err) {
          navigate(LOGIN);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [BASE_URL, setLoggedIn, navigate]);

  const options = {
    chart: {
      type: "pie",
      backgroundColor: null,
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      lineColor: "transparent",
      tickLength: 0,
      labels: {
        enabled: false,
      },
    },
    yAxis: {
      gridLineColor: "transparent",
      title: {
        text: "",
      },
      labels: {
        enabled: false,
      },
    },
    legend: {
      itemStyle: {
        color: "#6C757D",
        fontSize: "12px",
        fontWeight: "500",
        fontFamily: "'Open Sans', sans-serif",
      },
      margin: 30,
      padding: 0,
      symbolWidth: 11,
      symbolHeight: 11,
      itemDistance: 30,
      symbolPadding: 10,
    },
    plotOptions: {
      pie: {
        size: 230,
        borderWidth: 0,
        allowPointSelect: true,
      },
      series: {
        lineWidth: 0,
      },
      column: {
        pointPadding: 0,
        borderWidth: 0,
        pointWidth: 1,
      },
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: "%",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>',
    },
    series: [
      {
        innerSize: "86%",
        dataLabels: [
          {
            enabled: false,
          },
        ],
        name: "Email Sent",
        showInLegend: true,
        data: [
          { name: `Used (${used})`, y: apiUsed, color: "#800080" },
          {
            name: `Free (${free})`,
            y: freePercent,
            color: "rgba(128, 0, 128, 0.5)",
          },
        ],
      },
    ],
  };
  // const chartRef = useRef();
  // useEffect(() => {
  //     const ref = chartRef.current
  //     if(ref) {
  //         console.log(ref);
  //         const chart = new ApexCharts(ref, options);
  //         chart.render();
  //     }
  //     // var chart = new ApexCharts(document.querySelector("#MuzeColumnsChartTwo"), options);
  //     // chart.render();
  // }, [chartRef, options]);

  const backArrowRef = useRef();
  const navItemRef = useRef();

  useEffect(() => {
    // componentDidMount
    document.body.classList.add("bg-gray-100");
    document.body.classList.add("analytics-template");

    const baRef = backArrowRef.current;
    if (baRef) {
      baRef.addEventListener("click", () => {
        if (document.body.className.match("sidebar-compact")) {
          document.body.classList.toggle("sidebar-compact");
          document.body.classList.add("previous-compact");
        } else if (document.body.className.match("previous-compact")) {
          document.body.classList.toggle("sidebar-compact");
        } else {
          document.body.classList.toggle("sidebar-icons");
        }
      });
    }
    // componentWillUnmount
    return () => {
      document.body.classList.remove("bg-gray-100");
      document.body.classList.remove("analytics-template");
    };
  }, [backArrowRef]);

  useEffect(() => {
    const muzeNavItems = document.querySelectorAll(
      ".navbar-vertical .nav-item"
    );
    muzeNavItems.forEach((muzeNavItem) => {
      muzeNavItem.addEventListener("mouseover", () => {
        const muzePosition = muzeNavItem.getBoundingClientRect();
        muzeNavItem.style.top = muzePosition.top + "px";
      });
    });

    document.querySelectorAll(".muze-hamburger").forEach((muzeHamburger) => {
      muzeHamburger.addEventListener("click", () => {
        document.querySelector("body").classList.toggle("sidebar-menu");
      });
    });
    document.querySelectorAll("body").forEach((muzeHamburger) => {
      muzeHamburger.addEventListener("click", () => {
        document.querySelector("body").classList.remove("customize-box");
      });
    });
    document
      .querySelectorAll(".customize-btn, .customize-close")
      .forEach((muzeCustomizerToggle) => {
        muzeCustomizerToggle.addEventListener("click", () => {
          // e.stopPropagation();
          document.querySelector("body").classList.toggle("customize-box");
        });
      });

    document.querySelectorAll(".muze-search").forEach((muzeSearch) => {
      muzeSearch.addEventListener("click", () => {
        document.querySelector("body").classList.toggle("search-open");
      });
    });
    document.querySelectorAll(".customize-sidebar").forEach((muzeSearch) => {
      muzeSearch.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });

    var docReady = function docReady(fn) {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fn);
      } else {
        setTimeout(fn, 1);
      }
    };

    var popoverInit = function popoverInit() {
      var popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-toggle="popover"]')
      );
      popoverTriggerList.map(function (popoverTriggerEl) {
        return new window.bootstrap.Popover(popoverTriggerEl, {
          trigger: "focus",
        });
      });
    };
    var toastInit = function toastInit() {
      var toastElList = [].slice.call(document.querySelectorAll(".toast"));
      toastElList.map(function (toastEl) {
        return new window.bootstrap.Toast(toastEl);
      });
    };
    var tooltipInit = function tooltipInit() {
      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    };
    docReady(tooltipInit);
    docReady(popoverInit);
    docReady(toastInit);
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fullName =
    loggedIn &&
    `${capitalizeFirstLetter(loggedIn?.firstname)} ${capitalizeFirstLetter(
      loggedIn?.lastname
    )}`;

  const formatedName = shortenString(fullName, 20, 0.85, "***");

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="customize-sidebar">
        <div className="border-bottom border-gray-200 p-3 p-md-4">
          <div className="text-end">
            <button
              role="button"
              className="btn btn-light btn-icon rounded-pill customize-close"
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
                ></rect>
                <path
                  d="M.82.1l.058.05L6,5.272,11.122.151A.514.514,0,0,1,11.9.82l-.05.058L6.728,6l5.122,5.122a.514.514,0,0,1-.67.777l-.058-.05L6,6.728.878,11.849A.514.514,0,0,1,.1,11.18l.05-.058L5.272,6,.151.878A.514.514,0,0,1,.75.057Z"
                  transform="translate(2 2)"
                  fill="#1E1E1E"
                ></path>
              </svg>
            </button>
          </div>
          <div className="px-2 px-md-4">
            <h3 className="mb-0">
              <img
                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/tio-tune2.svg"
                alt="Tio Tune"
              />{" "}
              Email Preview
            </h3>
            <p
              className={`text-gray-700 mb-0 lh-lg ${
                successCompile
                  ? !hasResume
                    ? "text-danger"
                    : "text-success"
                  : ""
              }`}
            >
              {successCompile
                ? hasResume
                  ? "Before submitting, make sure all details are correct."
                  : "NB: You cannot proceed without Resume."
                : ""}
            </p>
          </div>
        </div>
        <div className="customize-body" data-simplebar>
          {!loading ? (
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          ) : (
            <div>
              <SVGCustomLoader />
            </div>
          )}
        </div>
        <div className="p-4 px-lg-5 border-top border-gray-200 bg-white">
          <div className="row">
            <div className="col-6 d-grid">
              <button className="btn btn-xl btn-outline-dark customize-close">
                Back
              </button>
            </div>
            <div className="col-6 d-grid">
              <form onSubmit={handleFinalSubmit}>
                <button
                  className="btn btn-xl btn-primary"
                  disabled={!hasResume}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-vertical navbar-expand-lg navbar-light">
        <a className="navbar-brand mx-auto d-none d-lg-block my-0 my-lg-4">
          <img src="../assets/svg/logo-dashboard.svg" alt="Muze" />
          <img
            src="https://fabrx.co/preview/muse-dashboard/assets/svg/brand/logo-white.svg"
            alt="Muze"
            className="white-logo2"
          />
          <img
            src="https://fabrx.co/preview/muse-dashboard/assets/svg/brand/muze-icon.svg"
            className="muze-icon"
            alt="Muze"
          />
          <img
            src="https://fabrx.co/preview/muse-dashboard/assets/svg/brand/muze-icon-white.svg"
            className="muze-icon-white"
            alt="Muze"
          />
        </a>
        <div className="navbar-collapse">
          <ul className="navbar-nav mb-2" id="accordionExample" data-simplebar>
            <li className="nav-item nav-subtitle">
              <small>Main</small>
            </li>
            <li className="nav-item" ref={navItemRef}>
              <a
                className="nav-link collapsed"
                href="#sidebarDashboards"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="true"
                aria-controls="sidebarDashboards"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <g data-name="icons/tabler/chart" transform="translate(0)">
                    <rect
                      data-name="Icons/Tabler/Chart background"
                      width="16"
                      height="16"
                      fill="none"
                    />
                    <path
                      d="M.686,13.257a.686.686,0,0,1-.093-1.365l.093-.006H15.314a.686.686,0,0,1,.093,1.365l-.093.006ZM.394,9.535l-.089-.05a.688.688,0,0,1-.24-.863l.05-.088L3.773,3.048a.684.684,0,0,1,.782-.272l.095.039L7.811,4.4,11.121.257a.687.687,0,0,1,.945-.122L12.142.2,15.8,3.858a.686.686,0,0,1-.893,1.036l-.077-.067L11.713,1.712,8.536,5.685a.684.684,0,0,1-.743.225l-.1-.04L4.578,4.313,1.256,9.294a.684.684,0,0,1-.862.24Z"
                      transform="translate(0 1)"
                      fill="#1e1e1e"
                    />
                  </g>
                </svg>
                &nbsp;<span className="ms-2">Dashboards</span>
              </a>
              <div
                className="collapse collapse-box show"
                id="sidebarDashboards"
                data-bs-parent="#accordionExample"
              >
                <ul className="nav nav-sm flex-column">
                  <li className="nav-item" ref={navItemRef}>
                    <a href="analytics.html" className="nav-link active">
                      Send Mail
                    </a>
                  </li>
                  <li className="nav-item" ref={navItemRef}>
                    <a href="project-management.html" className="nav-link">
                      Activity
                    </a>
                  </li>
                  <li className="nav-item" ref={navItemRef}>
                    <a href="project-management.html" className="nav-link">
                      Mail Tracking
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item nav-subtitle">
              <small>Resume</small>
            </li>
            <li className="nav-item" ref={navItemRef}>
              <a
                className="nav-link collapsed"
                href="#sidebarPages"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarPages"
              >
                <svg
                  data-name="Icons/Tabler/Bolt"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <rect
                    data-name="Icons/Tabler/Page background"
                    width="16"
                    height="16"
                    fill="none"
                  />
                  <path
                    d="M1.975,14A1.977,1.977,0,0,1,0,12.026V1.975A1.977,1.977,0,0,1,1.975,0h5.04a.535.535,0,0,1,.249.069l.007,0h0a.534.534,0,0,1,.109.084l3.574,3.575a.536.536,0,0,1,.163.289h0l0,.013h0l0,.013v0l0,.011v.053s0,.009,0,.014v7.9A1.977,1.977,0,0,1,9.154,14Zm-.9-12.026V12.026a.9.9,0,0,0,.9.9H9.154a.9.9,0,0,0,.9-.9V4.667H7.718a1.255,1.255,0,0,1-1.248-1.12L6.461,3.41V1.077H1.975A.9.9,0,0,0,1.077,1.975ZM7.538,3.41a.179.179,0,0,0,.122.17l.057.01H9.29L7.538,1.838Z"
                    transform="translate(2 1)"
                    fill="#1e1e1e"
                  />
                </svg>
                &nbsp;<span className="ms-2">Upload</span>
              </a>
            </li>
            <li className="nav-item" ref={navItemRef}>
              <a
                className="nav-link collapsed"
                href="#sidebarAuthentication"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarAuthentication"
              >
                <svg
                  data-name="Icons/Tabler/Paperclip"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <rect
                    data-name="Icons/Tabler/Plug background"
                    width="16"
                    height="16"
                    fill="none"
                  />
                  <path
                    d="M6.7,16a2.378,2.378,0,0,1-2.373-2.234l0-.145V12.541H3.244A3.241,3.241,0,0,1,0,9.47L0,9.3V4.109a.649.649,0,0,1,.561-.643L.649,3.46H1.73V.649A.649.649,0,0,1,3.021.561l.005.088V3.46H6.919V.649A.649.649,0,0,1,8.211.561l.005.088V3.46H9.3a.649.649,0,0,1,.643.561l.006.088V9.3a3.241,3.241,0,0,1-3.071,3.239l-.173,0H5.621v1.081A1.081,1.081,0,0,0,6.593,14.7l.11.005H9.3a.649.649,0,0,1,.088,1.292L9.3,16Zm0-4.757A1.951,1.951,0,0,0,8.644,9.431l0-.134V4.757H1.3V9.3A1.951,1.951,0,0,0,3.11,11.239l.133,0H6.7Z"
                    transform="translate(3)"
                    fill="#1e1e1e"
                  />
                </svg>
                &nbsp;<span className="ms-2">Track Resume</span>
              </a>
            </li>
            <li className="nav-item" ref={navItemRef}>
              <hr className="my-0 bg-gray-50 opacity-100" />
            </li>
            <li className="nav-item" ref={navItemRef}>
              <a
                className="nav-link"
                href="https://fabrx.co/preview/muse-dashboard/documentation/index.html"
                target="_blank"
                rel="noreferrer"
              >
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
                  />
                  <path
                    d="M6.766,1.178A4.018,4.018,0,0,1,12.591,6.71l-.147.155-5.1,5.11A2.352,2.352,0,0,1,3.9,8.77l.114-.123,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11a.981.981,0,0,0,1.3,1.465l.086-.076,5.1-5.11A2.648,2.648,0,0,0,7.861,2.028l-.127.119-5.1,5.11a4.315,4.315,0,0,0,5.941,6.255l.156-.149,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11A5.685,5.685,0,0,1,1.5,6.457l.162-.169Z"
                    transform="translate(1)"
                    fill="#1e1e1e"
                  />
                </svg>
                &nbsp;<span className="ms-2">Docs</span>{" "}
                <span className="docs-version">v1.0</span>
              </a>
            </li>
          </ul>
          <div className="mt-3 mt-md-auto mb-3 signout d-grid">
            <button className="btn btn-dark btn-lg customize-btn">
              <img
                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/dark-mode@24.svg"
                alt="Customize"
              />
              <span className="ps-2">Customize</span>
            </button>
          </div>
          <div className="navbar-vertical-footer border-top border-gray-50">
            <ul className="navbar-vertical-footer-list">
              <li>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18.047"
                    height="18.047"
                    viewBox="0 0 18.047 18.047"
                  >
                    <g
                      data-name="Icons/Tabler/Paperclip Copy"
                      transform="translate(0.047 0.047)"
                    >
                      <rect
                        data-name="Icons/Tabler/Adjustments background"
                        width="18"
                        height="18"
                        fill="none"
                      />
                      <path
                        d="M14.4,17.3l0-.074V6.579a2.829,2.829,0,0,1,0-5.443V.772A.772.772,0,0,1,15.94.7l0,.074v.364a2.829,2.829,0,0,1,0,5.443v10.65A.771.771,0,0,1,14.4,17.3ZM13.885,3.858a1.285,1.285,0,1,0,1.286-1.286A1.287,1.287,0,0,0,13.885,3.858ZM8.232,17.3l0-.074V15.836a2.829,2.829,0,0,1,0-5.443V.772A.771.771,0,0,1,9.768.7l0,.074v9.621a2.829,2.829,0,0,1,0,5.443v1.393a.772.772,0,0,1-1.54.074Zm-.517-4.188A1.285,1.285,0,1,0,9,11.829,1.287,1.287,0,0,0,7.714,13.115ZM2.06,17.3l0-.074V9.664a2.829,2.829,0,0,1,0-5.443V.772A.771.771,0,0,1,3.6.7l0,.074V4.221a2.829,2.829,0,0,1,0,5.443v7.565a.772.772,0,0,1-1.54.074ZM1.543,6.943A1.285,1.285,0,1,0,2.829,5.657,1.287,1.287,0,0,0,1.543,6.943Z"
                        transform="translate(-0.047 -0.047)"
                        fill="#6c757d"
                      />
                    </g>
                  </svg>
                </a>
              </li>
              <li>
                <a onClick={(e) => logout(e)}>
                  <svg
                    aria-hidden="true"
                    role="img"
                    width="23"
                    height="23"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 12a.5.5 0 0 0 .5.5h8.793l-2.647 2.646a.5.5 0 1 0 .707.708l3.5-3.5a.5.5 0 0 0 0-.707l-3.5-3.5a.5.5 0 0 0-.707.707l2.647 2.646H4.5a.5.5 0 0 0-.5.5zM17.5 2h-11A2.502 2.502 0 0 0 4 4.5v4a.5.5 0 0 0 1 0v-4C5 3.672 5.672 3 6.5 3h11c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-11c-.828 0-1.5-.672-1.5-1.5v-4a.5.5 0 0 0-1 0v4A2.502 2.502 0 0 0 6.5 22h11a2.502 2.502 0 0 0 2.5-2.5v-15A2.502 2.502 0 0 0 17.5 2z"
                      fill="#6c757d"
                    />
                  </svg>
                </a>
              </li>
              <li className="dropup">
                <a
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/united-states.svg"
                    alt="United States"
                    className="avatar avatar-xss avatar-circle"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  id="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li className="dropdown-sub-title">
                    <span>Language</span>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/united-states.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="English">
                        English
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/dutch.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="English">
                        Dutch
                      </span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      <img
                        className="avatar avatar-xss avatar-circle me-2"
                        src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/latin.svg"
                        alt="Flag"
                      />
                      <span className="text-truncate" title="Latin">
                        Latin
                      </span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="main-content">
        <div className="header border-bottom border-gray-200 header-fixed">
          <div className="container-fluid px-0">
            <div className="header-body px-3 px-xxl-5 py-3 py-lg-4">
              <div className="row align-items-center">
                <a className="muze-hamburger d-block d-lg-none col-auto">
                  <img
                    src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/hamburger1.svg"
                    alt="img"
                  />
                  <img
                    src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/close1.svg"
                    style={{ width: "20px" }}
                    className="menu-close"
                    alt="img"
                  />
                </a>
                <a className="navbar-brand mx-auto d-lg-none col-auto px-0">
                  <img src="../assets/svg/logo-dashboard.svg" alt="Muze" />
                  <img
                    src="https://fabrx.co/preview/muse-dashboard/assets/svg/brand/logo-white.svg"
                    alt="Muze"
                    className="white-logo"
                  />
                </a>
                <div className="col d-flex align-items-center">
                  <a
                    ref={backArrowRef}
                    className="back-arrow bg-white circle circle-sm shadow border border-gray-200 rounded mb-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                    >
                      <g
                        data-name="icons/tabler/chevrons-left"
                        transform="translate(0)"
                      >
                        <rect
                          data-name="Icons/Tabler/Chevrons Left background"
                          width="16"
                          height="16"
                          fill="none"
                        />
                        <path
                          d="M14.468,14.531l-.107-.093-6.4-6.4a.961.961,0,0,1-.094-1.25l.094-.107,6.4-6.4a.96.96,0,0,1,1.451,1.25l-.094.108L10,7.36l5.72,5.721a.961.961,0,0,1,.094,1.25l-.094.107a.96.96,0,0,1-1.25.093Zm-7.68,0-.107-.093-6.4-6.4a.961.961,0,0,1-.093-1.25l.093-.107,6.4-6.4a.96.96,0,0,1,1.45,1.25l-.093.108L2.318,7.36l5.72,5.721a.96.96,0,0,1,.093,1.25l-.093.107a.96.96,0,0,1-1.25.093Z"
                          transform="translate(0 1)"
                          fill="#6C757D"
                        />
                      </g>
                    </svg>
                  </a>
                  <div className="ps-3 header-search">
                    <form onSubmit={handleSearch}>
                      <div className="input-group bg-white border border-gray-300 rounded py-1 px-3">
                        <img
                          src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/search@14.svg"
                          alt="Search"
                        />
                        <input
                          type="search"
                          className="form-control border-0"
                          placeholder="Search..."
                        />
                      </div>
                    </form>
                    <span className="muze-search d-lg-none ms-3">
                      <svg
                        id="icons_tabler_close"
                        data-name="icons/tabler/close"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                          fill="#1e1e1e"
                        />
                      </svg>
                    </span>
                  </div>
                  <nav className="navbar navbar-expand-lg navbar-light top-header-nav">
                    <div className="navbar-collapse">
                      <ul className="navbar-nav" id="accordionExample2">
                        <li className="nav-item" ref={navItemRef}>
                          <a
                            className="nav-link collapsed"
                            href="#sidebarDashboards2"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="sidebarDashboards2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <g
                                data-name="icons/tabler/chart"
                                transform="translate(0)"
                              >
                                <rect
                                  data-name="Icons/Tabler/Chart background"
                                  width="16"
                                  height="16"
                                  fill="none"
                                />
                                <path
                                  d="M.686,13.257a.686.686,0,0,1-.093-1.365l.093-.006H15.314a.686.686,0,0,1,.093,1.365l-.093.006ZM.394,9.535l-.089-.05a.688.688,0,0,1-.24-.863l.05-.088L3.773,3.048a.684.684,0,0,1,.782-.272l.095.039L7.811,4.4,11.121.257a.687.687,0,0,1,.945-.122L12.142.2,15.8,3.858a.686.686,0,0,1-.893,1.036l-.077-.067L11.713,1.712,8.536,5.685a.684.684,0,0,1-.743.225l-.1-.04L4.578,4.313,1.256,9.294a.684.684,0,0,1-.862.24Z"
                                  transform="translate(0 1)"
                                  fill="#1e1e1e"
                                />
                              </g>
                            </svg>
                            &nbsp;<span className="ms-2">Dashboards</span>
                          </a>
                          <div
                            className="collapse collapse-box"
                            id="sidebarDashboards2"
                            data-bs-parent="#accordionExample2"
                          >
                            <ul className="nav nav-sm flex-column">
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  href="analytics.html"
                                  className="nav-link active"
                                >
                                  Analytics
                                </a>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  href="project-management.html"
                                  className="nav-link"
                                >
                                  Project management
                                </a>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="festive.html" className="nav-link">
                                  Festive
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item" ref={navItemRef}>
                          <a
                            className="nav-link collapsed"
                            href="#sidebarPages3"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="sidebarPages3"
                          >
                            <svg
                              data-name="Icons/Tabler/Bolt"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <rect
                                data-name="Icons/Tabler/Page background"
                                width="16"
                                height="16"
                                fill="none"
                              />
                              <path
                                d="M1.975,14A1.977,1.977,0,0,1,0,12.026V1.975A1.977,1.977,0,0,1,1.975,0h5.04a.535.535,0,0,1,.249.069l.007,0h0a.534.534,0,0,1,.109.084l3.574,3.575a.536.536,0,0,1,.163.289h0l0,.013h0l0,.013v0l0,.011v.053s0,.009,0,.014v7.9A1.977,1.977,0,0,1,9.154,14Zm-.9-12.026V12.026a.9.9,0,0,0,.9.9H9.154a.9.9,0,0,0,.9-.9V4.667H7.718a1.255,1.255,0,0,1-1.248-1.12L6.461,3.41V1.077H1.975A.9.9,0,0,0,1.077,1.975ZM7.538,3.41a.179.179,0,0,0,.122.17l.057.01H9.29L7.538,1.838Z"
                                transform="translate(2 1)"
                                fill="#1e1e1e"
                              />
                            </svg>
                            &nbsp;<span className="ms-2">Pages</span>
                          </a>
                          <div
                            className="collapse collapse-box"
                            id="sidebarPages3"
                            data-bs-parent="#accordionExample2"
                          >
                            <ul
                              className="nav nav-sm flex-column"
                              id="submenu4"
                            >
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  className="nav-link collapsed"
                                  href="#AccountPage3"
                                  data-bs-toggle="collapse"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="AccountPage3"
                                >
                                  Account
                                </a>
                                <div
                                  className="collapse collapse-box"
                                  id="AccountPage3"
                                  data-bs-parent="#submenu4"
                                >
                                  <ul className="nav nav-sm flex-column">
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="settings.html"
                                        className="nav-link"
                                      >
                                        Settings
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="billing.html"
                                        className="nav-link"
                                      >
                                        Billing
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="invoice.html"
                                        className="nav-link"
                                      >
                                        Invoice
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="api-keys.html"
                                        className="nav-link"
                                      >
                                        API keys
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  className="nav-link collapsed"
                                  href="#UserProfile2"
                                  data-bs-toggle="collapse"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="UserProfile2"
                                >
                                  User Profile
                                </a>
                                <div
                                  className="collapse collapse-box"
                                  id="UserProfile2"
                                  data-bs-parent="#submenu4"
                                >
                                  <ul className="nav nav-sm flex-column">
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="user-profile-general.html"
                                        className="nav-link"
                                      >
                                        General
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="user-profile-activity.html"
                                        className="nav-link"
                                      >
                                        Activity
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="user-profile-friends.html"
                                        className="nav-link"
                                      >
                                        Friends
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="user-profile-groups.html"
                                        className="nav-link"
                                      >
                                        Groups
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  className="nav-link collapsed"
                                  href="#Projectspage2"
                                  data-bs-toggle="collapse"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="Projectspage2"
                                >
                                  Projects
                                </a>
                                <div
                                  className="collapse collapse-box"
                                  id="Projectspage2"
                                  data-bs-parent="#submenu4"
                                >
                                  <ul className="nav nav-sm flex-column">
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="all-projects.html"
                                        className="nav-link"
                                      >
                                        All projects
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="new-project.html"
                                        className="nav-link"
                                      >
                                        New project
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="project-details.html"
                                        className="nav-link"
                                      >
                                        Project detail
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a href="teams.html" className="nav-link">
                                        Teams
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="pricing.html" className="nav-link">
                                  Pricing
                                </a>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="help-center.html" className="nav-link">
                                  Help page
                                </a>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="empty-state.html" className="nav-link">
                                  Empty State
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item" ref={navItemRef}>
                          <a
                            className="nav-link collapsed"
                            href="#sidebarAuthentication2"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="sidebarAuthentication2"
                          >
                            <svg
                              data-name="Icons/Tabler/Paperclip"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <rect
                                data-name="Icons/Tabler/Plug background"
                                width="16"
                                height="16"
                                fill="none"
                              />
                              <path
                                d="M6.7,16a2.378,2.378,0,0,1-2.373-2.234l0-.145V12.541H3.244A3.241,3.241,0,0,1,0,9.47L0,9.3V4.109a.649.649,0,0,1,.561-.643L.649,3.46H1.73V.649A.649.649,0,0,1,3.021.561l.005.088V3.46H6.919V.649A.649.649,0,0,1,8.211.561l.005.088V3.46H9.3a.649.649,0,0,1,.643.561l.006.088V9.3a3.241,3.241,0,0,1-3.071,3.239l-.173,0H5.621v1.081A1.081,1.081,0,0,0,6.593,14.7l.11.005H9.3a.649.649,0,0,1,.088,1.292L9.3,16Zm0-4.757A1.951,1.951,0,0,0,8.644,9.431l0-.134V4.757H1.3V9.3A1.951,1.951,0,0,0,3.11,11.239l.133,0H6.7Z"
                                transform="translate(3)"
                                fill="#1e1e1e"
                              />
                            </svg>
                            &nbsp;<span className="ms-2">Authentication</span>
                          </a>
                          <div
                            className="collapse collapse-box"
                            id="sidebarAuthentication2"
                            data-bs-parent="#accordionExample2"
                          >
                            <ul
                              className="nav nav-sm flex-column"
                              id="submenu5"
                            >
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  className="nav-link collapsed"
                                  href="#Signinpage2"
                                  data-bs-toggle="collapse"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="Signinpage2"
                                >
                                  Sign in
                                </a>
                                <div
                                  className="collapse collapse-box"
                                  id="Signinpage2"
                                  data-bs-parent="#submenu5"
                                >
                                  <ul className="nav nav-sm flex-column">
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="signin-simple.html"
                                        className="nav-link"
                                      >
                                        Simple
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="signin-cover.html"
                                        className="nav-link"
                                      >
                                        Cover
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  className="nav-link collapsed"
                                  href="#Signuppage2"
                                  data-bs-toggle="collapse"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="Signuppage2"
                                >
                                  Sign up
                                </a>
                                <div
                                  className="collapse collapse-box"
                                  id="Signuppage2"
                                  data-bs-parent="#submenu5"
                                >
                                  <ul className="nav nav-sm flex-column">
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="signup-simple.html"
                                        className="nav-link"
                                      >
                                        Simple
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="signup-cover.html"
                                        className="nav-link"
                                      >
                                        Cover
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  className="nav-link collapsed"
                                  href="#Resetpassword2"
                                  data-bs-toggle="collapse"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="Resetpassword2"
                                >
                                  Reset password
                                </a>
                                <div
                                  className="collapse collapse-box"
                                  id="Resetpassword2"
                                  data-bs-parent="#submenu5"
                                >
                                  <ul className="nav nav-sm flex-column">
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="reset-password-simple.html"
                                        className="nav-link"
                                      >
                                        Simple
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="reset-password-cover.html"
                                        className="nav-link"
                                      >
                                        Cover
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  className="nav-link collapsed"
                                  href="#Emailverification2"
                                  data-bs-toggle="collapse"
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls="Emailverification2"
                                >
                                  Email verification
                                </a>
                                <div
                                  className="collapse collapse-box"
                                  id="Emailverification2"
                                  data-bs-parent="#submenu5"
                                >
                                  <ul className="nav nav-sm flex-column">
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="verify-email-simple.html"
                                        className="nav-link"
                                      >
                                        Simple
                                      </a>
                                    </li>
                                    <li className="nav-item" ref={navItemRef}>
                                      <a
                                        href="verify-email-cover.html"
                                        className="nav-link"
                                      >
                                        Cover
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="404-error.html" className="nav-link">
                                  Error 404
                                </a>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="500-error.html" className="nav-link">
                                  Error 500
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item" ref={navItemRef}>
                          <a
                            className="nav-link collapsed"
                            href="#sidebarApps2"
                            data-bs-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="sidebarApps2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                            >
                              <g
                                data-name="Icons/Tabler/Paperclip"
                                transform="translate(0 0)"
                              >
                                <rect
                                  data-name="Icons/Tabler/apps background"
                                  width="16"
                                  height="16"
                                  fill="none"
                                />
                                <path
                                  d="M10.743,16a1.6,1.6,0,0,1-1.6-1.6V10.743a1.6,1.6,0,0,1,1.6-1.6H14.4a1.6,1.6,0,0,1,1.6,1.6V14.4A1.6,1.6,0,0,1,14.4,16Zm-.229-5.257V14.4a.229.229,0,0,0,.229.229H14.4a.229.229,0,0,0,.229-.229V10.743a.229.229,0,0,0-.229-.229H10.743A.229.229,0,0,0,10.515,10.743ZM1.6,16A1.6,1.6,0,0,1,0,14.4V10.743a1.6,1.6,0,0,1,1.6-1.6H5.257a1.6,1.6,0,0,1,1.6,1.6V14.4a1.6,1.6,0,0,1-1.6,1.6Zm-.229-5.257V14.4a.229.229,0,0,0,.229.229H5.257a.229.229,0,0,0,.229-.229V10.743a.229.229,0,0,0-.229-.229H1.6A.229.229,0,0,0,1.372,10.743Zm9.372-3.886a1.6,1.6,0,0,1-1.6-1.6V1.6a1.6,1.6,0,0,1,1.6-1.6H14.4A1.6,1.6,0,0,1,16,1.6V5.257a1.6,1.6,0,0,1-1.6,1.6ZM10.515,1.6V5.257a.229.229,0,0,0,.229.229H14.4a.229.229,0,0,0,.229-.229V1.6a.229.229,0,0,0-.229-.229H10.743A.229.229,0,0,0,10.515,1.6ZM1.6,6.857A1.6,1.6,0,0,1,0,5.257V1.6A1.6,1.6,0,0,1,1.6,0H5.257a1.6,1.6,0,0,1,1.6,1.6V5.257a1.6,1.6,0,0,1-1.6,1.6ZM1.372,1.6V5.257a.229.229,0,0,0,.229.229H5.257a.229.229,0,0,0,.229-.229V1.6a.229.229,0,0,0-.229-.229H1.6A.229.229,0,0,0,1.372,1.6Z"
                                  transform="translate(0 0)"
                                  fill="#1e1e1e"
                                />
                              </g>
                            </svg>
                            &nbsp;
                            <span className="ms-2 position-relative">
                              Apps{" "}
                              <sup className="status bg-warning position-absolute">
                                &nbsp;
                              </sup>
                            </span>
                          </a>
                          <div
                            className="collapse collapse-box"
                            id="sidebarApps2"
                            data-bs-parent="#accordionExample2"
                          >
                            <ul className="nav nav-sm flex-column">
                              <li className="nav-item" ref={navItemRef}>
                                <a
                                  href="file-manager.html"
                                  className="nav-link"
                                >
                                  File manager
                                </a>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="chat.html" className="nav-link">
                                  Chat
                                </a>
                              </li>
                              <li className="nav-item" ref={navItemRef}>
                                <a href="calendar.html" className="nav-link">
                                  Calendar
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                        <li className="nav-item" ref={navItemRef}>
                          <a
                            className="nav-link"
                            href="https://fabrx.co/preview/muse-dashboard/documentation/index.html"
                            target="_blank"
                            rel="noreferrer"
                          >
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
                              />
                              <path
                                d="M6.766,1.178A4.018,4.018,0,0,1,12.591,6.71l-.147.155-5.1,5.11A2.352,2.352,0,0,1,3.9,8.77l.114-.123,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11a.981.981,0,0,0,1.3,1.465l.086-.076,5.1-5.11A2.648,2.648,0,0,0,7.861,2.028l-.127.119-5.1,5.11a4.315,4.315,0,0,0,5.941,6.255l.156-.149,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11A5.685,5.685,0,0,1,1.5,6.457l.162-.169Z"
                                transform="translate(1)"
                                fill="#1e1e1e"
                              />
                            </svg>
                            &nbsp;<span className="ms-2">Docs</span>{" "}
                            <span className="docs-version">v1.0</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="col-auto d-flex flex-wrap align-items-center icon-blue-hover ps-0">
                  <a className="d-lg-none muze-search">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 14 14"
                    >
                      <rect
                        id="Icons_Tabler_Search_background"
                        data-name="Icons/Tabler/Search background"
                        width="14"
                        height="14"
                        fill="none"
                      />
                      <path
                        data-name="Combined Shape"
                        d="M13.141,13.895l-.06-.052L9.1,9.859A5.569,5.569,0,1,1,9.859,9.1l3.983,3.983a.539.539,0,0,1-.7.813ZM1.077,5.564A4.487,4.487,0,1,0,5.564,1.077,4.492,4.492,0,0,0,1.077,5.564Z"
                        fill="#1e1e1e"
                      />
                    </svg>
                  </a>
                  <div className="dropdown grid-option">
                    <a
                      className="text-dark ms-4 ms-xxl-5 h5 mb-0"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      id="grid"
                    >
                      <svg
                        data-name="Icons/Tabler/Settings"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          data-name="Icons/Tabler/apps background"
                          width="24"
                          height="24"
                          fill="none"
                        />
                        <path
                          d="M16.115,24a2.4,2.4,0,0,1-2.4-2.4V16.115a2.4,2.4,0,0,1,2.4-2.4H21.6a2.4,2.4,0,0,1,2.4,2.4V21.6A2.4,2.4,0,0,1,21.6,24Zm-.343-7.885V21.6a.343.343,0,0,0,.343.343H21.6a.343.343,0,0,0,.343-.343V16.115a.343.343,0,0,0-.343-.343H16.115A.343.343,0,0,0,15.772,16.115ZM2.4,24A2.4,2.4,0,0,1,0,21.6V16.115a2.4,2.4,0,0,1,2.4-2.4H7.885a2.4,2.4,0,0,1,2.4,2.4V21.6a2.4,2.4,0,0,1-2.4,2.4Zm-.343-7.885V21.6a.343.343,0,0,0,.343.343H7.885a.343.343,0,0,0,.343-.343V16.115a.343.343,0,0,0-.343-.343H2.4A.343.343,0,0,0,2.057,16.115Zm14.058-5.829a2.4,2.4,0,0,1-2.4-2.4V2.4a2.4,2.4,0,0,1,2.4-2.4H21.6A2.4,2.4,0,0,1,24,2.4V7.885a2.4,2.4,0,0,1-2.4,2.4ZM15.772,2.4V7.885a.343.343,0,0,0,.343.343H21.6a.343.343,0,0,0,.343-.343V2.4a.343.343,0,0,0-.343-.343H16.115A.343.343,0,0,0,15.772,2.4ZM2.4,10.286A2.4,2.4,0,0,1,0,7.885V2.4A2.4,2.4,0,0,1,2.4,0H7.885a2.4,2.4,0,0,1,2.4,2.4V7.885a2.4,2.4,0,0,1-2.4,2.4ZM2.057,2.4V7.885a.343.343,0,0,0,.343.343H7.885a.343.343,0,0,0,.343-.343V2.4a.343.343,0,0,0-.343-.343H2.4A.343.343,0,0,0,2.057,2.4Z"
                          transform="translate(0 0)"
                          fill="#1e1e1e"
                        />
                      </svg>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-end py-0"
                      aria-labelledby="grid"
                    >
                      <div className="dropdown-header d-flex align-items-center px-4 py-2">
                        <span className="fs-16 Montserrat-font font-weight-semibold text-black-600">
                          My Activity
                        </span>
                        <div className="dropdown ms-auto">
                          <a
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            id="morebtn4"
                            className="btn btn-dark-100 btn-icon btn-sm rounded-circle my-1"
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
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="morebtn4"
                          >
                            <li className="dropdown-sub-title">
                              <span>EXPORT AS</span>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                >
                                  <g
                                    data-name="Icons/Tabler/Share"
                                    transform="translate(0)"
                                  >
                                    <rect
                                      data-name="Icons/Tabler/Code background"
                                      width="16"
                                      height="16"
                                      fill="none"
                                    ></rect>
                                    <path
                                      d="M6.21,13.982a.6.6,0,0,1-.463-.647l.014-.08L9.044.455A.617.617,0,0,1,9.79.018a.6.6,0,0,1,.463.647l-.014.08-3.282,12.8a.612.612,0,0,1-.6.455A.629.629,0,0,1,6.21,13.982Zm5.458-3.357a.588.588,0,0,1-.059-.781l.059-.067L14.514,7,11.668,4.225a.588.588,0,0,1-.059-.781l.059-.068a.627.627,0,0,1,.8-.059l.069.059,3.282,3.2a.59.59,0,0,1,.059.781l-.059.068-3.282,3.2a.627.627,0,0,1-.87,0Zm-8.136.058-.069-.058L.18,7.424a.589.589,0,0,1-.059-.781L.18,6.575l3.282-3.2a.627.627,0,0,1,.87,0,.588.588,0,0,1,.059.781l-.059.068L1.486,7,4.333,9.776a.588.588,0,0,1,.059.781l-.059.068a.627.627,0,0,1-.8.058Z"
                                      transform="translate(0 1)"
                                      fill="#495057"
                                    ></path>
                                  </g>
                                </svg>
                                <span className="ms-2">HTML</span>
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <svg
                                  data-name="Icons/Tabler/Share"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                >
                                  <rect
                                    data-name="Icons/Tabler/File background"
                                    width="16"
                                    height="16"
                                    fill="none"
                                  ></rect>
                                  <path
                                    data-name="Combined Shape"
                                    d="M2.256,16A2.259,2.259,0,0,1,0,13.744V2.256A2.259,2.259,0,0,1,2.256,0H8a.613.613,0,0,1,.4.148l0,0L8.41.157l0,0,.005.005L8.425.17l0,0L8.435.18l4.1,4.1a.614.614,0,0,1,.185.44v9.026A2.259,2.259,0,0,1,10.462,16ZM1.231,2.256V13.744a1.026,1.026,0,0,0,1.025,1.025h8.205a1.027,1.027,0,0,0,1.026-1.025V5.333H8.821A1.436,1.436,0,0,1,7.387,3.979l0-.082V1.231H2.256A1.026,1.026,0,0,0,1.231,2.256ZM8.616,3.9a.206.206,0,0,0,.168.2l.037,0h1.8l-2-2ZM3.9,12.718a.615.615,0,0,1-.059-1.228l.059,0H8.821a.615.615,0,0,1,.059,1.228l-.059,0Zm0-3.282a.615.615,0,0,1-.059-1.228l.059,0H8.821a.615.615,0,0,1,.059,1.228l-.059,0Zm0-3.281a.616.616,0,0,1-.059-1.228l.059,0h.821a.615.615,0,0,1,.059,1.228l-.059,0Z"
                                    transform="translate(2)"
                                    fill="#495057"
                                  ></path>
                                </svg>
                                <span className="ms-2">XML</span>
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <svg
                                  data-name="Icons/Tabler/Share"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                >
                                  <rect
                                    data-name="Icons/Tabler/Code02 background"
                                    width="16"
                                    height="16"
                                    fill="none"
                                  ></rect>
                                  <path
                                    data-name="Combined Shape"
                                    d="M2.256,16A2.259,2.259,0,0,1,0,13.744V2.256A2.259,2.259,0,0,1,2.256,0H8a.613.613,0,0,1,.4.148l0,0L8.41.157l0,0,.005.005L8.425.17l0,0L8.435.18l4.1,4.1a.614.614,0,0,1,.185.44v9.026A2.259,2.259,0,0,1,10.462,16ZM1.231,2.256V13.744a1.026,1.026,0,0,0,1.025,1.025h8.205a1.027,1.027,0,0,0,1.026-1.025V5.333H8.821A1.436,1.436,0,0,1,7.387,3.979l0-.082V1.231H2.256A1.026,1.026,0,0,0,1.231,2.256ZM8.616,3.9a.206.206,0,0,0,.168.2l.037,0h1.8l-2-2Zm-.891,8.756a.615.615,0,0,1-.3-.768l.025-.058.683-1.366L7.449,9.1A.616.616,0,0,1,7.67,8.3l.055-.031a.615.615,0,0,1,.795.22l.031.055.821,1.641a.617.617,0,0,1,.029.484l-.029.067L8.55,12.378a.614.614,0,0,1-.825.275ZM4.2,12.433l-.031-.055-.821-1.641a.617.617,0,0,1-.029-.484l.029-.067.821-1.641a.615.615,0,0,1,1.126.492L5.269,9.1l-.684,1.366.684,1.366a.615.615,0,0,1-.22.794l-.055.031a.615.615,0,0,1-.795-.22Z"
                                    transform="translate(2)"
                                    fill="#495057"
                                  ></path>
                                </svg>
                                <span className="ms-2">JSON</span>
                              </a>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <a className="dropdown-item">
                                <svg
                                  data-name="Icons/Tabler/Share"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                >
                                  <rect
                                    data-name="Icons/Tabler/Share background"
                                    width="16"
                                    height="16"
                                    fill="none"
                                  ></rect>
                                  <path
                                    d="M9.846,12.923a3.07,3.07,0,0,1,.1-.768L5.516,9.874a3.077,3.077,0,1,1,0-3.748L9.943,3.845a3.084,3.084,0,1,1,.541,1.106L6.057,7.232a3.087,3.087,0,0,1,0,1.537l4.427,2.281a3.075,3.075,0,1,1-.638,1.874Zm1.231,0a1.846,1.846,0,1,0,.2-.84q-.011.028-.025.055l-.014.025A1.836,1.836,0,0,0,11.077,12.923ZM1.231,8a1.846,1.846,0,0,0,3.487.845.623.623,0,0,1,.027-.061l.017-.031a1.845,1.845,0,0,0,0-1.508l-.017-.031a.622.622,0,0,1-.027-.061A1.846,1.846,0,0,0,1.231,8ZM12.923,4.923a1.846,1.846,0,1,0-1.682-1.086l.013.024q.014.027.025.056A1.848,1.848,0,0,0,12.923,4.923Z"
                                    fill="#495057"
                                  ></path>
                                </svg>
                                <span className="ms-2">Share</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="dropdown-body" data-simplebar>
                        <a className="dropdown-item text-wrap">
                          <div className="media align-items-center">
                            <span className="me-3">
                              <img
                                className="avatar avatar-xs rounded-0"
                                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/google-analytics-3.svg"
                                alt="Icon"
                              />
                            </span>
                            <div className="media-body">
                              <span className="fs-16 font-weight-semibold dropdown-title">
                                Google Analytics
                              </span>
                              <span className="d-block small text-gray-600 mt-1 dropdown-content">
                                Instant stats for your apps and websites
                              </span>
                            </div>
                          </div>
                        </a>
                        <a className="dropdown-item text-wrap">
                          <div className="media align-items-center">
                            <span className="me-3">
                              <img
                                className="avatar avatar-xs rounded-0"
                                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/dribbble-icon-1.svg"
                                alt="Icon"
                              />
                            </span>
                            <div className="media-body">
                              <span className="fs-16 font-weight-semibold dropdown-title me-2">
                                Dribbble
                              </span>
                              <span className="badge badge-primary py-1 px-2 text-uppercase">
                                New
                              </span>
                              <span className="d-block small text-gray-600 mt-1 dropdown-content">
                                Instant stats for your apps and websites
                              </span>
                            </div>
                          </div>
                        </a>
                        <a className="dropdown-item text-wrap">
                          <div className="media align-items-center">
                            <span className="me-3">
                              <img
                                className="avatar avatar-xs rounded-0"
                                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/evernote-icon.svg"
                                alt="Icon"
                              />
                            </span>
                            <div className="media-body">
                              <span className="fs-16 font-weight-semibold dropdown-title">
                                Evernote
                              </span>
                              <span className="d-block small text-gray-600 mt-1 dropdown-content">
                                Instant stats for your apps and websites
                              </span>
                            </div>
                          </div>
                        </a>
                        <a className="dropdown-item text-wrap">
                          <div className="media align-items-center">
                            <span className="me-3">
                              <img
                                className="avatar avatar-xs rounded-0"
                                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/dropbox.svg"
                                alt="Icon"
                              />
                            </span>
                            <div className="media-body">
                              <span className="fs-16 font-weight-semibold dropdown-title">
                                Dropbox
                              </span>
                              <span className="d-block small text-gray-600 mt-1 dropdown-content">
                                Instant stats for your apps and websites
                              </span>
                            </div>
                          </div>
                        </a>
                        <a className="dropdown-item text-wrap">
                          <div className="media align-items-center">
                            <span className="me-3">
                              <img
                                className="avatar avatar-xs rounded-0"
                                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/ios.svg"
                                alt="Icon"
                              />
                            </span>
                            <div className="media-body">
                              <span className="fs-16 font-weight-semibold dropdown-title">
                                Apple
                              </span>
                              <span className="d-block small text-gray-600 mt-1 dropdown-content">
                                Instant stats for your apps and websites
                              </span>
                            </div>
                          </div>
                        </a>
                        <a className="dropdown-item text-wrap">
                          <div className="media align-items-center">
                            <span className="me-3">
                              <img
                                className="avatar avatar-xs rounded-0"
                                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/google-analytics-3.svg"
                                alt="Icon"
                              />
                            </span>
                            <div className="media-body">
                              <span className="fs-16 font-weight-semibold dropdown-title">
                                Google Analytics
                              </span>
                              <span className="d-block small text-gray-600 mt-1 dropdown-content">
                                Instant stats for your apps and websites
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="dropdown-footer text-center py-2 border-top border-gray-50">
                        <a className="btn btn-link link-dark my-2">
                          View all
                          <svg
                            className="ms-2"
                            data-name="Icons/Tabler/Chevron Down"
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                          >
                            <rect
                              data-name="Icons/Tabler/Chevron Right background"
                              width="10"
                              height="10"
                              fill="none"
                            />
                            <path
                              d="M.163.163A.556.556,0,0,1,.886.109L.948.163,5.393,4.607a.556.556,0,0,1,.054.723l-.054.062L.948,9.837a.556.556,0,0,1-.839-.723l.054-.062L4.214,5,.163.948A.556.556,0,0,1,.109.225Z"
                              transform="translate(2.5)"
                              fill="#1E1E1E"
                            />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown profile-dropdown">
                    <a
                      className="avatar avatar-sm avatar-circle ms-4 ms-xxl-5"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      id="dropdownMenuButton"
                    >
                      <img
                        className="avatar-img"
                        src="../assets/img/avatar1.svg"
                        alt="Avatar"
                      />
                      <span className="avatar-status avatar-sm-status avatar-success">
                        &nbsp;
                      </span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li className="pt-2 px-4">
                        <span className="fs-16 font-weight-bold text-black-600 Montserrat-font me-2">
                          {loggedIn && formatedName}
                        </span>
                        {loggedIn?.isVerified && (
                          <img
                            src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/fill-check.svg"
                            alt="icon"
                          />
                        )}
                        <small className="text-gray-600 pb-3 d-block">
                          <a
                            href="https://fabrx.co/cdn-cgi/l/email-protection"
                            className="__cf_email__"
                            data-cfemail="5f333a3a1f3d2d2a3c3a713c3032"
                          >
                            {loggedIn?.email}
                          </a>
                        </small>
                      </li>
                      <li>
                        <a className="dropdown-item">
                          <svg
                            data-name="Icons/Tabler/Share"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <rect
                              id="Icons_Tabler_User_background"
                              data-name="Icons/Tabler/User background"
                              width="16"
                              height="16"
                              fill="none"
                            />
                            <path
                              d="M11.334,16H.667a.665.665,0,0,1-.661-.568L0,15.343v-1.75A4.179,4.179,0,0,1,4.029,9.44l.193,0H7.778A4.186,4.186,0,0,1,12,13.4l0,.191v1.75a.661.661,0,0,1-.576.651ZM4.222,10.749a2.869,2.869,0,0,0-2.884,2.683l-.005.162v1.094h9.334V13.594A2.857,2.857,0,0,0,8.1,10.767l-.162-.013-.164,0ZM6,8.314A4.2,4.2,0,0,1,1.778,4.157a4.223,4.223,0,0,1,8.445,0A4.2,4.2,0,0,1,6,8.314Zm0-7A2.87,2.87,0,0,0,3.111,4.157a2.889,2.889,0,0,0,5.778,0A2.87,2.87,0,0,0,6,1.313Z"
                              transform="translate(2)"
                              fill="#495057"
                            />
                          </svg>
                          <span className="ms-2">Profile</span>
                        </a>
                      </li>
                      {!loggedIn?.isVerified && (
                        <li>
                          <a
                            className="dropdown-item"
                            onClick={
                              timerr === 0
                                ? (e) => resendVerifyLink(e)
                                : (e) => returnNull(e)
                            }
                          >
                            <svg
                              aria-hidden="true"
                              role="img"
                              style={{ verticalAlign: "-0.125em" }}
                              width="16"
                              height="16"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 36 36"
                            >
                              <g transform="translate(36 0) scale(-1 1)">
                                <circle
                                  className="clr-i-outline clr-i-outline-path-1"
                                  cx="18"
                                  cy="26.06"
                                  r="1.33"
                                  fill="currentColor"
                                />
                                <path
                                  className="clr-i-outline clr-i-outline-path-2"
                                  d="M18 22.61a1 1 0 0 1-1-1v-12a1 1 0 1 1 2 0v12a1 1 0 0 1-1 1z"
                                  fill="currentColor"
                                />
                                <path
                                  className="clr-i-outline clr-i-outline-path-3"
                                  d="M15.062 1.681a3.221 3.221 0 0 1 5.647.002l13.89 25.56A3.22 3.22 0 0 1 31.77 32H4.022a3.22 3.22 0 0 1-2.9-4.759l13.94-25.56zM2.88 28.198A1.22 1.22 0 0 0 4 30h27.77a1.22 1.22 0 0 0 1.071-1.803L18.954 2.642a1.22 1.22 0 0 0-2.137-.001L2.879 28.198z"
                                  fill="currentColor"
                                />
                              </g>
                            </svg>
                            <span className="ms-2">
                              {timerr === 0 ? "Verify account" : resendText}
                            </span>
                          </a>
                        </li>
                      )}
                      <li>
                        <a className="dropdown-item">
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
                      <li>
                        <a className="dropdown-item" onClick={(e) => logout(e)}>
                          <svg
                            aria-hidden="true"
                            role="img"
                            style={{ verticalAlign: "-0.125em" }}
                            width="20"
                            height="20"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <rect
                              x="0"
                              y="0"
                              width="24"
                              height="24"
                              fill="none"
                            />
                            <path
                              d="M4 12a.5.5 0 0 0 .5.5h8.793l-2.647 2.646a.5.5 0 1 0 .707.708l3.5-3.5a.5.5 0 0 0 0-.707l-3.5-3.5a.5.5 0 0 0-.707.707l2.647 2.646H4.5a.5.5 0 0 0-.5.5zM17.5 2h-11A2.502 2.502 0 0 0 4 4.5v4a.5.5 0 0 0 1 0v-4C5 3.672 5.672 3 6.5 3h11c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-11c-.828 0-1.5-.672-1.5-1.5v-4a.5.5 0 0 0-1 0v4A2.502 2.502 0 0 0 6.5 22h11a2.502 2.502 0 0 0 2.5-2.5v-15A2.502 2.502 0 0 0 17.5 2z"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="ms-2">Logout</span>
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path
                              data-name="Combined Shape"
                              d="M6.027,14.449a.8.8,0,0,0-1.193-.494,2.025,2.025,0,0,1-1.063.31,2.086,2.086,0,0,1-1.779-1.069,1.961,1.961,0,0,1,.051-2.03.8.8,0,0,0-.493-1.193,2.03,2.03,0,0,1,0-3.945.8.8,0,0,0,.494-1.193,1.962,1.962,0,0,1-.052-2.03,2.086,2.086,0,0,1,1.78-1.071,2.022,2.022,0,0,1,1.062.31.8.8,0,0,0,1.193-.493,2.03,2.03,0,0,1,3.945,0,.808.808,0,0,0,.472.551.788.788,0,0,0,.305.06.8.8,0,0,0,.417-.117,2.024,2.024,0,0,1,1.062-.31,2.087,2.087,0,0,1,1.78,1.07,1.963,1.963,0,0,1-.052,2.03.8.8,0,0,0,.494,1.192,2.03,2.03,0,0,1,0,3.946.8.8,0,0,0-.494,1.193,1.962,1.962,0,0,1,.052,2.03,2.086,2.086,0,0,1-1.779,1.07,2.025,2.025,0,0,1-1.063-.31.8.8,0,0,0-.722-.056.8.8,0,0,0-.471.55,2.03,2.03,0,0,1-3.945,0Zm0-1.687a2.03,2.03,0,0,1,1.2,1.4.8.8,0,0,0,1.553,0A2.029,2.029,0,0,1,11.8,12.9l.077.042a.78.78,0,0,0,.341.08.822.822,0,0,0,.7-.421.773.773,0,0,0-.02-.8l-.078-.141a2.03,2.03,0,0,1,1.333-2.889.8.8,0,0,0,0-1.552A2.031,2.031,0,0,1,12.9,4.195l.042-.076a.768.768,0,0,0-.042-.757.813.813,0,0,0-.68-.387.793.793,0,0,0-.418.122l-.141.078a2.038,2.038,0,0,1-.916.219,2.02,2.02,0,0,1-.777-.155,2.039,2.039,0,0,1-1.2-1.4l-.029-.1a.8.8,0,0,0-1.524.1A2.027,2.027,0,0,1,4.195,3.1l-.076-.041a.78.78,0,0,0-.341-.08.822.822,0,0,0-.7.422.772.772,0,0,0,.021.8l.078.141A2.029,2.029,0,0,1,1.841,7.223a.8.8,0,0,0,0,1.553A2.029,2.029,0,0,1,3.1,11.8l-.041.077a.768.768,0,0,0,.042.757.815.815,0,0,0,.68.387.791.791,0,0,0,.418-.122l.141-.078a2.027,2.027,0,0,1,1.693-.064ZM4.923,8A3.077,3.077,0,1,1,8,11.077,3.081,3.081,0,0,1,4.923,8ZM6.154,8A1.846,1.846,0,1,0,8,6.154,1.848,1.848,0,0,0,6.154,8Z"
                              fill="#495057"
                            />
                          </svg>
                          <span className="ms-2">Settings</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="btn btn-dark btn-lg customize-btn ms-4 ms-xxl-5">
                    <svg
                      data-name="Icons/Tabler/Notification"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        data-name="Icons/Tabler/Contrast background"
                        width="24"
                        height="24"
                        fill="none"
                      />
                      <path
                        d="M0,12A12,12,0,1,1,12,24,12.014,12.014,0,0,1,0,12Zm1.847,0A10.153,10.153,0,1,0,12,1.847,10.165,10.165,0,0,0,1.847,12Zm9.234,6.242,0-.089V5.845A.923.923,0,0,1,12,4.923a7.077,7.077,0,0,1,0,14.153A.923.923,0,0,1,11.081,18.243Z"
                        fill="#fff"
                      />
                    </svg>
                    <span className="ps-2">Customize</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="double-header-nav">
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="navbar-collapse">
                  <ul className="navbar-nav" id="accordionExample3">
                    <li className="nav-item" ref={navItemRef}>
                      <a
                        className="nav-link collapsed"
                        href="#sidebarDashboards3"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarDashboards3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <g
                            data-name="icons/tabler/chart"
                            transform="translate(0)"
                          >
                            <rect
                              data-name="Icons/Tabler/Chart background"
                              width="16"
                              height="16"
                              fill="none"
                            />
                            <path
                              d="M.686,13.257a.686.686,0,0,1-.093-1.365l.093-.006H15.314a.686.686,0,0,1,.093,1.365l-.093.006ZM.394,9.535l-.089-.05a.688.688,0,0,1-.24-.863l.05-.088L3.773,3.048a.684.684,0,0,1,.782-.272l.095.039L7.811,4.4,11.121.257a.687.687,0,0,1,.945-.122L12.142.2,15.8,3.858a.686.686,0,0,1-.893,1.036l-.077-.067L11.713,1.712,8.536,5.685a.684.684,0,0,1-.743.225l-.1-.04L4.578,4.313,1.256,9.294a.684.684,0,0,1-.862.24Z"
                              transform="translate(0 1)"
                              fill="#1e1e1e"
                            />
                          </g>
                        </svg>
                        &nbsp;<span className="ms-2">Dashboards</span>
                      </a>
                      <div
                        className="collapse collapse-box"
                        id="sidebarDashboards3"
                        data-bs-parent="#accordionExample3"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              href="analytics.html"
                              className="nav-link active"
                            >
                              Analytics
                            </a>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              href="project-management.html"
                              className="nav-link"
                            >
                              Project management
                            </a>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="festive.html" className="nav-link">
                              Festive
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item" ref={navItemRef}>
                      <a
                        className="nav-link collapsed"
                        href="#sidebarPages4"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarPages4"
                      >
                        <svg
                          data-name="Icons/Tabler/Bolt"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <rect
                            data-name="Icons/Tabler/Page background"
                            width="16"
                            height="16"
                            fill="none"
                          />
                          <path
                            d="M1.975,14A1.977,1.977,0,0,1,0,12.026V1.975A1.977,1.977,0,0,1,1.975,0h5.04a.535.535,0,0,1,.249.069l.007,0h0a.534.534,0,0,1,.109.084l3.574,3.575a.536.536,0,0,1,.163.289h0l0,.013h0l0,.013v0l0,.011v.053s0,.009,0,.014v7.9A1.977,1.977,0,0,1,9.154,14Zm-.9-12.026V12.026a.9.9,0,0,0,.9.9H9.154a.9.9,0,0,0,.9-.9V4.667H7.718a1.255,1.255,0,0,1-1.248-1.12L6.461,3.41V1.077H1.975A.9.9,0,0,0,1.077,1.975ZM7.538,3.41a.179.179,0,0,0,.122.17l.057.01H9.29L7.538,1.838Z"
                            transform="translate(2 1)"
                            fill="#1e1e1e"
                          />
                        </svg>
                        &nbsp;<span className="ms-2">Pages</span>
                      </a>
                      <div
                        className="collapse collapse-box"
                        id="sidebarPages4"
                        data-bs-parent="#accordionExample3"
                      >
                        <ul className="nav nav-sm flex-column" id="submenu6">
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              className="nav-link collapsed"
                              href="#AccountPage4"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="AccountPage4"
                            >
                              Account
                            </a>
                            <div
                              className="collapse collapse-box"
                              id="AccountPage4"
                              data-bs-parent="#submenu6"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item" ref={navItemRef}>
                                  <a href="settings.html" className="nav-link">
                                    Settings
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a href="billing.html" className="nav-link">
                                    Billing
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a href="invoice.html" className="nav-link">
                                    Invoice
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a href="api-keys.html" className="nav-link">
                                    API keys
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              className="nav-link collapsed"
                              href="#UserProfile3"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="UserProfile3"
                            >
                              User Profile
                            </a>
                            <div
                              className="collapse collapse-box"
                              id="UserProfile3"
                              data-bs-parent="#submenu6"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="user-profile-general.html"
                                    className="nav-link"
                                  >
                                    General
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="user-profile-activity.html"
                                    className="nav-link"
                                  >
                                    Activity
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="user-profile-friends.html"
                                    className="nav-link"
                                  >
                                    Friends
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="user-profile-groups.html"
                                    className="nav-link"
                                  >
                                    Groups
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              className="nav-link collapsed"
                              href="#Projectspage3"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="Projectspage3"
                            >
                              Projects
                            </a>
                            <div
                              className="collapse collapse-box"
                              id="Projectspage3"
                              data-bs-parent="#submenu6"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="all-projects.html"
                                    className="nav-link"
                                  >
                                    All projects
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="new-project.html"
                                    className="nav-link"
                                  >
                                    New project
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="project-details.html"
                                    className="nav-link"
                                  >
                                    Project detail
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a href="teams.html" className="nav-link">
                                    Teams
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="pricing.html" className="nav-link">
                              Pricing
                            </a>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="help-center.html" className="nav-link">
                              Help page
                            </a>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="empty-state.html" className="nav-link">
                              Empty State
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item" ref={navItemRef}>
                      <a
                        className="nav-link collapsed"
                        href="#sidebarAuthentication3"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarAuthentication3"
                      >
                        <svg
                          data-name="Icons/Tabler/Paperclip"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <rect
                            data-name="Icons/Tabler/Plug background"
                            width="16"
                            height="16"
                            fill="none"
                          />
                          <path
                            d="M6.7,16a2.378,2.378,0,0,1-2.373-2.234l0-.145V12.541H3.244A3.241,3.241,0,0,1,0,9.47L0,9.3V4.109a.649.649,0,0,1,.561-.643L.649,3.46H1.73V.649A.649.649,0,0,1,3.021.561l.005.088V3.46H6.919V.649A.649.649,0,0,1,8.211.561l.005.088V3.46H9.3a.649.649,0,0,1,.643.561l.006.088V9.3a3.241,3.241,0,0,1-3.071,3.239l-.173,0H5.621v1.081A1.081,1.081,0,0,0,6.593,14.7l.11.005H9.3a.649.649,0,0,1,.088,1.292L9.3,16Zm0-4.757A1.951,1.951,0,0,0,8.644,9.431l0-.134V4.757H1.3V9.3A1.951,1.951,0,0,0,3.11,11.239l.133,0H6.7Z"
                            transform="translate(3)"
                            fill="#1e1e1e"
                          />
                        </svg>
                        &nbsp;<span className="ms-2">Authentication</span>
                      </a>
                      <div
                        className="collapse collapse-box"
                        id="sidebarAuthentication3"
                        data-bs-parent="#accordionExample3"
                      >
                        <ul className="nav nav-sm flex-column" id="submenu7">
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              className="nav-link collapsed"
                              href="#Signinpage3"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="Signinpage3"
                            >
                              Sign in
                            </a>
                            <div
                              className="collapse collapse-box"
                              id="Signinpage3"
                              data-bs-parent="#submenu7"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="signin-simple.html"
                                    className="nav-link"
                                  >
                                    Simple
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="signin-cover.html"
                                    className="nav-link"
                                  >
                                    Cover
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              className="nav-link collapsed"
                              href="#Signuppage3"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="Signuppage3"
                            >
                              Sign up
                            </a>
                            <div
                              className="collapse collapse-box"
                              id="Signuppage3"
                              data-bs-parent="#submenu7"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="signup-simple.html"
                                    className="nav-link"
                                  >
                                    Simple
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="signup-cover.html"
                                    className="nav-link"
                                  >
                                    Cover
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              className="nav-link collapsed"
                              href="#Resetpassword3"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="Resetpassword3"
                            >
                              Reset password
                            </a>
                            <div
                              className="collapse collapse-box"
                              id="Resetpassword3"
                              data-bs-parent="#submenu7"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="reset-password-simple.html"
                                    className="nav-link"
                                  >
                                    Simple
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="reset-password-cover.html"
                                    className="nav-link"
                                  >
                                    Cover
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a
                              className="nav-link collapsed"
                              href="#Emailverification3"
                              data-bs-toggle="collapse"
                              role="button"
                              aria-expanded="false"
                              aria-controls="Emailverification3"
                            >
                              Email verification
                            </a>
                            <div
                              className="collapse collapse-box"
                              id="Emailverification3"
                              data-bs-parent="#submenu5"
                            >
                              <ul className="nav nav-sm flex-column">
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="verify-email-simple.html"
                                    className="nav-link"
                                  >
                                    Simple
                                  </a>
                                </li>
                                <li className="nav-item" ref={navItemRef}>
                                  <a
                                    href="verify-email-cover.html"
                                    className="nav-link"
                                  >
                                    Cover
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="404-error.html" className="nav-link">
                              Error 404
                            </a>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="500-error.html" className="nav-link">
                              Error 500
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item" ref={navItemRef}>
                      <a
                        className="nav-link collapsed"
                        href="#sidebarApps3"
                        data-bs-toggle="collapse"
                        role="button"
                        aria-expanded="false"
                        aria-controls="sidebarApps3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <g
                            data-name="Icons/Tabler/Paperclip"
                            transform="translate(0 0)"
                          >
                            <rect
                              data-name="Icons/Tabler/apps background"
                              width="16"
                              height="16"
                              fill="none"
                            />
                            <path
                              d="M10.743,16a1.6,1.6,0,0,1-1.6-1.6V10.743a1.6,1.6,0,0,1,1.6-1.6H14.4a1.6,1.6,0,0,1,1.6,1.6V14.4A1.6,1.6,0,0,1,14.4,16Zm-.229-5.257V14.4a.229.229,0,0,0,.229.229H14.4a.229.229,0,0,0,.229-.229V10.743a.229.229,0,0,0-.229-.229H10.743A.229.229,0,0,0,10.515,10.743ZM1.6,16A1.6,1.6,0,0,1,0,14.4V10.743a1.6,1.6,0,0,1,1.6-1.6H5.257a1.6,1.6,0,0,1,1.6,1.6V14.4a1.6,1.6,0,0,1-1.6,1.6Zm-.229-5.257V14.4a.229.229,0,0,0,.229.229H5.257a.229.229,0,0,0,.229-.229V10.743a.229.229,0,0,0-.229-.229H1.6A.229.229,0,0,0,1.372,10.743Zm9.372-3.886a1.6,1.6,0,0,1-1.6-1.6V1.6a1.6,1.6,0,0,1,1.6-1.6H14.4A1.6,1.6,0,0,1,16,1.6V5.257a1.6,1.6,0,0,1-1.6,1.6ZM10.515,1.6V5.257a.229.229,0,0,0,.229.229H14.4a.229.229,0,0,0,.229-.229V1.6a.229.229,0,0,0-.229-.229H10.743A.229.229,0,0,0,10.515,1.6ZM1.6,6.857A1.6,1.6,0,0,1,0,5.257V1.6A1.6,1.6,0,0,1,1.6,0H5.257a1.6,1.6,0,0,1,1.6,1.6V5.257a1.6,1.6,0,0,1-1.6,1.6ZM1.372,1.6V5.257a.229.229,0,0,0,.229.229H5.257a.229.229,0,0,0,.229-.229V1.6a.229.229,0,0,0-.229-.229H1.6A.229.229,0,0,0,1.372,1.6Z"
                              transform="translate(0 0)"
                              fill="#1e1e1e"
                            />
                          </g>
                        </svg>
                        &nbsp;
                        <span className="ms-2 position-relative">
                          Apps{" "}
                          <sup className="status bg-warning position-absolute">
                            &nbsp;
                          </sup>
                        </span>
                      </a>
                      <div
                        className="collapse collapse-box"
                        id="sidebarApps3"
                        data-bs-parent="#accordionExample3"
                      >
                        <ul className="nav nav-sm flex-column">
                          <li className="nav-item" ref={navItemRef}>
                            <a href="file-manager.html" className="nav-link">
                              File manager
                            </a>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="chat.html" className="nav-link">
                              Chat
                            </a>
                          </li>
                          <li className="nav-item" ref={navItemRef}>
                            <a href="calendar.html" className="nav-link">
                              Calendar
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="nav-item" ref={navItemRef}>
                      <a
                        className="nav-link"
                        href="https://fabrx.co/preview/muse-dashboard/documentation/index.html"
                        target="_blank"
                        rel="noreferrer"
                      >
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
                          />
                          <path
                            d="M6.766,1.178A4.018,4.018,0,0,1,12.591,6.71l-.147.155-5.1,5.11A2.352,2.352,0,0,1,3.9,8.77l.114-.123,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11a.981.981,0,0,0,1.3,1.465l.086-.076,5.1-5.11A2.648,2.648,0,0,0,7.861,2.028l-.127.119-5.1,5.11a4.315,4.315,0,0,0,5.941,6.255l.156-.149,5.1-5.11a.685.685,0,0,1,1.035.893l-.066.077-5.1,5.11A5.685,5.685,0,0,1,1.5,6.457l.162-.169Z"
                            transform="translate(1)"
                            fill="#1e1e1e"
                          />
                        </svg>
                        &nbsp;<span className="ms-2">Docs</span>{" "}
                        <span className="docs-version">v1.0</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
          <div className="container-fluid px-0">
            <div className="row align-items-center">
              <div className="col">
                <h1 className="h2 mb-0">Send Mail</h1>
              </div>
              <div className="col-auto d-flex align-items-center my-2 my-sm-0">
                <button
                  type="button"
                  disabled={timerr !== 0 ? 1 : null}
                  className="btn btn-lg btn-warning"
                  onClick={
                    timerr === 0
                      ? (e) => resendVerifyLink(e)
                      : (e) => returnNull(e)
                  }
                >
                  {loggedIn?.isVerified ? (
                    <svg
                      aria-hidden="true"
                      role="img"
                      style={{ verticalAlign: "-0.125em" }}
                      width="18"
                      height="18"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <g strokeWidth="1.5" fill="none">
                        <path
                          d="M10.521 2.624a2 2 0 0 1 2.958 0l1.02 1.12a2 2 0 0 0 1.572.651l1.513-.07a2 2 0 0 1 2.092 2.09l-.071 1.514a2 2 0 0 0 .651 1.572l1.12 1.02a2 2 0 0 1 0 2.958l-1.12 1.02a2 2 0 0 0-.651 1.572l.07 1.513a2 2 0 0 1-2.09 2.092l-1.514-.071a2 2 0 0 0-1.572.651l-1.02 1.12a2 2 0 0 1-2.958 0l-1.02-1.12a2 2 0 0 0-1.572-.651l-1.513.07a2 2 0 0 1-2.092-2.09l.071-1.514a2 2 0 0 0-.651-1.572l-1.12-1.02a2 2 0 0 1 0-2.958l1.12-1.02a2 2 0 0 0 .651-1.572l-.07-1.513a2 2 0 0 1 2.09-2.092l1.514.071a2 2 0 0 0 1.572-.651l1.02-1.12z"
                          stroke="currentColor"
                        />
                        <path
                          d="M9 12l2 2l4-4"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  ) : (
                    <svg
                      aria-hidden="true"
                      role="img"
                      style={{ verticalAlign: "-0.125em" }}
                      width="18"
                      height="18"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 36 36"
                    >
                      <g transform="translate(36 0) scale(-1 1)">
                        <circle
                          className="clr-i-outline clr-i-outline-path-1"
                          cx="18"
                          cy="26.06"
                          r="1.33"
                          fill="currentColor"
                        />
                        <path
                          className="clr-i-outline clr-i-outline-path-2"
                          d="M18 22.61a1 1 0 0 1-1-1v-12a1 1 0 1 1 2 0v12a1 1 0 0 1-1 1z"
                          fill="currentColor"
                        />
                        <path
                          className="clr-i-outline clr-i-outline-path-3"
                          d="M15.062 1.681a3.221 3.221 0 0 1 5.647.002l13.89 25.56A3.22 3.22 0 0 1 31.77 32H4.022a3.22 3.22 0 0 1-2.9-4.759l13.94-25.56zM2.88 28.198A1.22 1.22 0 0 0 4 30h27.77a1.22 1.22 0 0 0 1.071-1.803L18.954 2.642a1.22 1.22 0 0 0-2.137-.001L2.879 28.198z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  )}

                  <span className="ps-1">
                    {loggedIn?.isVerified
                      ? "verified"
                      : `${
                          timerr === 0 ? "Please verify account" : resendText
                        }`}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 p-xxl-5">
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
                        <span className="h3 mb-0">
                          {loggedIn?.ipGeo.country}
                        </span>
                        <span className="d-block fs-11 mt-2 font-weight-semibold">
                          {loggedIn?.ipGeo.isoCode} ({loggedIn?.ipGeo.dialCode})
                        </span>
                      </div>
                      <div className="col-7 col-xxl-6 pe-xxl-0">
                        <img src={loggedIn?.ipGeo.flag} alt="country flag" />
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
                        <span className="h3 mb-0">
                          {loggedIn?.mails.length}
                        </span>
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
                        <div id="MuzeColumnsChartTwo"></div>
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
                                    <path
                                      d="M3 20h18v2H3z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M21 19H3L2.147 7.81A2 2 0 1 1 5 6a1.914 1.914 0 0 1-.024.3l2.737 2.189l2.562-4.486A1.948 1.948 0 0 1 10 3a2 2 0 0 1 4 0a1.946 1.946 0 0 1-.276 1.004l2.558 4.485l2.741-2.19A1.906 1.906 0 0 1 19 6a2 2 0 1 1 2.853 1.81zM4.92 17h14.16l.73-8.77l-4.106 3.281L12 5.017l-3.71 6.494l-4.1-3.28z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  <span className="ms-2">
                                    {Roles.fullstack}
                                  </span>
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
                                subjectLine: e.target.value.replaceAll(
                                  /Role/gi,
                                  ""
                                ),
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
                          Recommended
                        </div>
                        <div className="my-3 my-sm-4 d-flex">
                          <div className="form-check form-check-sm mb-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="gridCheck"
                              onChange={(e) => handleCheckbox(e)}
                            />
                            <label
                              className="form-check-label small text-gray-600"
                              htmlFor="gridCheck"
                            >
                              Use Custom Template
                            </label>
                          </div>
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            className="btn btn-xl btn-primary"
                            disabled={!formInputsValid && !loggedIn?.isVerified}
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
                            <a className="dropdown-item">
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
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a className="dropdown-item">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  data-name="Combined Shape"
                                  d="M6.027,14.449a.8.8,0,0,0-1.193-.494,2.025,2.025,0,0,1-1.063.31,2.086,2.086,0,0,1-1.779-1.069,1.961,1.961,0,0,1,.051-2.03.8.8,0,0,0-.493-1.193,2.03,2.03,0,0,1,0-3.945.8.8,0,0,0,.494-1.193,1.962,1.962,0,0,1-.052-2.03,2.086,2.086,0,0,1,1.78-1.071,2.022,2.022,0,0,1,1.062.31.8.8,0,0,0,1.193-.493,2.03,2.03,0,0,1,3.945,0,.808.808,0,0,0,.472.551.788.788,0,0,0,.305.06.8.8,0,0,0,.417-.117,2.024,2.024,0,0,1,1.062-.31,2.087,2.087,0,0,1,1.78,1.07,1.963,1.963,0,0,1-.052,2.03.8.8,0,0,0,.494,1.192,2.03,2.03,0,0,1,0,3.946.8.8,0,0,0-.494,1.193,1.962,1.962,0,0,1,.052,2.03,2.086,2.086,0,0,1-1.779,1.07,2.025,2.025,0,0,1-1.063-.31.8.8,0,0,0-.722-.056.8.8,0,0,0-.471.55,2.03,2.03,0,0,1-3.945,0Zm0-1.687a2.03,2.03,0,0,1,1.2,1.4.8.8,0,0,0,1.553,0A2.029,2.029,0,0,1,11.8,12.9l.077.042a.78.78,0,0,0,.341.08.822.822,0,0,0,.7-.421.773.773,0,0,0-.02-.8l-.078-.141a2.03,2.03,0,0,1,1.333-2.889.8.8,0,0,0,0-1.552A2.031,2.031,0,0,1,12.9,4.195l.042-.076a.768.768,0,0,0-.042-.757.813.813,0,0,0-.68-.387.793.793,0,0,0-.418.122l-.141.078a2.038,2.038,0,0,1-.916.219,2.02,2.02,0,0,1-.777-.155,2.039,2.039,0,0,1-1.2-1.4l-.029-.1a.8.8,0,0,0-1.524.1A2.027,2.027,0,0,1,4.195,3.1l-.076-.041a.78.78,0,0,0-.341-.08.822.822,0,0,0-.7.422.772.772,0,0,0,.021.8l.078.141A2.029,2.029,0,0,1,1.841,7.223a.8.8,0,0,0,0,1.553A2.029,2.029,0,0,1,3.1,11.8l-.041.077a.768.768,0,0,0,.042.757.815.815,0,0,0,.68.387.791.791,0,0,0,.418-.122l.141-.078a2.027,2.027,0,0,1,1.693-.064ZM4.923,8A3.077,3.077,0,1,1,8,11.077,3.081,3.081,0,0,1,4.923,8ZM6.154,8A1.846,1.846,0,1,0,8,6.154,1.848,1.848,0,0,0,6.154,8Z"
                                  fill="#495057"
                                />
                              </svg>
                              <span className="ms-2">Settings</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="d-flex justify-content-center mt-4 custom-flex">
                      <div className="custom-flex--progressbar">
                        <span className="font-weight-semibold mb-3 d-block text-gray-700">
                          <span className="text-success">{apiUsed}%</span> of
                          SendMail API Consumed
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
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                      />
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
                      <a className="btn btn-xl btn-dark">Upload Resume</a>
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
          <footer className="pt-xxl-5 mt-lg-2">
            <div className="container-fluid px-0 border-top border-gray-200 pt-2 pt-lg-3">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="fs-16 text-gray-600 my-2">
                    Handcrafted with{" "}
                    <svg
                      aria-hidden="true"
                      role="img"
                      style={{ verticalAlign: "-0.125em" }}
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5c0 201.2-356 429.3-356 429.3z"
                        fillOpacity=".8"
                        fill="currentColor"
                      />
                      <path
                        d="M679.7 201c-73.1 0-136.5 40.8-167.7 100.4C480.8 241.8 417.4 201 344.3 201c-104 0-188.3 82.6-188.3 184.5c0 201.2 356 429.3 356 429.3s356-228.1 356-429.3C868 283.6 783.7 201 679.7 201z"
                        fillOpacity=".1"
                        fill="currentColor"
                      />
                    </svg>{" "}
                    somewhere in Niger State.
                  </p>
                </div>
                <div className="col-md-6">
                  <ul className="nav navbar">
                    <li>
                      <a>About</a>
                    </li>
                    <li>
                      <a>Support</a>
                    </li>
                    <li>
                      <a>Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
