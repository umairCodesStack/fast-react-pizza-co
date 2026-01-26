import { createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
export function fetchAddress() {
  return async function (dispatch) {
    try {
      dispatch({ type: "user/loading" });

      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };

      const addressObj = await getAddress(position);
      const address = `${addressObj.locality}, ${addressObj.city}, ${addressObj.postcode}  ${addressObj.countryName}`;
      dispatch({
        type: "user/addressFetched",
        payload: { position, address },
      });
    } catch (err) {
      dispatch({
        type: "user/error",
        payload: err.message,
      });
    }
  };
}

const initialState = {
  userName: "",
  address: "",
  position: null,
  error: null,
  status: "idle",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
    loading(state) {
      state.status = "loading";
    },
    addressFetched(state, action) {
      state.status = "idle";
      state.address = action.payload.address;
      state.position = action.payload.position;
    },
    error(state, action) {
      state.status = "error";
      state.error = action.payload;
    },
  },
});
export const { updateName } = userSlice.actions;

export default userSlice.reducer;
