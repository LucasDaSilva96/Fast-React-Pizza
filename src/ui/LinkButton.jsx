// Import necessary dependencies from React and React Router
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// LinkButton component creates a button or link based on the provided 'to' prop
function LinkButton({ children, to }) {
  // Access the navigate function from React Router
  const navigate = useNavigate();

  // Common CSS class for styling the link/button
  const className = "text-sm text-blue-500 hover:text-blue-600 hover:underline";

  // If 'to' prop is set to "-1", render a button that navigates back in history
  if (to === "-1") {
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );
  }

  // Otherwise, render a link using React Router's Link component
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

// Export the LinkButton component as the default export
export default LinkButton;
