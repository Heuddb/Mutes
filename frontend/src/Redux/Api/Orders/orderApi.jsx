import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  tagTypes: ["orders"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mutes-backend.onrender.com",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/my-orders",
      providesTags: ["orders"],
      transformResponse: (response) => response.orders,
    }),

    prepareOrder: builder.mutation({
      query: (data) => ({
        url: "/prepare-order",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useGetOrdersQuery, usePrepareOrderMutation } = ordersApi;
