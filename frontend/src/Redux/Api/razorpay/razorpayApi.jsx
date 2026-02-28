import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const razorpayApi = createApi({
    reducerPath:"razorpayApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://mutes-backend.onrender.com",
        prepareHeaders:(headers,{getState})=>{
             const token = getState().auth.token;
            if(token) headers.set("authorization",`Bearer ${token}`);
            return headers; 
        },
            
    }),

    endpoints:(builder)=>({
        createOrder:builder.mutation({
            query:(data)=>({
                url:'/create-Order',
                method:"POST",
                body:data
            })
        }),

        verifyPayment:builder.mutation({
            query:(data)=>({
                url:'/verify-payment',
                method:"POST",
                body:data
            })
        })
    })
});

export const {useCreateOrderMutation,useVerifyPaymentMutation} = razorpayApi;

