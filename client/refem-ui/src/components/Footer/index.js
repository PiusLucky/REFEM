import React from "react";


const FooterComp = () => {
    return (
      <footer className="pt-xxl-5 mt-lg-2">
        <div className="container-fluid px-0 border-top border-gray-200 pt-2 pt-lg-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="fs-16 text-gray-600 my-2">
                Handcrafted with{" "}
                <svg
                  aria-hidden="true"
                  role="img"
                  style={{ verticalAlign: "-0.125em" }}
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5c0 201.2-356 429.3-356 429.3z"
                    fillOpacity=".8"
                    fill="currentColor"
                  />
                  <path
                    d="M679.7 201c-73.1 0-136.5 40.8-167.7 100.4C480.8 241.8 417.4 201 344.3 201c-104 0-188.3 82.6-188.3 184.5c0 201.2 356 429.3 356 429.3s356-228.1 356-429.3C868 283.6 783.7 201 679.7 201z"
                    fillOpacity=".1"
                    fill="currentColor"
                  />
                </svg>{" "}
                somewhere in Niger State.
              </p>
            </div>
            <div className="col-md-6">
              <ul className="nav navbar">
                <li>
                  <a>About</a>
                </li>
                <li>
                  <a>Support</a>
                </li>
                <li>
                  <a>Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
}


export default FooterComp;