"use client";

import React from "react";
import Error from "../../../components/Error";

const ErrorBoundary = ({ error, reset }) => {
  return <Error error={error} reset={reset} />;
};

export default ErrorBoundary;
