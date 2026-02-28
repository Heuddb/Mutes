import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'https://mutes-backend.onrender.com',
 
  
    }),
    tagTypes:["Products"],
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:()=>"/products",
            providesTags:["Products"],
           transformResponse: (response) => response.products,
            
        }),
        getProductById:builder.query({
            query:(id)=>`/products/${id}`
        })
    })
})

export const {useGetAllProductsQuery,useGetProductByIdQuery} = productsApi;