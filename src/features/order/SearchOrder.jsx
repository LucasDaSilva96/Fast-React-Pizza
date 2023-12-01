// Import necessary dependencies from React and React Router
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// SearchOrder component allows users to search for a specific order by its number
function SearchOrder() {
  // Local state to manage the input value for the order number
  const [query, setQuery] = useState("");

  // React Router's useNavigate hook for navigation
  const navigate = useNavigate();

  // Handler function for form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Check if the query is not empty
    if (!query) return;

    // Navigate to the order details page based on the entered order number
    navigate(`/order/${query}`);

    // Clear the query after navigation
    setQuery("");
  }

  return (
    // Form for searching orders by order number
    <form onSubmit={handleSubmit}>
      {/* Input field for entering the order number */}
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-200 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-64"
      ></input>
    </form>
  );
}

// Export the SearchOrder component as the default export
export default SearchOrder;
