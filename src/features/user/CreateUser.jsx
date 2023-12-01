import Button from "../../ui/Button";
// Import necessary dependencies from React Redux
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// CreateUser component allows users to input their name to start using the app
function CreateUser() {
  // Local state to manage the input value for the username
  const [username, setUsername] = useState("");

  // Redux dispatch function to update the username in the store
  const dispatch = useDispatch();

  // React Router's useNavigate hook for navigation
  const navigate = useNavigate();

  // Handler function for form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Check if the username is not empty
    if (!username) return;

    // Dispatch an action to update the username in the Redux store
    dispatch(updateName(username));

    // Navigate to the menu page after updating the username
    navigate("/menu");
  }

  return (
    // Form for collecting user's name
    <form onSubmit={handleSubmit}>
      {/* Introduction message */}
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      {/* Input field for the username */}
      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8"
      />

      {/* Display a button if the username is not empty */}
      {username !== "" && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

// Export the CreateUser component as the default export
export default CreateUser;
