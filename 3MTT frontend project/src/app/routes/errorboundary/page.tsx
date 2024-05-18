"use client"
import React from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import ErrorComponent from '../../components/ErrorComponent';

const ErrorPage = () => {
  return (
    <div>
      <h1>Page to test the already created error boundary.</h1>
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    </div>
  );
};

export default ErrorPage;
