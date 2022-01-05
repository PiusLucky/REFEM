import React, { useEffect, useState, useContext, useRef } from "react";
import FAQ from "./Faq";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import AuthContext from "../../context/AuthContext";

const ResumeUpload = ({
  setNewResumeUploaded,
  hasResume,
  notify,
  setResumeUploadComp,
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { setTriggerRender } = useContext(AuthContext);
  const inputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      window.scrollTo(0, 0);
      setResumeUploadComp(true);
    }
    return () => {
      setResumeUploadComp(false);
      mounted = false;
    };
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    const BASE_URL = process.env.REACT_APP_API;
    const MAX_UPLOAD_SIZE = 2097152;
    const allowedMimeType = ["application/pdf", "image/jpeg", "image/png"];
    const fileSize = file.size;

    if (allowedMimeType.includes(file.type) && fileSize < MAX_UPLOAD_SIZE) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/v1/resume-upload`,
          formData,
          {
            credentials: "include",
          }
        );
        setNewResumeUploaded(Math.random());
        inputRef.current.value = "";
        setLoading(false);
        notify(data.msg);
        setFile(null);
        setTriggerRender(true);
      } catch (err) {
        setLoading(false);
        notify(err.response.data.msg);
      }
    } else {
      setLoading(false);
      notify(
        "Please make sure the file size is less than 2MB (PDF, PNG or JPEG formats only)!"
      );
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        className="alert alert-secondary alert-dismissible fade show pe-5"
        role="alert"
      >
        {hasResume
          ? !loading
            ? "You already have 1 Resume uploaded. Good job"
            : "Uploading Your Resume, please wait..."
          : "Great Resume just makes you standout, Upload one today!"}
        <button type="button" className="close p-2 no-pointer">
          <svg
            id="Group_7"
            data-name="Group 7"
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 32 32"
          >
            <circle id="Background" cx={16} cy={16} r={16} fill="#e6f0ff" />
            <g id="Icon" transform="translate(10 10)">
              <rect
                id="Icons_Tabler_Circle_background"
                data-name="Icons/Tabler/Circle background"
                width={12}
                height={12}
                fill="none"
              />
              <path
                id="Oval"
                d="M4.5,9A4.5,4.5,0,1,1,9,4.5,4.5,4.5,0,0,1,4.5,9Zm0-7.962A3.462,3.462,0,1,0,7.962,4.5,3.466,3.466,0,0,0,4.5,1.038Z"
                transform="translate(1.5 1.5)"
                fill="#0d6efd"
              />
            </g>
          </svg>
        </button>
      </div>

      <div className="input-group">
        <input
          type="file"
          required
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
          onChange={(e) => setFile(e.target.files[0])}
          ref={inputRef}
        />
        <button
          className="btn btn-primary"
          type="button"
          disabled={!file ? true : loading ? true : false}
          onClick={(e) => upload(e)}
        >
          {!loading ? (
            <span>Upload CV</span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ margin: "auto", background: "none" }}
              width="70"
              height="27"
              display="block"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 100 100"
            >
              <path
                fill="none"
                stroke="#fff"
                strokeDasharray="192.4416961669922 64.14723205566406"
                strokeLinecap="round"
                strokeWidth="4.5"
                d="M21.87 27C10.26 27 4.5 38.97 4.5 45s5.76 18 17.37 18c17.37 0 28.89-36 46.26-36C79.74 27 85.5 38.97 85.5 45s-5.76 18-17.37 18c-17.37 0-28.89-36-46.26-36z"
                style={{
                  WebkitTransformOrigin: 50,
                  MsTransformOrigin: 50,
                  transformOrigin: 50,
                }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  dur="0.641025641025641s"
                  keyTimes="0;1"
                  repeatCount="indefinite"
                  values="0;256.58892822265625"
                ></animate>
              </path>
            </svg>
          )}
        </button>
      </div>
      <FAQ />
    </>
  );
};

export default ResumeUpload;
