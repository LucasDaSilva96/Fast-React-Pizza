// Import necessary dependencies from React Router
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

// UpdateOrder component allows users to update order details, in this case, to make it a priority
function UpdateOrder({ order }) {
  // Use the fetcher hook from React Router for making PATCH requests
  const fetcher = useFetcher();

  return (
    // Form for updating the order with a priority button
    <fetcher.Form method="PATCH" className="text-right">
      {/* Button to make the order a priority */}
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

// Export the UpdateOrder component as the default export
export default UpdateOrder;

// Async function to define the action to be performed when the form is submitted
export async function action({ request, params }) {
  // Data to be sent for updating the order (in this case, setting priority to true)
  const data = { priority: true };

  // Call the updateOrder function from the API service to update the order
  await updateOrder(params.orderId, data);

  // Return null as there's no specific data to be returned after the update
  return null;
}
