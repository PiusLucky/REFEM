![Logo](https://user-images.githubusercontent.com/32282934/148679332-e9069c6f-8092-46ba-a18c-f1e6f8db853a.png)

[![License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/PiusLucky/REFEM/blob/main/LICENSE)

### Disclaimer
Please do not use this piece of software in incognito mode as it doesn't support(or store) any kind of cookie.

## Go Live
[Website](https://refem.vercel.app)

## :checkered_flag: Get Your Resume to Your Employer
*REFEM, short for résumé-followup-email-manager is an app that allows you to send potential employers (maybe the recruiters) a followup email just to remind them that you are still interested in the Job in Question.

## Dashboard
![dashboard](https://user-images.githubusercontent.com/32282934/148679388-00644f28-438a-4fc2-8a6e-659acd024c44.png)

## Email Preview
![emailPreview](https://user-images.githubusercontent.com/32282934/148679410-e691ca07-2075-4d90-93d2-4a964e76f36e.png)

## Track Mails
![mailTracking](https://user-images.githubusercontent.com/32282934/148679421-4806a7af-413d-498b-a16e-90e0ae9cf679.png)


## :traffic_light: Free API calls
You can send up to a total of fifty (50) emails to different recruiters daily.

## :pencil: Attach Resume
Attaching a copy of your resume to your email will give your potential employer the easy-access to re-evaluate your skills on the Job in Question.

## :traffic_light: Documentation
We have a full blown documentation with code snippet (including "demo" from NodeJs, Python, C#, and Dart) on how to implement our API in your application.


### Demo (NodeJs)
A demo code on how to send email using axios library with Nodejs.

```js
const axios = require('axios');
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
  url: 'https://refem-api-v1.herokuapp.com/api/v1/mail/send',
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
```


### Demo (Python)
A demo code on how to send email using request library with Python.
```py
import requests
import json

url = "https://refem-api-v1.herokuapp.com/api/v1/mail/send"

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
```

### More demo?

[Documentation](https://refem.vercel.app/documentation)


## API Reference

#### Send Mail [POST]
This endpoint sends email to the provided recruiter.

```terminal
   https://refem-api-v1.herokuapp.com/api/v1/mail/send
```
###### Body
```js
 {
  "subjectLine": "<SUBJECT_LINE>",
  "recruiterName": "<RECRUITER_NAME>",
  "recruiterEmail": "<RECRUITER_EMAIL>",
  "resumeSubmissionDate": "<RESUME_SUBMISSION_DATE>",
  "companyName": "<COMPANY_NAME>",
  "positionType": "String: Choose one of [Fullstack, Frontend, Backend]",
  "templateType": "String: Choose one of ["Email01, Email02"]"
 }
```

| Header    | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |



### Other Endpoints?

#### Login [POST]
This endpoint logs in an already registered User.

```terminal
   https://refem-api-v1.herokuapp.com/api/v1/auth/login
```
###### Body
```json
  {
    "username_email":"<USRENAME_OR_EMAIL>",
    "password": "<PASSWORD>"
  }
```

#### Get User Info [GET]
This endpoint gets the information of an already registered User.

```terminal
   https://refem-api-v1.herokuapp.com/api/v1/auth/loggedIn
```

#### Register [POST]
This endpoint registers a firstime user.

```terminal
   https://refem-api-v1.herokuapp.com/api/v1/auth/register
```
###### Body
```json
  {
  "username": "<USRENAME_OR_EMAIL>",
  "firstname": "<FIRSTNAME>",
  "lastname": "<LASTNAME>",
  "phoneNumber": "<PHONE_NUMBER>",
  "email": "<EMAIL>",
  "password": "<PASSWORD>",
  "repeatPassword": "<PASSWORD>"
}
```


### Check Documentation for More

[Documentation](https://refem.vercel.app/documentation)
