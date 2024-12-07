import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={"product"} element={<Product />} />
          <Route path={"pricing"} element={<Pricing />} />
          <Route path={"app"} element={<AppLayout />}>
            <Route index element={<p>List</p>} />
            <Route path={"cities"} element={<p>cities</p>} />
            <Route path={"countries"} element={<p>countries</p>} />
            <Route path={"form"} element={<p>form</p>} />
          </Route>
          <Route path={"login"} element={<Login />} />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
