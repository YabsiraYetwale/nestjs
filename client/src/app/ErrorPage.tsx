// ErrorPage.js
import React from "react";

const ErrorPage = ({ statusCode }) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>Sorry, there was an error.</p>
    </div>
  );
};

export default ErrorPage;