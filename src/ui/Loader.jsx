// Import React for creating React components
import React from "react";

// Loader component displays a loading spinner
function Loader() {
  return (
    // Full-screen container with flex layout to center the content
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      {/* Loading spinner element */}
      <div className="loader"></div>
    </div>
  );
}

// Export the Loader component as the default export
export default Loader;
