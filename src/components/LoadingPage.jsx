import React from "react";

import gif from "../media/preloader2.gif";

const LoadingPage = () => {
  return (
    <div className="preloader">
      <img src={gif} alt="preloader" />
    </div>
  );
};

export default LoadingPage;
