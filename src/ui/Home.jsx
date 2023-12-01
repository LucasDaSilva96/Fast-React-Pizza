// Import necessary dependencies from React and Redux
import React from "react";
import { useSelector } from "react-redux";

// Import components used in the Home component
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

// Home component displays the home page content
function Home() {
  // Access the username from the Redux store
  const username = useSelector((state) => state.user.username);

  return (
    // Container with margin, padding, and text centering styles
    <div className="my-10 px-4 text-center sm:my-16">
      {/* Main heading */}
      <h1 className="mb-8 text-xl font-semibold">
        The best pizza.
        <br />
        {/* Subheading with additional styling for larger screens */}
        <span className="text-yellow-500 md:text-3xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {/* Conditional rendering based on whether a username is present */}
      {username === "" ? (
        // Display CreateUser component if username is not set
        <CreateUser></CreateUser>
      ) : (
        // Display a Button component to continue ordering with a personalized message
        <Button to="/menu" type="primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

// Export the Home component as the default export
export default Home;
