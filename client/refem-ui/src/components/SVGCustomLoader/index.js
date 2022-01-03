import React from "react";

const SVGCustomLoader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: "auto", background: "none" }}
      width="200"
      height="200"
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <path
        fill="none"
        stroke="purple"
        strokeDasharray="192.4416961669922 64.14723205566406"
        strokeLinecap="round"
        strokeWidth="6"
        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
        style={{
          WebkitTransformOrigin: 50,
          MsTransformOrigin: 50,
          transformOrigin: 50,
        }}
      >
        <animate
          attributeName="stroke-dashoffset"
          dur="1.0204081632653061s"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="0;256.58892822265625"
        ></animate>
      </path>
    </svg>
  );
};



export default SVGCustomLoader;