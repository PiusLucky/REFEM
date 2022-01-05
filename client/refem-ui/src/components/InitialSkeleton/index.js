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
               <a  ref={muzHamburger} className="muze-hamburger d-block d-lg-none col-auto">
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
                   ref={ref}
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
                 <nav className="navbar navbar-expand-lg navbar-light top-header-nav">
                   <div className="navbar-collapse">
                     <ul className="navbar-nav" id="accordionExample2">
                       <li className="nav-item" >
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
                             <li className="nav-item" >
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
                                   <li className="nav-item" >
                                     <a
                                       href="settings.html"
                                       className="nav-link"
                                     >
                                       Settings
                                     </a>
                                   </li>
                                   <li className="nav-item" >
                                     <a
                                       href="billing.html"
                                       className="nav-link"
                                     >
                                       Billing
                                     </a>
                                   </li>
                                   <li className="nav-item" >
                                     <a
                                       href="invoice.html"
                                       className="nav-link"
                                     >
                                       Invoice
                                     </a>
                                   </li>
                                   <li className="nav-item" >
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
                             <li className="nav-item" >
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
                             <li className="nav-item" >
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
                             <li className="nav-item" >
                               <a
                                 href="file-manager.html"
                                 className="nav-link"
                               >
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