// Import necessary dependencies from  React Router
import { Outlet, useNavigation } from "react-router-dom";

// Import components used in the AppLayout component
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";

// AppLayout component defines the layout structure of the application
function AppLayout() {
  // Access the navigation object from React Router
  const navigation = useNavigation();

  // Check if the application is in a loading state
  const isLoading = navigation.state === "loading";

  return (
    // Main grid container with three rows: header, main content, and cart overview
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* Display loader if the application is in a loading state */}
      {isLoading && <Loader></Loader>}

      {/* Header component at the top of the layout */}
      <Header></Header>

      {/* Scrollable container for the main content */}
      <div className="overflow-scroll">
        {/* Main content area with a maximum width */}
        <main className="mx-auto max-w-3xl">
          {/* Render the children routes */}
          <Outlet></Outlet>
        </main>
      </div>

      {/* CartOverview component at the bottom of the layout */}
      <CartOverview></CartOverview>
    </div>
  );
}

// Export the AppLayout component as the default export
export default AppLayout;
