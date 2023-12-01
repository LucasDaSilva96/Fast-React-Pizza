// API URL for the restaurant server
const API_URL = "https://react-fast-pizza-api.onrender.com/api";

// Function to fetch the menu from the server
export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // Check if the response is not successful and throw an error
  if (!res.ok) throw Error("Failed getting menu");

  // Parse the JSON response and return the 'data' property
  const { data } = await res.json();
  return data;
}

// Function to fetch a specific order by its ID from the server
export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);

  // Check if the response is not successful and throw an error with a custom message
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  // Parse the JSON response and return the 'data' property
  const { data } = await res.json();
  return data;
}

// Function to create a new order on the server
export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not successful and throw an error
    if (!res.ok) throw Error();

    // Parse the JSON response and return the 'data' property
    const { data } = await res.json();
    return data;
  } catch {
    // Throw a generic error message if an exception occurs during the request
    throw Error("Failed creating your order");
  }
}

// Function to update an existing order on the server by its ID
export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not successful and throw an error
    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    // Throw a generic error message if an exception occurs during the request
    throw Error("Failed updating your order");
  }
}
