// Import necessary dependencies from Redux Toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Import the getAddress function from the geocoding service
import { getAddress } from "../../services/apiGeocoding";

// Function to retrieve the user's geolocation position using the Geolocation API
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// Async thunk to fetch the user's address based on their geolocation
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) Retrieve the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Use reverse geocoding API to get a description of the user's address
    const addressObj = await getAddress(position);
    const address = `${addressObj.principalSubdivision}, ${addressObj.city} ${addressObj.postcode}, ${addressObj.countryName}`;

    // 3) Return an object with the relevant data
    return { position, address };
  },
);

// Initial state for the user slice
const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

// Define the user slice with reducers and extraReducers for handling async actions
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer to update the user's name
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      // Reducer for handling the pending state of the fetchAddress async thunk
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      // Reducer for handling the fulfilled state of the fetchAddress async thunk
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      // Reducer for handling the rejected state of the fetchAddress async thunk
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          "There was a problem getting your address. Make sure to fill this field! ";
      }),
});

// Export the updateName action and the userSlice reducer
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
