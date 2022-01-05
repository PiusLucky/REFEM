import React, { useEffect, useState } from "react";
import moment from "moment";

const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a, b) => {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const MailTracking = ({ setMailTracking, mailData }) => {
  const [newEmails, setNewEmails] = useState([]);
  //useEffect
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const sortedMails = mailData?.mails?.sort(dynamicSort("-createdAt"));
      setNewEmails(sortedMails);
      setMailTracking(true);
      window.scrollTo(0, 0);
    }

    return () => {
      setMailTracking(false);
      isMounted = false;
    };
  }, []);
  return (
    <div className="row">
      <div className="col-12 mb-4">
        <div className="card rounded-12 shadow-dark-80">
          <div className="d-flex align-items-center px-3 px-md-4 py-3">
            <h5 className="card-header-title mb-0 ps-md-2 font-weight-semibold">
              {mailData?.username?.charAt(0).toUpperCase() +
                mailData?.username?.slice(1)}
            </h5>
          </div>
          <div className="table-responsive mb-0">
            <table className="table card-table table-nowrap overflow-hidden">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Company</th>
                  <th>Date</th>
                  <th />
                </tr>
              </thead>
              <tbody className="list">
                {newEmails?.map((mail) => (
                  <tr key={mail._id}>
                    <td>
                      <span className="ps-2 font-weight-semibold text-gray-700">
                        {mail.recruiterEmail}
                      </span>
                    </td>
                    <td> {mail.positionType}</td>
                    <td>
                      <span className="badge bg-teal-50 text-teal-500">
                        sent
                      </span>
                    </td>
                    <td>{mail.companyName}</td>
                    <td>{moment(mail.createdAt).calendar()}</td>
                    <td>
                      <div className="dropdown text-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          data-name="Group 8"
                          viewBox="0 0 32 32"
                        >
                          <circle
                            cx="16"
                            cy="16"
                            r="16"
                            fill="#dcfff5"
                          ></circle>
                          <g transform="translate(10 10)">
                            <path
                              fill="none"
                              d="M0 0H12V12H0z"
                              data-name="Icons/Tabler/Check background"
                            ></path>
                            <path
                              fill="#1ba97f"
                              d="M11.069.16a.545.545 0 01.824.71l-.053.061L4.568 8.2a.546.546 0 01-.71.053L3.8 8.2.16 4.568a.545.545 0 01.71-.824l.061.056 3.251 3.25z"
                              transform="translate(0 1.5)"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex align-items-center p-3 p-md-4 border-top border-gray-200">
            <a
              href="#"
              className="my-1 tiny font-weight-semibold mx-auto btn btn-link link-dark"
            >
              By Happy!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailTracking;
