/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import FAQ from "./Faq";

const ResumeTracking = ({
  resumeData,
  setResumeTracking,
  activateResumeUpload,
}) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.scrollTo(0, 0);
      setResumeTracking(true);
    }
    return () => {
      setResumeTracking(false);
      mounted = false;
    };
  }, []);
  return (
    <>
      <div className="col-12 mb-4">
        <div className="card rounded-12 shadow-dark-80 border border-gray-50">
          <div className="d-flex align-items-center px-3 px-md-4 py-3">
            <h5 className="card-header-title mb-0 ps-md-2 font-weight-semibold">
              Available
            </h5>
          </div>
          <div className="table-responsive mb-0">
            <table className="table card-table table-nowrap overflow-hidden">
              <thead>
                <tr>
                  <th style={{ width: 500 }}>Link</th>
                  <th>Status</th>
                  <th style={{ width: 290 }}>Type</th>
                  <th />
                </tr>
              </thead>
              <tbody className="list">
                {resumeData && (
                  <tr>
                    <td>
                      <a
                        href={resumeData?.resume?.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="font-weight-semibold text-gray-700">
                          My Resume (Click to preview)
                        </span>
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-teal-50 text-teal-500 p-2">
                        uploaded
                      </span>
                    </td>
                    <td>{resumeData?.resume?.format?.toUpperCase()}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-12 border border-gray-300 p-4 px-md-5 py-md-4 mb-4">
        <div className="row align-items-center">
          <div className="col d-flex align-items-center pb-3 py-md-3">
            <span>
              <img
                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/light.svg"
                alt="SVG"
              />
            </span>
            <div className="ps-3 ps-sm-4">
              <h2 className="h1 text-black-600 mb-0">Update resume</h2>
              <p className="text-gray-700 font-weight-semibold mb-0">
                Amplify your Resume.
              </p>
            </div>
          </div>
          <div className="col-auto">
            <a
              onClick={(e) => activateResumeUpload(e)}
              className="btn btn-xl btn-dark"
            >
              Let&apos;s Go
            </a>
          </div>
        </div>
      </div>
      <FAQ />
    </>
  );
};

export default ResumeTracking;
