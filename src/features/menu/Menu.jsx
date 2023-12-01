// Import necessary dependencies from React and React Router
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

// Menu component represents the list of pizzas in the menu
function Menu() {
  // Fetch the menu data using the useLoaderData hook
  const menu = useLoaderData();

  return (
    // Container for the list of pizzas
    <ul className=" divide-y divide-stone-200 px-2">
      {/* Iterate over each pizza in the menu and render a MenuItem component */}
      {menu.map((pizza) => {
        return <MenuItem pizza={pizza} key={pizza.id} />;
      })}
    </ul>
  );
}

// Loader function to fetch the menu data before rendering the component
export async function loader() {
  // Fetch the menu data using the getMenu function from the API
  const menu = await getMenu();
  return menu;
}

// Export the Menu component as the default export
export default Menu;
