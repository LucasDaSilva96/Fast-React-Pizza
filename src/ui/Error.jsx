// Import necessary dependencies from React and React Router
import React from "react";
import { useRouteError } from "react-router-dom";

// Import the LinkButton component used in the Error component
import LinkButton from "./LinkButton";

// Error component displays an error message and provides a way to navigate back
function Error() {
  // Access the error information from the current route
  const error = useRouteError();

  return (
    // Container for displaying error information
    <div>
      {/* Main heading for the error message */}
      <h1>Something went wrong 😢</h1>

      {/* Paragraph displaying the error data or message */}
      <p>{error.data || error.message}</p>

      {/* LinkButton component for navigating back */}
      <LinkButton to={"-1"}>&larr; Go back</LinkButton>
    </div>
  );
}

// Export the Error component as the default export
export default Error;
