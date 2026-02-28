import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GuestId } from "../../../utils/Guest";

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["cart","Wishlist"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => {
        const guestId = GuestId();
        return `/cart?guestId=${guestId}`;
      },
      providesTags: ["cart","Wishlist"],
    }),

    addToCart: builder.mutation({
      query: (data) => {
        const guestId = GuestId();
        return {
          url: `/cart/add?guestId=${guestId}`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["cart"],
    }),

    removeCart: builder.mutation({
      query: (productId) => {
        return {
          url: `/cart/remove?guestId=${GuestId()}`,
          method: "DELETE",
          body: {
            productId,
          },
        };
      },

      invalidatesTags: ["cart"],
    }),

    updateCart: builder.mutation({
      query: (data) => {
        return {
          url: `/cart/update?guestId=${GuestId()}`,
          method: "PUT",
          body: data,
        };
      },

      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveCartMutation,
  useUpdateCartMutation,
} = cartApiSlice;
