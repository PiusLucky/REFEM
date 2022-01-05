import React, {useEffect} from "react";
/* eslint-disable react/prop-types */


const ResumeUploadHeader = ({setResumeUploadHeader}) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.scrollTo(0, 0);
       setResumeUploadHeader(true)
    }
    return () => {
      setResumeUploadHeader(false)
      mounted = false;
    };
  }, []);
   return (
     <div className="px-3 px-xxl-5 py-3 py-lg-4 border-bottom border-gray-200 after-header">
       <div className="container-fluid px-0">
         <div className="row align-items-center">
           <div className="col">
             <h1 className="h2 mb-0">Upload Resume</h1>
           </div>
         </div>
       </div>
     </div>
   )                                
}


export default ResumeUploadHeader;