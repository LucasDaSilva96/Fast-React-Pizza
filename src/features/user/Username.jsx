// Import necessary dependencies from React Redux
import { useSelector } from "react-redux";

// Username component displays the username from the Redux store
function Username() {
  // Access the username from the Redux store
  const username = useSelector((state) => state.user.username);

  // Return null if username is not available
  if (!username) return null;

  // Display the username in a hidden block for medium and larger screens
  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

// Export the Username component as the default export
export default Username;
