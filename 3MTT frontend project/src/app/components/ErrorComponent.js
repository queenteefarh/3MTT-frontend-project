import React, { useEffect } from 'react';

const ErrorComponent = () => {
  useEffect(() => {
    // Simulate an error by throwing an error after component is mounted
    throw new Error('This is a simulated error for testing.');
  }, []);

  // This part will not be executed because an error has been thrown above
  return <div>This component will not render because an error occurred.</div>;
};

export default ErrorComponent;

