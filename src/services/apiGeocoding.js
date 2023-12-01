// Function to fetch address information based on latitude and longitude using a geocoding API
export async function getAddress({ latitude, longitude }) {
  // Perform a fetch request to the geocoding API with the provided coordinates
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );

  // Check if the response is not successful and throw an error
  if (!res.ok) throw Error("Failed getting address");

  // Parse the JSON response and return the data
  const data = await res.json();
  return data;
}
