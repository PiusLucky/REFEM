import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
     <>
       <div className="position-absolute top-0 start-0 p-4 p-md-5">
         <a href="#" className="ps-md-3">
           <img
             src="../assets/svg/logo-dashboard.svg"
             alt="Refem"
             className="refem-logo"
           />
         </a>
       </div>
       <div className="row g-0 align-items-center">
         <div className="col-lg-7">
           <div className="bg-white cover-fit d-flex justify-content-center align-items-center px-4 py-5 p-sm-5">
             <img
               src="https://fabrx.co/preview/muse-dashboard/assets/img/404-error.svg"
               alt="Sign Up Cover"
               className="mt-4 mt-md-0 dark-mode-image"
             />
           </div>
         </div>
         <div className="col-lg-5 px-md-3 px-xl-5">
           <div className="px-3 py-4 p-md-5 p-xxl-5 mx-xxl-4">
             <div className="login-form py-2 py-md-0 mx-auto mx-lg-0">
               <h2 className="h1 mb-3 pb-md-1">404 Page not found!</h2>
               <form>
                 <p className="text-gray-700 pb-md-4 mb-4">
                   Oppps, looks like a White Elephant has swallowed this page.
                 </p>
                 <div className="d-grid pb-3">
                 <Link
                   to="/dashboard"
                 >
                  <button type="button" className="btn btn-xl btn-primary">
                    Return to Dashboard
                  </button>
                 </Link>

                 </div>
                 <div className="border-top border-gray-200 mt-3 mt-md-4 pt-3 pt-md-4">
                   <p className="text-gray-700">
                     Something wrong?{" "}
                     <a href="#0" className="link-primary">
                       luckypius50@gmail.com
                     </a>
                   </p>
                 </div>
               </form>
             </div>
           </div>
         </div>
       </div>
     </>
    )
}


export default NotFound;