import React, { useEffect, useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const Documentation = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const BASE_URL = process.env.REACT_APP_API;
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      if (isMounted) {
        try {
          const loggedInRes = await axios.get(
            `${BASE_URL}/api/v1/auth/loggedIn`
          );
          await setLoggedIn(loggedInRes.data.info);
        } catch (err) {
          console.log(err);
          setLoggedIn(null);
        }
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [setLoggedIn]);

  const changeText = (e) => {
    e.target.textContent = "Copied!";
    const TIME_TO_CHANGE = 1000; //1 second
    setTimeout(() => {
      e.target.textContent = "Copy";
    }, TIME_TO_CHANGE);
  };

  const enableSideBar = (e) => {
    e.preventDefault();
    document.body.classList.toggle("sidebar-show"); // Toggle hide class
  };

  const LOGIN_BODY = `{
    "username_email":"<USRENAME_OR_EMAIL>",
    "password": "<PASSWORD>"
}`

  const REGISTER_BODY = `{
  "username": "<USRENAME_OR_EMAIL>",
  "firstname": "<FIRSTNAME>",
  "lastname": "<LASTNAME>",
  "phoneNumber": "<PHONE_NUMBER>",
  "email": "<EMAIL>",
  "password": "<PASSWORD>",
  "repeatPassword": "<PASSWORD>"
}`

  const EMAIL_BODY = `{
    "email":"<EMAIL>"
}`

  const PWD_BODY = `{
    "password":"<PASSWORD>"
}`

  const FILE_BODY = `<FORM_DATA>`

  const MAIL_BODY = `{
  "subjectLine": "<SUBJECT_LINE>",
  "recruiterName": "<RECRUITER_NAME>",
  "recruiterEmail": "<RECRUITER_EMAIL>",
  "resumeSubmissionDate": "<RESUME_SUBMISSION_DATE>",
  "companyName": "<COMPANY_NAME>",
  "positionType": "String: Choose one of [Fullstack, Frontend, Backend]",
  "templateType": "String: Choose one of ["Email01, Email02"]"
}`

const PROFILE_BODY = `{
  "firstname": "<FIRSTNAME>",
  "lastname": "<LASTNAME>",
  "phoneNumber": "<PHONE_NUMBER>"
}`

const CONTACT_BODY = `{
  "name": "Lucky Pius",
  "email": "luckypius50@gmail.com",
  "github": "https://github.com/PiusLucky"
}`

const DEMO = `const axios = require('axios');
const data = JSON.stringify({
  "subjectLine": "React.js (Node.js) TypeScript FE/FS Engineer",
  "recruiterName": "Santana Nielsen",
  "recruiterEmail": "um1d@aevtpet.com",
  "resumeSubmissionDate": "01/01/2021",
  "companyName": "Eplode",
  "positionType": "Backend",
  "templateType": "Email01"
});

const config = {
  method: 'post',
  url: '${BASE_URL}/api/v1/mail/send',
  headers: { 
    'api-key': 'REFEM-138559cf76da146cb19c03e9-a931601ba4a15317c99d0cc531ab0f0cd3', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
`

const DEMOPYTHON = `import requests
import json

url = "${BASE_URL}/api/v1/mail/send"

payload = json.dumps({
  "subjectLine": "React.js (Node.js) TypeScript FE/FS Engineer",
  "recruiterName": "Santana Nielsen",
  "recruiterEmail": "um1d@aevtpet.com",
  "resumeSubmissionDate": "01/01/2021",
  "companyName": "Eplode",
  "positionType": "Backend",
  "templateType": "Email01"
})
headers = {
  'api-key': 'REFEM-138559cf76da146cb19c03e9-a931601ba4a15317c99d0cc531ab0f0cd3',
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
`

const DEMOCSHARP = `const client = new RestClient("${BASE_URL}/api/v1/mail/send");
client.Timeout = -1;
const request = new RestRequest(Method.POST);
request.AddHeader("api-key", "REFEM-138559cf76da146cb19c03e9-a931601ba4a15317c99d0cc531ab0f0cd3");
request.AddHeader("Content-Type", "application/json");
const body = @"{
" + "\n" +
@"  ""subjectLine"": ""React.js (Node.js) TypeScript FE/FS Engineer"",
" + "\n" +
@"  ""recruiterName"": ""Santana Nielsen"",
" + "\n" +
@"  ""recruiterEmail"": ""um1d@aevtpet.com"",
" + "\n" +
@"  ""resumeSubmissionDate"": ""01/01/2021"",
" + "\n" +
@"  ""companyName"": ""Eplode"",
" + "\n" +
@"  ""positionType"": ""Backend"",
" + "\n" +
@"  ""templateType"": ""Email01""
" + "\n" +
@"}";
request.AddParameter("application/json", body,  ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
Console.WriteLine(response.Content);`

const DEMODART = `const headers = {
  'api-key': 'REFEM-138559cf76da146cb19c03e9-a931601ba4a15317c99d0cc531ab0f0cd3',
  'Content-Type': 'application/json'
};
const request = http.Request('POST', Uri.parse('${BASE_URL}/api/v1/mail/send'));
request.body = json.encode({
  "subjectLine": "React.js (Node.js) TypeScript FE/FS Engineer",
  "recruiterName": "Santana Nielsen",
  "recruiterEmail": "um1d@aevtpet.com",
  "resumeSubmissionDate": "01/01/2021",
  "companyName": "Eplode",
  "positionType": "Backend",
  "templateType": "Email01"
});
request.headers.addAll(headers);

http.StreamedResponse response = await request.send();

if (response.statusCode == 200) {
  print(await response.stream.bytesToString());
}
else {
  print(response.reasonPhrase);
}
`

  return (
    <div className="muze-documentation">
      <header className="doc-header bg-white px-3 px-md-4 shadow-sm position-fixed">
        <nav className="navbar navbar-expand-lg has-header-inner py-0">
          <a className="navbar-brand" href="/dashboard">
            <img src="../assets/svg/logo-dashboard.svg" alt="Refem" />
          </a>
          <div className="text-end d-block d-xl-none order-md-2 ms-auto">
            <a className="aside-toggle" onClick={(e) => enableSideBar(e)} role="button">
              <img
                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/hamburger@20.svg"
                className="menu-icon"
                alt="Menu"
              />
              <img
                src="https://fabrx.co/preview/muse-dashboard/assets/svg/icons/close@20.svg"
                className="menu-close"
                alt="Menu Close"
              />
            </a>
          </div>
          <ul className="nav nav-classic nav-sm border-0 nav-docs-space ms-auto">
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center px-2 px-sm-3 active"
                href="/documentation"
              >
                <span className="d-none d-sm-block">Documentation</span>
                <span className="d-sm-none">Docs</span>
              </a>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center px-2 px-sm-3"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container-fluid main-docs">
        <div className="row justify-content-lg-end">
          <nav className="col-lg-3 col-xl-2 muzesidebar navbar-expand-lg ms-2 px-0 muze-sidebar">
            <div className="collapse navbar-collapse show" id="sidebar-nav">
              <div
                id="sidebarNav"
                className="muzesidebar-scrollbar muzesidebar-sticky ps-2 ps-md-0 pe-2 accordion"
                data-simplebar
              >
                <a
                  className="muzesidebar-heading mb-0 active"
                  data-bs-toggle="collapse"
                  href="#getting-started-collapse"
                  role="button"
                  aria-expanded="true"
                >
                  Getting started
                </a>
                <ul
                  className="muzesidebar-nav collapse show mb-0"
                  id="getting-started-collapse"
                  data-bs-parent="#sidebarNav"
                >
                  <li className="muzesidebar-item">
                    <a
                      onClick={() => scrollTop()}
                      className="muzesidebar-link"
                      role="button"
                    >
                      Introduction
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a
                      href="#apiKey"
                      className="muzesidebar-link"
                      role="button"
                    >
                      API Key
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a
                      href="#strictRules"
                      className="muzesidebar-link"
                      role="button"
                    >
                      Strict Rules
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a
                      href="#demo"
                      className="muzesidebar-link"
                      role="button"
                    >
                      DEMO (Nodejs)
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a
                      href="#demoPython"
                      className="muzesidebar-link"
                      role="button"
                    >
                      DEMO (Python)
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a
                      href="#demoCSharp"
                      className="muzesidebar-link"
                      role="button"
                    >
                      DEMO (C#)
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a
                      href="#demoDart"
                      className="muzesidebar-link"
                      role="button"
                    >
                      DEMO (Dart)
                    </a>
                  </li>
                </ul>
                <a
                  className="collapsed muzesidebar-heading mb-0"
                  data-bs-toggle="collapse"
                  href="#components-collapse"
                  role="button"
                  aria-expanded="false"
                >
                  Authentication
                </a>
                <ul
                  className="muzesidebar-nav collapse mb-0"
                  id="components-collapse"
                  data-bs-parent="#sidebarNav"
                >
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#login">
                      Login
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#getuserinfo">
                      Get User Info
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#register">
                      Register
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#verifymail">
                      Verify Email
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#forgotpassword">
                      Forgot Password
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#resetpassword">
                      Reset Password
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#logout">
                      Logout
                    </a>
                  </li>
                </ul>
                <a
                  className="collapsed muzesidebar-heading mb-0"
                  data-bs-toggle="collapse"
                  href="#customize-collapse"
                  role="button"
                  aria-expanded="false"
                >
                  SendMail Endpoint
                </a>
                <ul
                  className="muzesidebar-nav collapse mb-0"
                  id="customize-collapse"
                  data-bs-parent="#sidebarNav"
                >
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#sendEmail">
                      Send Email
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#previewEmail">
                      Preview Email
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#retrieveallmails">
                      Retrieve Emails
                    </a>
                  </li>
                </ul>
                <a
                  className="collapsed muzesidebar-heading mb-0"
                  data-bs-toggle="collapse"
                  href="#content-collapse"
                  role="button"
                  aria-expanded="false"
                >
                  Resume Endpoint
                </a>
                <ul
                  className="muzesidebar-nav collapse mb-0"
                  id="content-collapse"
                  data-bs-parent="#sidebarNav"
                >
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#uploadResume">
                      Upload
                    </a>
                  </li>
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#trackResume">
                      Track Resume
                    </a>
                  </li>
                </ul>
                <a
                  className="collapsed muzesidebar-heading mb-0"
                  data-bs-toggle="collapse"
                  href="#forms-collapse"
                  role="button"
                  aria-expanded="false"
                >
                  Profile Endpoint
                </a>
                <ul
                  className="muzesidebar-nav collapse mb-0"
                  id="forms-collapse"
                  data-bs-parent="#sidebarNav"
                >
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#editProfile">
                      Edit Profile
                    </a>
                  </li>
                </ul>

                <a
                  className="collapsed muzesidebar-heading mb-0"
                  data-bs-toggle="collapse"
                  href="#more-collapse"
                  role="button"
                  aria-expanded="false"
                >
                  About Author
                </a>
                <ul
                  className="muzesidebar-nav collapse mb-0"
                  id="more-collapse"
                  data-bs-parent="#sidebarNav"
                >
                  <li className="muzesidebar-item">
                    <a className="muzesidebar-link" href="#contact">
                      Credits
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="col-xl-10 muze-docs-content">
            <div className="p-0 p-md-4">
              <div className="muzedocs-content-divider">
                <img
                  src="../assets/presentation/img/dashboard.png"
                  alt="Intro"
                />
              </div>
              <div className="muzedocs-content-divider">
                <h2 className="muzedocs-heading">
                  <span className="undersore-me">REFEM</span> for Developers
                </h2>
                <p>
                  *REFEM, short for résumé-followup-email-manager is an app that
                  allows you to send potential employers (maybe the recruiters)
                  a followup email just to remind them that you are still
                  interested in the Job in Question.
                </p>
              </div>
              <div id="apiKey" className="muzedocs-content-divider">
                <h2  className="muzedocs-heading">
                  API Key
                </h2>
                <p>Please always include your API key in the header of each request.</p>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {loggedIn?.apiKey}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard text={loggedIn?.apiKey}>
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>

              <div id="strictRules" className="muzedocs-content-divider">
                <h2  className="muzedocs-heading">
                  Strict Rules
                </h2>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Do not disclose your API Key to anyone
                    <span className="badge rounded-pill badge-danger">X</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Avoid Using Proxies
                    <span className="badge badge-danger rounded-pill">X</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Avoid creating multiple accounts
                    <span className="badge badge-danger rounded-pill">X</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Use Refem&apos;s API professionally
                    <span className="badge badge-danger rounded-pill">X</span>
                  </li>
                </ul>
              </div>

              <div className="muzedocs-content-divider">
                <h2 id="demo" className="muzedocs-heading">
                  DEMO (Nodejs)
                </h2>
                <p>A demo code on how to send email using <span className="text-success">axios</span> library with Nodejs.</p>
                <br />
                <div className="code-toolbar">
                  <pre className="rounded language-js">
                    <code className=" language-js" data-lang="js">
                      {DEMO}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={DEMO}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                </div>

                <div className="muzedocs-content-divider">
                  <h2 id="demoPython" className="muzedocs-heading">
                    DEMO (Python)
                  </h2>
                  <p>A demo code on how to send email using <span className="text-success">request</span> library in Python.</p>
                  <br />
                  <div className="code-toolbar">
                    <pre className="rounded language-js">
                      <code className=" language-js" data-lang="js">
                        {DEMOPYTHON}
                      </code>
                    </pre>
                    <div className="toolbar">
                      <div className="toolbar-item">
                        <CopyToClipboard
                          text={DEMOPYTHON}
                          
                        >
                          <a onClick={(e) => changeText(e)}>Copy</a>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                  </div>


              <div className="muzedocs-content-divider">
                <h2 id="demoCSharp" className="muzedocs-heading">
                  DEMO (C#)
                </h2>
                <p>A demo code on how to send email using <span className="text-success">RestSharp</span> in C#.</p>
                <br />
                <div className="code-toolbar">
                  <pre className="rounded language-js">
                    <code className=" language-js" data-lang="js">
                      {DEMOCSHARP}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={DEMOCSHARP}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                </div>

                <div className="muzedocs-content-divider">
                  <h2 id="demoDart" className="muzedocs-heading">
                    DEMO (Dart)
                  </h2>
                  <p>A demo code on how to send email using <span className="text-success">http</span> in Dart.</p>
                  <br />
                  <div className="code-toolbar">
                    <pre className="rounded language-js">
                      <code className=" language-js" data-lang="js">
                        {DEMODART}
                      </code>
                    </pre>
                    <div className="toolbar">
                      <div className="toolbar-item">
                        <CopyToClipboard
                          text={DEMODART}
                          
                        >
                          <a onClick={(e) => changeText(e)}>Copy</a>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                  </div>

              <div className="muzedocs-content-divider">
                <h2 id="login" className="muzedocs-heading">
                  Authentication
                </h2>
                <br />
                <h4>Login <span className="text-success">POST</span></h4>
                <p>This endpoint logs in an already registered User.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-git">
                    <code className=" language-git" data-lang="git">
                      {`${BASE_URL}/api/v1/auth/login`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/auth/login`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {LOGIN_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={LOGIN_BODY}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
            
                <br id="getuserinfo" />
                <h4 className="mt-4rem">Get User Info <span className="text-warning">GET</span></h4>
                <p>This endpoint gets the information of an already registered User.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/auth/loggedIn`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/auth/loggedIn`}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>

                <br id="register" />
                <h4 className="mt-4rem">Register <span className="text-success">POST</span></h4>
                <p>This endpoint registers a firstime user.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/auth/register`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/auth/register`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {REGISTER_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={REGISTER_BODY}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>

                <br id="verifymail" />
                <h4 className="mt-4rem">Verify Email <span className="text-success">POST</span></h4>
                <p>This endpoint sends verification code to a registered user&apos;s email address.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/auth/resend-activation-code`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/auth/resend-activation-code`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {EMAIL_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={EMAIL_BODY}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>


                <br id="forgotpassword" />
                <h4 className="mt-4rem">Forgot Password <span className="text-success">POST</span></h4>
                <p>This endpoint sends password reset link to a registered user&apos;s email address.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/auth/forgot-password`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/auth/forgot-password`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {EMAIL_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={EMAIL_BODY}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>


                <br id="resetpassword" />
                <h4 className="mt-4rem">Reset Password <span className="text-success">POST</span></h4>
                <p>This endpoint sends password reset link to a registered user&apos;s email address.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/auth/forgot-password?email=<EMAIL>&token=<TOKEN>`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/auth/forgot-password?email=<EMAIL>&token=<TOKEN>`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {PWD_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={PWD_BODY}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>


                <br id="logout" />
                <h4 className="mt-4rem">Log Out <span className="text-warning">GET</span></h4>
                <p>This endpoint destroys the active httpOnly cookie and logs out the user.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/auth/logout`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/auth/logout`}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>



              <div className="muzedocs-content-divider">
                <h2 id="sendEmail" className="muzedocs-heading">
                  SendMail Endpoint
                </h2>
                <br />
                <h4>SendMail <span className="text-success">POST</span></h4>
                <p>This endpoint sends email to the provided recruiter.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/mail/send`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/mail/send`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {MAIL_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={MAIL_BODY}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>

                <br id="previewEmail" />
                <h4 className="mt-4rem">Preview Email <span className="text-success">POST</span></h4>
                <p>This endpoint returns an HTML compiled form of the email (without sending!)</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/mail/preview`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/mail/preview`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {MAIL_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={MAIL_BODY}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>


                <br id="retrieveallmails" />
                <h4 className="mt-4rem">Retrieve Mails <span className="text-warning">GET</span></h4>
                <p>This endpoint returns all emails sent till date.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/mail/retrieve`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/mail/retrieve`}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>


              <div id="uploadResume" className="muzedocs-content-divider">
                <h2 id="resume" className="muzedocs-heading">
                  Resume
                </h2>
                <br  />
                <h4>Upload Resume <span className="text-success">POST</span></h4>
                <p>This endpoint uploads the resume of the user to cloudinary (Cloud Storage Service).</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/resume-upload`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/resume-upload`}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {FILE_BODY}
                    </code>
                  </pre>
                </div>


                <br id="trackResume" />
                <h4 className="mt-4rem">Track Resume <span className="text-warning">GET</span></h4>
                <p>This endpoint returns the data as well as the URL of the uploaded resume.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/resume-upload/retrieve`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/resume-upload/retrieve`}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>

              <div className="muzedocs-content-divider mt-4rem">
                <h2 id="editProfile" className="muzedocs-heading">
                  Profile
                </h2>

                <br  />
                <h4 >Edit Profile  <span className="text-primary">PATCH</span></h4>
                <p>This endpoint edits the profile of the user.</p>
                <h6>Endpoint</h6>
                <div className="code-toolbar">
                  <pre className="rounded language-html">
                    <code className=" language-html" data-lang="html">
                      {`${BASE_URL}/api/v1/profile/edit`}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={`${BASE_URL}/api/v1/profile/edit`}
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <h6>Body</h6>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {PROFILE_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={PROFILE_BODY}
                        
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="muzedocs-content-divider mt-4rem">
                <h2 id="contact" className="muzedocs-heading">
                  About Author
                </h2>
                <br  />
                <p>Thanks for stopping by.</p>
                <div className="code-toolbar">
                  <pre>
                    <code className="language-json">
                      {CONTACT_BODY}
                    </code>
                  </pre>
                  <div className="toolbar">
                    <div className="toolbar-item">
                      <CopyToClipboard
                        text={CONTACT_BODY} 
                      >
                        <a onClick={(e) => changeText(e)}>Copy</a>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>




            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
