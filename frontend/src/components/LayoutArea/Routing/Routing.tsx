import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../PagesArea/Home/Home";
import { PaintingList } from "../../ProductArea/ProductList/ProductList";
import { Page404 } from "../../PagesArea/Page404/Page404";
import { lazy, Suspense } from "react";
import { PaintingDetails } from "../../ProductArea/ProductDetails/ProductDetails";
import { AddPainting } from "../../ProductArea/AddProduct/AddProduct";
import { EditPainting } from "../../ProductArea/EditProduct/EditProduct";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { TopPaintings } from "../../ProductArea/TopThree/TopThree";
import { ContactUs } from "../../PagesArea/ContactUs/ContactUs";

export function Routing() {

    // Create the component as a lazy-loading component: 
    const LazyAbout = lazy(() => import("../../PagesArea/About/About"));

    return (
        <Routes>

            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Navigate to="/home" />} />

            <Route path="/register" element={<Register />} />

            <Route path="/login" element={<Login />} />

            <Route path="/home" element={<Home />} />

            <Route path="/paintings" element={<PaintingList />} />

            <Route path="/painting-details/:id" element={<PaintingDetails />} />

            <Route path="/add-painting" element={<AddPainting />} />

            <Route path="/edit-painting/:id" element={<EditPainting />} />

            <Route path="/featured" element={<TopPaintings />} />

            <Route path="/gallery" element={<TopPaintings />} />

            {/* Lazy-loading the about component: */}
            <Route path="/about" element={<Suspense> <LazyAbout /> </Suspense>} />

            <Route path="/contact-us" element={<ContactUs />} />

            <Route path="*" element={<Page404 />} />

        </Routes>
    );
}
