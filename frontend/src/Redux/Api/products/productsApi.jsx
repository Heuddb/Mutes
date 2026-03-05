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

                const appendIfDefined = (key, value) => {
                    if (value !== undefined && value !== null && value !== "") {
                        queryParams.append(key, value);
                    }
                };
                
                // Add pagination
                appendIfDefined('page', params.page);
                appendIfDefined('limit', params.limit);
                
                // Add search
                appendIfDefined('search', params.search);
                
                // Add filters
                appendIfDefined('category', params.category);
                appendIfDefined('minPrice', params.minPrice);
                appendIfDefined('maxPrice', params.maxPrice);
                appendIfDefined('size', params.size);
                appendIfDefined('color', params.color);
                appendIfDefined('condition', params.condition);
                appendIfDefined('gender', params.gender);
                appendIfDefined('sort', params.sort);
                
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
