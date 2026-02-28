import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AddressApi = createApi({
    reducerPath:'AddressApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://mutes-backend.onrender.com',
         prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    }),
    tagTypes:['Address'],
    endpoints:(builder)=>({
        getAddress:builder.query({ 
            query:()=>'/address',
            providesTags:['Address']
        }),

        addAddress:builder.mutation({
            query:(data)=>({
                url:'/add-address',
                method:'POST',
                body:data
            }),
            invalidatesTags:['Address']
        }),
        deleteAddress:builder.mutation({
            query:(addressId)=>({
            url:'/delete-address',
            method:'DELETE',
            body:{addressId}
            }),
            invalidatesTags:['Address']
        }),
        setDefault:builder.mutation({
            query:(addressId)=>({
                url:'/set-default',
                method:'PUT',
                body:{addressId},
            }),
            invalidatesTags:['Address']
        }),
        updateAddress:builder.mutation({
            query:(data)=>({
                url:'/update-address',
                method:'PUT',
                body:data
            }),
            invalidatesTags:['Address']
        }),
        
    })
})

export const {useGetAddressQuery,useAddAddressMutation,useDeleteAddressMutation,useSetDefaultMutation,useUpdateAddressMutation} = AddressApi