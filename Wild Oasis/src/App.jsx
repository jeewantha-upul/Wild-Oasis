import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "../src/components/SpinnerFullPage";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Login = lazy(() => import("./pages/Login"));
// import HomePage from "./pages/HomePage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";
import { ProtectedRoutes } from "./pages/ProtectedRoutes";

function App() {
  return (
    <CitiesProvider>
      <FakeAuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path={"product"} element={<Product />} />
              <Route path={"pricing"} element={<Pricing />} />
              <Route
                path={"app"}
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path={"cities"} element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path={"countries"} element={<CountryList />} />
                <Route path={"form"} element={<Form />} />
              </Route>
              <Route path={"login"} element={<Login />} />
              <Route path={"*"} element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FakeAuthProvider>
    </CitiesProvider>
  );
}

export default App;
