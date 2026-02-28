import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GuestId } from "../../../utils/Guest";

export const WishlistApiSlice = createApi({
  reducerPath: "WishlistApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mutes-backend.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Wishlist", "cart"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => {
        const guestId = GuestId();
        return `/wishlist?guestId=${guestId}`;
      },
      providesTags: ["Wishlist"],
    }),

    addWishlist: builder.mutation({
      query: (productId) => ({
        url: "/wishlist/add",
        method: "POST",
        body: {
          productId,
          guestId: GuestId(),
        },
      }),
      invalidatesTags: ["Wishlist"],
    }),

    moveTocart: builder.mutation({
      query:(data)=>({
        url:"/wishlist/moveToCart",
        method:"POST",
        body:{
          data,
          guestId: GuestId(),}
      }),
      invalidatesTags: ["cart","Wishlist"]
    }),

    removeWishlist: builder.mutation({
      query: (productId) => ({
        url: "/wishlist/remove",
        method: "DELETE",
        body: {
          productId,
          guestId: GuestId(),
        },
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddWishlistMutation,
  useRemoveWishlistMutation,
  useMoveTocartMutation,
} = WishlistApiSlice;
