// Import necessary dependencies from React and React Router
import React from "react";
import { Link } from "react-router-dom";

// Import components used in the Header component
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

// Header component displays the header section of the application
function Header() {
  return (
    // Header container with flex layout, border, background color, and padding styles
    <header className="flex items-center justify-between border-b-2 border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      {/* Link to the home page with custom tracking styling */}
      <Link className="tracking-[5px]" to="/">
        Fast React Pizza Co.
      </Link>

      {/* SearchOrder component for searching orders */}
      <SearchOrder></SearchOrder>

      {/* Username component for displaying and managing user information */}
      <Username></Username>
    </header>
  );
}

// Export the Header component as the default export
export default Header;
