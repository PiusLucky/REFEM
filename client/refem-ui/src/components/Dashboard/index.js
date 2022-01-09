import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { LOGIN } from "../../constants/routes";
import { shortenString } from "../../utils/stringShortener";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import startTimer from "../../utils/timer";
import { validateEmail, validateDate } from "../../utils/validator";
import moment from "moment";
import InitialSkeleton from "../InitialSkeleton";
import Modal from "../InitialSkeleton/Modal";
import Navigation from "../Navigation";
import FooterComp from "../Footer";
import SideBarComp from "../SideBar";
import SendMailComp from "../SendMail";
import SendMailHeader from "../SendMail/SendMailHeader";
import ResumeTracking from "../Resume/Tracking";
import ResumeHeader from "../Resume/Header";
import ResumeUpload from "../Resume";
import ResumeUploadHeader from "../Resume/UploadHeader";
import MailTracking from "../SendMail/MailTracking";
import MailTrackingHeader from "../SendMail/MailTrackingHeader";


const Dashboard = () => {
  // apex const declarations
  const BASE_URL = process.env.REACT_APP_API;

  //let declarations
  let today = new Date();

  // Core Functions
  const notify = (msg) => toast(msg);
  const dateFormatted = (date) => {
    if (date) {
      return moment(date).format("DD/MM/YYYY");
    }
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const activateSendMail = (e) => {
    e.preventDefault();
    setMailHeader(true);
    setMailComp(true);
    setResumeUploadHeader(false);
    setResumeUploadComp(false);
    setMailTrackHeader(false);
    setMailTracking(false);
    setResumeHeader(false);
    setResumeTracking(false);
  };

  const activateMailTracking = (e) => {
    e.preventDefault();
    setMailTrackHeader(true);
    setMailTracking(true);
    setResumeUploadHeader(false);
    setResumeUploadComp(false);
    setResumeHeader(false);
    setResumeTracking(false);
    setMailHeader(false);
    setMailComp(false);
  };

  const activateResumeTracking = (e) => {
    e.preventDefault();
    setResumeHeader(true);
    setResumeTracking(true);
    setResumeUploadHeader(false);
    setResumeUploadComp(false);
    setMailTrackHeader(false);
    setMailTracking(false);
    setMailHeader(false);
    setMailComp(false);
  };

  const activateResumeUpload = (e) => {
    e.preventDefault();
    setResumeUploadHeader(true);
    setResumeUploadComp(true);
    setMailTrackHeader(false);
    setMailTracking(false);
    setResumeHeader(false);
    setResumeTracking(false);
    setMailHeader(false);
    setMailComp(false);
  };

  //Hooks
  const { loggedIn, setLoggedIn, triggerRender, setTriggerRender } = useContext(
    AuthContext
  );
  const [formInputsValid, setFormInputsValid] = useState(false);
  const [hasResume, setHasResume] = useState(false);
  const [startDate, setStartDate] = useState(today);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [apiUsed, setApiUsed] = useState(0);
  const [resumeData, setResumeDate] = useState(null);
  const [mailData, setMailData] = useState(null)

  // Component state
  // SendMail  (default)
  const [mailHeader, setMailHeader] = useState(true);
  const [mailComp, setMailComp] = useState(true);
  // ResumeTrack
  const [resumeHeader, setResumeHeader] = useState(false);
  const [resumeTracking, setResumeTracking] = useState(false);
  // Resume Upload
  const [resumeUploadHeader, setResumeUploadHeader] = useState(false);
  const [resumeUploadComp, setResumeUploadComp] = useState(false);
  // Mail Tracking
  const [mailTrackHeader, setMailTrackHeader] = useState(false);
  const [mailTracking, setMailTracking] = useState(false);
  // Update Resume Link on Upload
  const [newResumeUploaded, setNewResumeUploaded] = useState(null);
  // Update Emails Link on Send
  const [newEmailSent, setNewEmailSent] = useState(null);
  

  const [loading, setLoading] = useState(false);
  const [timerr, setTimerr] = useState(0);
  const [successCompile, setSuccessCompile] = useState(false);
  const navigate = useNavigate();
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

  //useEffect
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
          setResumeDate(data);
          setHasResume(true);
        } catch (err) {
          setResumeDate(null);
          setHasResume(false);
        }
      }
    }

    retrieveResumeLink();

    return () => {
      isMounted = false;
    };
  }, [newResumeUploaded]);


  useEffect(() => {
    let isMounted = true;
    async function retrieveMailData() {
      if (isMounted) {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/api/v1/mail/retrieve`,
            {
              credentials: "include",
            }
          );
          setMailData(data);
        } catch (err) {
          setMailData(null);
        }
      }
    }

    retrieveMailData();

    return () => {
      isMounted = false;
    };
  }, [newEmailSent]);


  useEffect(() => {
    let isMounted = true;
    if (isMounted && loading) {
      setSuccessCompile(false);
    }

    return () => {
      isMounted = false;
    };
  }, [loading]);

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

  // other const declarations
  const resendText = `Resend in ${timerr} second${timerr !== 1 ? "s" : ""}...`;
  const count = loggedIn?.usage?.count;
  const used = count;
  const free = 50 - count;
  const freePercent = 100 - apiUsed;
  const Roles = {
    default: "Frontend",
    backend: "Backend",
    fullstack: "Fullstack",
  };
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
  const fullName =
    loggedIn &&
    `${capitalizeFirstLetter(loggedIn?.firstname)} ${capitalizeFirstLetter(
      loggedIn?.lastname
    )}`;

  const formatedName = shortenString(fullName, 20, 0.85, "***");
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
      <SideBarComp
        previewHtml={previewHtml}
        loading={loading}
        notify={notify}
        setPreviewHtml={setPreviewHtml}
        sendMailData={sendMailData}
        setSendMailData={setSendMailData}
        successCompile={successCompile}
        triggerRender={triggerRender}
        setTriggerRender={setTriggerRender}
        hasResume={hasResume}
        setNewEmailSent={setNewEmailSent}
      />
      <Navigation
        activateSendMail={activateSendMail}
        activateResumeTracking={activateResumeTracking}
        activateMailTracking={activateMailTracking}
        activateResumeUpload={activateResumeUpload}
        mailComp={mailComp}
        resumeTracking={resumeTracking}
        resumeUploadComp={resumeUploadComp}
        mailTracking={mailTracking}
      />
      <div className="main-content">
         <Modal loggedIn={loggedIn}/>
        <InitialSkeleton
          logout={logout}
          timerr={timerr}
          loggedIn={loggedIn}
          resendVerifyLink={resendVerifyLink}
          resendText={resendText}
          formatedName={formatedName}
        />
        {mailHeader && (
          <SendMailHeader
            setMailHeader={setMailHeader}
            timerr={timerr}
            loggedIn={loggedIn}
            resendText={resendText}
            resendVerifyLink={resendVerifyLink}
          />
        )}
        {resumeHeader && (
          <ResumeHeader
            setResumeHeader={setResumeHeader}
            timerr={timerr}
            loggedIn={loggedIn}
            resendText={resendText}
            resendVerifyLink={resendVerifyLink}
          />
        )}
        {resumeUploadHeader && (
          <ResumeUploadHeader
            setResumeUploadHeader={setResumeUploadHeader}
          />
        )}
        {mailTrackHeader && (
          <MailTrackingHeader
            setMailTrackHeader={setMailTrackHeader}
            timerr={timerr}
            loggedIn={loggedIn}
            resendText={resendText}
            resendVerifyLink={resendVerifyLink}
          />
        )}
        <div className="p-3 p-xxl-5">
          {mailComp && (
            <SendMailComp
              setMailComp={setMailComp}
              notify={notify}
              apiUsed={apiUsed}
              used={used}
              loggedIn={loggedIn}
              loading={loading}
              sendMailData={sendMailData}
              setSendMailData={setSendMailData}
              setPreviewHtml={setPreviewHtml}
              options={options}
              Roles={Roles}
              setSuccessCompile={setSuccessCompile}
              startDate={startDate}
              handleCheckbox={handleCheckbox}
              handleDateChange={handleDateChange}
              handleRoleChange={handleRoleChange}
              formInputsValid={formInputsValid}
              setLoading={setLoading}
              activateResumeUpload={activateResumeUpload}
            />
          )}
          {resumeTracking && <ResumeTracking resumeData={resumeData} setResumeTracking={setResumeTracking} activateResumeUpload={activateResumeUpload}/>}
          {resumeUploadComp && <ResumeUpload activateResumeTracking={activateResumeTracking} setNewResumeUploaded={setNewResumeUploaded} setResumeUploadComp={setResumeUploadComp} notify={notify} hasResume={hasResume}/>}
          {mailTracking && <MailTracking setMailTracking={setMailTracking} mailData={mailData} />}
          <FooterComp />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
