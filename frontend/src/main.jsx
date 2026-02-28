import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/HomePages/Home.jsx";
import Login from "./pages/AuthPage/Login.jsx";
import SignUp from "./pages/AuthPage/SignUp.jsx";
import { Cart } from "./pages/UserDashboard/Cart/Cart.jsx";
import WishlistPage from "./pages/UserDashboard/WishlistPage.jsx";
import OrderPage from "./pages/UserDashboard/Orders/OrderPage.jsx";
import GiftCardPage from "./pages/UserDashboard/GiftCardPage.jsx";
import CouponPage from "./pages/UserDashboard/CouponPage.jsx";
import SupportPage from "./pages/UserDashboard/SupportPage.jsx";
import AddressPage from "./pages/UserDashboard/Address/AddressPage.jsx";
import CollectionPage from "./pages/UserDashboard/CollectionPage/CollectionPage.jsx";
import ProductDetails  from "./pages/ProductDetails/ProductDetails.jsx";
import OtpForm from "./pages/AuthPage/OtpForm.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store.jsx";

import  RequireAuth from "./utils/RequireAuth.jsx";
import { Toaster } from "react-hot-toast";
import Payment from "././pages/payment/Payment.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,


    children: [
      {
        path: "/collections/gender/:gender",
        element: <CollectionPage/>,
      },
      {
        path: "",
        element: <Home />,
      },

      {
        path: "/collections/category/:category",
        element: <CollectionPage/>,
      },
      {
        path: "/collections/condition/:condition",
        element: <CollectionPage/>,
      },

      {
        path: "/product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/Wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/orders",
        element: <OrderPage />,
      },
      {
        path: "/gift-cards",
        element: <GiftCardPage />,
      },
      {
        path: "/coupons",
        element: <CouponPage />,
      },
      {
        path: "/help",
        element: <SupportPage />,
      },
      {
        path: "/collection",
        element: <CollectionPage />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUp />,
      },
      {
        path: "/auth/verify-otp",
        element: <OtpForm />,
      },
    ],
  },
  {
    path:'/checkout',
    children:[
      {
        path:'address',
        element:( 
          <RequireAuth>
            <AddressPage/>
          </RequireAuth>
        )
      },

      {
        path:'payment',
        element:( 
          <RequireAuth>
            <Payment/>
          </RequireAuth>
        )
      }
    ]
  },

 
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
            <Toaster
        position="top-right" 
        toastOptions={{
          duration: 5000,
          style: {
            background: "#FFFFFF",
            color: "#0F0F0F",
            border: "1px solid #1F2937",
            borderRadius: "10px",
            fontSize: "14px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            height:"70px"
          },
          success: {
            style: {
              border: "1px solid #FFFFFF",
            },
          },
          error: {
            style: {
              background: "#FFFFFF",
              color: "#000000",
              border: "1px solid #FFFFFF"
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
