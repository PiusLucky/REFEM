import React, {useEffect} from "react";
import returnNull from "../../utils/returnNull"
/* eslint-disable react/prop-types */


const ResumeHeader = ({setResumeHeader, timerr, loggedIn, resendText, resendVerifyLink}) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
       setResumeHeader(true)
    }
    return () => {
      setResumeHeader(false)
      mounted = false;
    };
  }, []);
   return (
     <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
       <div className="container-fluid px-0">
         <div className="row align-items-center">
           <div className="col">
             <h1 className="h2 mb-0">Resume Tracking</h1>
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
   )                                
}


export default ResumeHeader;