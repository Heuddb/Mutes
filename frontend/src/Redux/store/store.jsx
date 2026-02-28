import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../Slices/authSlice"
import { authApiSlice } from "../Api/auth/authApiSlice"
import { productsApi } from "../Api/products/productsApi"
import { WishlistApiSlice } from "../Api/wishlist/WishListApiSlice"
import { cartApiSlice } from "../Api/cart/cartApiSlice"
import { AddressApi } from "../Api/Address/AddressApi"
import addressReducer  from "../Slices/addressIdSlice"
import { ordersApi } from "../Api/Orders/orderApi"
import { razorpayApi } from "../Api/razorpay/razorpayApi"


export const store =  configureStore({
    reducer:{
        auth:authReducer,
        address:addressReducer,
        [authApiSlice.reducerPath]:authApiSlice.reducer,
        [productsApi.reducerPath]:productsApi.reducer,
        [WishlistApiSlice.reducerPath]:WishlistApiSlice.reducer,
        [cartApiSlice.reducerPath]:cartApiSlice.reducer,
        [AddressApi.reducerPath]:AddressApi.reducer,
        [ordersApi.reducerPath]:ordersApi.reducer,
        [razorpayApi.reducerPath]:razorpayApi.reducer,
    },
    devTools:true,
    preloadedState:{
    },

    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authApiSlice.middleware,productsApi.middleware,WishlistApiSlice.middleware,cartApiSlice.middleware,AddressApi.middleware,ordersApi.middleware,razorpayApi.middleware),
   
    

})