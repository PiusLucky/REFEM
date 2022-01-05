import React from "react";


const FAQ = () => {
    return (
       <div className="muze-section mb-4 mt-3 mt-md-4">
        <h2 className="border-bottom border-gray-200 pb-3 pb-md-4 h1 border-top pt-4 pt-xxl-5 mb-0">
          <span className="d-block mb-lg-3 mt-md-4 pt-lg-2">F.A.Q on Resume</span>
        </h2>
        <div className="accordion muze-collapes" id="pricingboxes">
          <div className="card">
            <div className="card-header p-0" id="pricingOne">
              <h5 className="mb-0 d-grid">
                <button
                  className="btn btn-light btn-block text-start p-3 rounded-0 collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  What is Resume?
                </button>
              </h5>
            </div>
            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="pricingOne"
              data-bs-parent="#pricingboxes"
              style={{}}
            >
              <div className="card-body lh-lg pt-0 px-0">
                <div className="col-lg-10 col-xxl-8">
                  <p className="text-gray-700">
                    A <span className="badge badge-secondary mb-1">resume</span> is a formal document that a job applicant creates to itemize their qualifications for a position. A resume is usually accompanied by a customized cover letter in which the applicant expresses an interest in a specific job or company and draws attention to the most relevant specifics on the resume.
                    In simple words, A resume is a one page summary of your work experience and background relevant to the job you are applying for.  
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header p-0" id="pricingTwo">
              <h5 className="mb-0 d-grid">
                <button
                  className="btn btn-light btn-block text-start collapsed p-3 rounded-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  What is a CV?
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="pricingTwo"
              data-bs-parent="#pricingboxes"
            >
              <div className="card-body lh-lg pt-0 px-0">
                <div className="col-lg-10 col-xxl-8">
                  <p className="text-gray-700">
                    A <span className="badge badge-success mb-1">CV</span> —short for the Latin phrase “curriculum vitae”
                    meaning “course of life”—is a detailed document highlighting your
                    professional and academic history. CVs typically include information
                    like work experience, achievements and awards, scholarships or grants
                    you’ve earned, coursework, research projects and publications of your
                    work. A CV is typically two or three pages long, but it’s not unusual
                    for it to be much longer for mid-level or senior job applicants as it
                    serves as a full outline of one’s career accomplishments. 
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header p-0" id="pricingThree">
              <h5 className="mb-0 d-grid">
                <button
                  className="btn btn-light btn-block text-start collapsed p-3 rounded-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  How do I know the difference between a Resume and a CV?
                </button>
              </h5>
            </div>
            <div
              id="collapseThree"
              className="collapse"
              aria-labelledby="pricingThree"
              data-bs-parent="#pricingboxes"
            >
              <div className="card-body lh-lg pt-0 px-0">
                <div className="col-lg-10 col-xxl-8">
                  <p className="text-gray-700">
                    A resume is a one page summary of your work experience and
                    background relevant to the job you are applying for while a 
                    <span className="badge badge-secondary mb-1">CV</span> is a longer academic diary that includes all your
                    experience, certificates, and publications.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header p-0" id="pricingFour">
              <h5 className="mb-0 d-grid">
                <button
                  className="btn btn-light btn-block text-start collapsed p-3 rounded-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Should I Upload a CV Instead?
                </button>
              </h5>
            </div>
            <div
              id="collapseFour"
              className="collapse"
              aria-labelledby="pricingFour"
              data-bs-parent="#pricingboxes"
            >
              <div className="card-body lh-lg pt-0 px-0">
                <div className="col-lg-10 col-xxl-8">
                  <p className="text-gray-700">
                    <b>NO!</b> since <span className="badge badge-secondary mb-1">resumes</span> are mostly job specific, it is highly preferable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}


export default FAQ;