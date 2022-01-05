import React from "react";
/* eslint-disable react/prop-types */

const Navigation = ({mailComp, resumeTracking, resumeUploadComp, mailTracking, activateSendMail, activateResumeTracking, activateResumeUpload, activateMailTracking, logout }) => {
  return (
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
          <li className="nav-item">
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
                <li className="nav-item">
                  <a onClick={(e)=> activateSendMail(e)} className={`nav-link ${mailComp?"active":""}`}>
                    Send Mail
                  </a>
                </li>
                <li className="nav-item">
                  <a onClick={(e)=> activateMailTracking(e)} className={`nav-link ${mailTracking?"active":""}`}>
                    Mail Tracking
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="nav-item nav-subtitle">
            <small>Resume</small>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${resumeUploadComp?"active":""}`}
              onClick={(e)=> activateResumeUpload(e)}
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
          <li className="nav-item">
            <a
              className={`nav-link ${resumeTracking?"active":""}`}
              data-bs-toggle="collapse"
              role="button"
              aria-expanded="false"
              aria-controls="sidebarAuthentication"
              onClick={(e)=> activateResumeTracking(e)}
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
          <li className="nav-item">
            <hr className="my-0 bg-gray-50 opacity-100" />
          </li>
        </ul>
        <div className="mt-3 mt-md-auto mb-3 signout d-grid">
          <button className="btn btn-dark btn-lg">
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
                fill="#ffffff"
              />
            </svg>
            <span className="ms-2">Docs </span>&nbsp;
            <span className="docs-version">v1.0</span>
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
  );
};

export default Navigation;
