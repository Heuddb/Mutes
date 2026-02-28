import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000',
         prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
    }),
    endpoints:(builder)=>({
        signUp:builder.mutation({
            query:(data)=>({
                url:'/auth/signup',
                method:'POST',
                body:data
            })
        }),

        login:builder.mutation({
            query:(data)=>({
                url:'/auth/login',
                method:'POST',
                body:data
            })
        }),
        resendOtp:builder.mutation({
            query:(data)=>({
                url:'/auth/resend-otp',
                method:'POST',
                body:data
            })

        }),
        verifyOtp:builder.mutation({
            query:(data)=>({
                url:'/auth/verify-otp',
                method:'POST',
                body:data
            })
        })
    })
})

export const {useSignUpMutation,useLoginMutation,useVerifyOtpMutation,useResendOtpMutation} = authApiSlice;