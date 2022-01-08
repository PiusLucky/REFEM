import React, {useRef, useEffect} from "react";
import returnNull from "../../utils/returnNull"
/* eslint-disable react/prop-types */

const InitialSkeleton = ({logout, timerr, loggedIn, resendVerifyLink, resendText, formatedName}) => {
    const ref = useRef(null)
    const muzHamburger = useRef(null)

    
    useEffect(() => {
      // componentDidMount
      document.body.classList.add("bg-gray-100");
      document.body.classList.add("analytics-template");

      const baRef = ref.current;
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
    }, [ref]);

    useEffect(()=> {
      const maRef = muzHamburger.current;
      if (maRef) {
       document.querySelectorAll(".muze-hamburger").forEach((muzeHamburger) => {
         muzeHamburger.addEventListener("click", () => {
           document.querySelector("body").classList.toggle("sidebar-menu");
         });
       });
      }
    }, [muzHamburger])


    return (
       <div className="header border-bottom border-gray-200 header-fixed">
         <div className="container-fluid px-0">
           <div className="header-body px-3 px-xxl-5 py-3 py-lg-4">
             <div className="row align-items-center">
               <a  ref={muzHamburger} className="muze-hamburger d-block d-lg-none col-auto" role="button">
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
                 <img src="../assets/svg/logo-dashboard.svg" alt="Refem" />
                 <img
                   src="https://fabrx.co/preview/muse-dashboard/assets/svg/brand/logo-white.svg"
                   alt="Refem"
                   className="white-logo"
                 />
               </a>
               <div className="col d-flex align-items-center">
                 <a
                   ref={ref}
                   role="button"
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
               </div>
               <div className="col-auto d-flex flex-wrap align-items-center icon-blue-hover ps-0">
                 <div className="dropdown grid-option">
                   <a
                     className="text-dark ms-4 ms-xxl-5 h5 mb-0"
                     data-bs-toggle="dropdown"
                     aria-expanded="false"
                     id="grid"
                     role="button"
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
                         Hot Key
                       </span>
                     </div>
                     <div className="dropdown-body" data-simplebar>
                       <a href="/documentation" className="dropdown-item text-wrap">
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
                               Documentation
                             </span>
                             <span className="d-block small text-gray-600 mt-1 dropdown-content">
                               Read all about how our SendMail API can be consumed.
                             </span>
                           </div>
                         </div>
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
                     role="button"
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
                       <a className="dropdown-item" role="button" data-bs-toggle="modal" data-bs-target="#exampleModalCenteredScrollable">
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
                           role="button"
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
                     <li>
                       <hr className="dropdown-divider" />
                     </li>
                     <li>
                       <a className="dropdown-item" role="button" onClick={(e) => logout(e)}>
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
                   </ul>
                 </div>
                 <button className="btn btn-dark btn-lg customize-btn ms-4 ms-xxl-5">
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
                   <span className="ps-2"> &nbsp;<span className="ms-2">Docs</span>{" "}
                           <span className="docs-version">v1.0</span></span>
                 </button>
               </div>
             </div>
           </div>
           <div className="double-header-nav">
             <nav className="navbar navbar-expand-lg navbar-light">
               <div className="navbar-collapse">
                 <ul className="navbar-nav" id="accordionExample3">
                   <li className="nav-item" >
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
                         <li className="nav-item" >
                           <a
                             href="analytics.html"
                             className="nav-link active"
                           >
                             Analytics
                           </a>
                         </li>
                         <li className="nav-item" >
                           <a
                             href="project-management.html"
                             className="nav-link"
                           >
                             Project management
                           </a>
                         </li>
                         <li className="nav-item" >
                           <a href="festive.html" className="nav-link">
                             Festive
                           </a>
                         </li>
                       </ul>
                     </div>
                   </li>
                   <li className="nav-item" >
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
                         <li className="nav-item" >
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
                               <li className="nav-item" >
                                 <a href="settings.html" className="nav-link">
                                   Settings
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a href="billing.html" className="nav-link">
                                   Billing
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a href="invoice.html" className="nav-link">
                                   Invoice
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a href="api-keys.html" className="nav-link">
                                   API keys
                                 </a>
                               </li>
                             </ul>
                           </div>
                         </li>
                         <li className="nav-item" >
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
                               <li className="nav-item" >
                                 <a
                                   href="user-profile-general.html"
                                   className="nav-link"
                                 >
                                   General
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a
                                   href="user-profile-activity.html"
                                   className="nav-link"
                                 >
                                   Activity
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a
                                   href="user-profile-friends.html"
                                   className="nav-link"
                                 >
                                   Friends
                                 </a>
                               </li>
                               <li className="nav-item" >
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
                         <li className="nav-item" >
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
                               <li className="nav-item" >
                                 <a
                                   href="all-projects.html"
                                   className="nav-link"
                                 >
                                   All projects
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a
                                   href="new-project.html"
                                   className="nav-link"
                                 >
                                   New project
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a
                                   href="project-details.html"
                                   className="nav-link"
                                 >
                                   Project detail
                                 </a>
                               </li>
                               <li className="nav-item" >
                                 <a href="teams.html" className="nav-link">
                                   Teams
                                 </a>
                               </li>
                             </ul>
                           </div>
                         </li>
                         <li className="nav-item" >
                           <a href="pricing.html" className="nav-link">
                             Pricing
                           </a>
                         </li>
                         <li className="nav-item" >
                           <a href="help-center.html" className="nav-link">
                             Help page
                           </a>
                         </li>
                         <li className="nav-item" >
                           <a href="empty-state.html" className="nav-link">
                             Empty State
                           </a>
                         </li>
                       </ul>
                     </div>
                   </li>
                   <li className="nav-item" >
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
                         <li className="nav-item" >
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
                               <li className="nav-item" >
                                 <a
                                   href="signin-simple.html"
                                   className="nav-link"
                                 >
                                   Simple
                                 </a>
                               </li>
                               <li className="nav-item" >
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
                         <li className="nav-item" >
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
                               <li className="nav-item" >
                                 <a
                                   href="signup-simple.html"
                                   className="nav-link"
                                 >
                                   Simple
                                 </a>
                               </li>
                               <li className="nav-item" >
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
                         <li className="nav-item" >
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
                               <li className="nav-item" >
                                 <a
                                   href="reset-password-simple.html"
                                   className="nav-link"
                                 >
                                   Simple
                                 </a>
                               </li>
                               <li className="nav-item" >
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
                         <li className="nav-item" >
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
                               <li className="nav-item" >
                                 <a
                                   href="verify-email-simple.html"
                                   className="nav-link"
                                 >
                                   Simple
                                 </a>
                               </li>
                               <li className="nav-item" >
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
                         <li className="nav-item" >
                           <a href="404-error.html" className="nav-link">
                             Error 404
                           </a>
                         </li>
                         <li className="nav-item" >
                           <a href="500-error.html" className="nav-link">
                             Error 500
                           </a>
                         </li>
                       </ul>
                     </div>
                   </li>
                   <li className="nav-item" >
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
                         <li className="nav-item" >
                           <a href="file-manager.html" className="nav-link">
                             File manager
                           </a>
                         </li>
                         <li className="nav-item" >
                           <a href="chat.html" className="nav-link">
                             Chat
                           </a>
                         </li>
                         <li className="nav-item" >
                           <a href="calendar.html" className="nav-link">
                             Calendar
                           </a>
                         </li>
                       </ul>
                     </div>
                   </li>
                   <li className="nav-item" >
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
   )
}



export default InitialSkeleton;