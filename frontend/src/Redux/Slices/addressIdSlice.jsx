import { createSlice } from "@reduxjs/toolkit";

const initialState={
    addressId: localStorage.getItem("addressId") || null,
}
 const addressidSlice = createSlice({
    name: "addressId",
    initialState,
    reducers:{
        setAddressId:(state,action)=>{
            state.addressId = action.payload;
            localStorage.setItem("addressId",action.payload);
        }
    }

})

export const {setAddressId} = addressidSlice.actions;

export default addressidSlice.reducer;