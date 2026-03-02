import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'https://mutes-backend.onrender.com',
    }),
    tagTypes:["Products"],
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:(params = {}) => {
                const queryParams = new URLSearchParams();
                
                // Add pagination
                if (params.page) queryParams.append('page', params.page);
                if (params.limit) queryParams.append('limit', params.limit);
                
                // Add search
                if (params.search) queryParams.append('search', params.search);
                
                // Add filters
                if (params.category) queryParams.append('category', params.category);
                if (params.minPrice) queryParams.append('minPrice', params.minPrice);
                if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice);
                if (params.size) queryParams.append('size', params.size);
                if (params.color) queryParams.append('color', params.color);
                if (params.condition) queryParams.append('condition', params.condition);
                if (params.gender) queryParams.append('gender', params.gender);
                if (params.sort) queryParams.append('sort', params.sort);
                
                const queryString = queryParams.toString();
                return `/products${queryString ? '?' + queryString : ''}`;
            },
            providesTags:["Products"],
            transformResponse: (response) => response,
        }),
        getProductById:builder.query({
            query:(id)=>`/products/${id}`,
            transformResponse: (response) => response.products
        })
    })
})

export const {useGetAllProductsQuery,useGetProductByIdQuery} = productsApi;