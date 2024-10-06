import "./index.css";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { BlogCreatePage } from "./pages/BlogCreatePage";
import { Layout } from "./components/Layout";
import { BlogDetails } from "./pages/BlogDetails";
import { PrivateRoute } from "./private-route";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { getAuthToken } from "./lib/utils";
import { AuthWrapper } from "./useAuth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BlogEditPage } from "./pages/BlogEditPage";
import { MyBlogs } from "./pages/MyBlogs";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index={true} path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/blogs/:blogId" element={<BlogDetails />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/blogs/create" element={<BlogCreatePage />} />
        <Route path="/blogs/edit/:blogId" element={<BlogEditPage />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
      </Route>
    </Route>
  )
);

export const clientId = "gogle-clien=od";

const App = () => {
  useEffect(() => {
    // function start() {
    //   gapi.client.init({
    //     clientId,
    //     scope: "profile",
    //   });
    // }
    // gapi.load("client:auth2", start);
  }, []);

  return <RouterProvider router={router} />;
};
createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <App />
    <ToastContainer />
  </AuthWrapper>
);
