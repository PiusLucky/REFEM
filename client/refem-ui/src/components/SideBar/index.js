import React from "react";
import SVGCustomLoader from "../SVGCustomLoader";
import axios from "axios";
/* eslint-disable react/prop-types */

const SideBarComp = ({sendMailData, loading, notify, previewHtml, setPreviewHtml, successCompile, setTriggerRender, hasResume}) => {
  // apex const declarations
  const BASE_URL = process.env.REACT_APP_API;

    const handleFinalSubmit = async (e) => {
      e.preventDefault();
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
        setTriggerRender(Math.random());
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
    return (
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
                  disabled={loading?true:hasResume?false:true}
                >
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}


export default SideBarComp;