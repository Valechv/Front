import { Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PrivateRoute from "./PrivateRoute";
import useRefreshToken from "../hooks/useRefreshToken";
import Loading from "../components/shared/Loading";
import LoginPage from "../pages/auth/LoginPage";

import HomeLayout from "../pages/home/HomeLayout";
import HomePage from "../pages/home/dashboard";
import RegisterPage from "../pages/auth/RegisterPage";

const RootRouter = () => {
  const { loading } = useRefreshToken();

  if (loading) return <Loading />;

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomeLayout />}>
            {/* Root Suspense */}
            <Route
              element={
                <Suspense fallback={<Loading />}>
                  <Outlet />
                </Suspense>
              }
            >
              <Route index element={<HomePage />} />
            </Route>
          </Route>
        </Route>

        <Route path="auth">
          <Route
            path="login"
            element={
              <Suspense fallback={<Loading />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Loading />}>
                <RegisterPage />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </AnimatePresence>
  );
};

export default RootRouter;
