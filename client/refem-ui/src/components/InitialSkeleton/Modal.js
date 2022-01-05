import React from "react";
import { capitalizeFirstLetter as cfl}  from "../../utils/capitalizeFirstLetter";
import moment from "moment";

const Modal = ({loggedIn}) => {
  return (
    <div
      id="exampleModalCenteredScrollable"
      className="modal fade"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
        role="document"
      >
        <div className="modal-content shadow-dark-80">
          <div className="modal-header border-0 pb-0 align-items-start ps-4">
            <h5 className="modal-title pt-3" id="exampleModalLabel">
              Profile
            </h5>
            <button
              type="button"
              className="btn btn-icon p-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <svg
                data-name="icons/tabler/close"
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                viewBox="0 0 16 16"
              >
                <rect
                  data-name="Icons/Tabler/Close background"
                  width={16}
                  height={16}
                  fill="none"
                />
                <path
                  d="M.82.1l.058.05L6,5.272,11.122.151A.514.514,0,0,1,11.9.82l-.05.058L6.728,6l5.122,5.122a.514.514,0,0,1-.67.777l-.058-.05L6,6.728.878,11.849A.514.514,0,0,1,.1,11.18l.05-.058L5.272,6,.151.878A.514.514,0,0,1,.75.057Z"
                  transform="translate(2 2)"
                  fill="#1e1e1e"
                />
              </svg>
            </button>
          </div>
          <div className="modal-body pt-2 px-4">
            <div className="col-12">
              <h3 className="mb-1">
                {cfl(loggedIn?.firstname)} {cfl(loggedIn?.lastname)}{loggedIn?.isVerified && <span>&nbsp;
                <svg
                  className="ml-1"
                  data-name="Group 1"
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height="25.19"
                  viewBox="0 0 24 23.25"
                >
                  <path
                    d="M23.823,11.991a.466.466,0,0,0,0-.731L21.54,8.7c-.12-.122-.12-.243-.12-.486L21.779,4.8c0-.244-.121-.609-.478-.609L18.06,3.46c-.12,0-.36-.122-.36-.244L16.022.292a.682.682,0,0,0-.839-.244l-3,1.341a.361.361,0,0,1-.48,0L8.7.048a.735.735,0,0,0-.84.244L6.183,3.216c0,.122-.24.244-.36.244L2.58,4.191a.823.823,0,0,0-.48.731l.36,3.412a.74.74,0,0,1-.12.487L.18,11.381a.462.462,0,0,0,0,.732l2.16,2.437c.12.124.12.243.12.486L2.1,18.449c0,.244.12.609.48.609l3.24.735c.12,0,.36.122.36.241l1.68,2.924a.683.683,0,0,0,.84.244l3-1.341a.353.353,0,0,1,.48,0l3,1.341a.786.786,0,0,0,.839-.244L17.7,20.035c.122-.124.24-.243.36-.243l3.24-.734c.24,0,.48-.367.48-.609l-.361-3.413a.726.726,0,0,1,.121-.485Z"
                    fill="#0D6EFD"
                  />
                  <path
                    data-name="Path"
                    d="M4.036,10,0,5.8,1.527,4.2,4.036,6.818,10.582,0,12,1.591Z"
                    transform="translate(5.938 6.625)"
                    fill="#fff"
                  />
                </svg>
                </span>
              }
              </h3>
              <p className="text-gray-700 mb-1 lh-base">Registered {moment(loggedIn?.createdAt).calendar()} </p>
              <div className="card-header-title mb-2 mt-3 font-weight-semibold">Developer&apos;s API Key</div>
              <div
                className="alert alert-secondary alert-dismissible fade show"
                role="alert"
              >
                {loggedIn?.apiKey}
              </div>
              <p className="mb-md-0">
                <svg
                  className="me-2"
                  data-name="icons/tabler/map"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                >
                  <rect
                    data-name="Icons/Tabler/Map background"
                    width={16}
                    height={16}
                    fill="none"
                  />
                  <path
                    d="M5.45,15.356l-3.4-3.4a7.005,7.005,0,1,1,9.907,0l-3.4,3.4a2.2,2.2,0,0,1-3.112,0ZM2.9,2.9a5.812,5.812,0,0,0,0,8.209l3.4,3.4a1,1,0,0,0,1.415,0l3.4-3.4a5.8,5.8,0,0,0,0-8.209l-.153-.148A5.8,5.8,0,0,0,2.9,2.9ZM4,7.006a3,3,0,1,1,3,3A3.005,3.005,0,0,1,4,7.006Zm1.2,0a1.8,1.8,0,1,0,1.8-1.8A1.8,1.8,0,0,0,5.2,7.006Z"
                    transform="translate(1)"
                    fill="#495057"
                  />
                </svg>
                <span className="text-gray-700">{loggedIn?.ipGeo?.country}&nbsp;({loggedIn?.phoneNumber})</span>
              </p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary px-2 ms-2" data-bs-dismiss="modal">
              <span className="px-1">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
