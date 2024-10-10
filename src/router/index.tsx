import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import App from '../App.tsx';
import {
    SignIn,
    SignUp,
    AdminPanel,
    Products,
    Categories,
    Brands,
    SubCategories,
    BrandCategories,
    Ads,
    Stock,
    NotFound,
    Settings,
} from '@pages';
import { Suspense } from "react";

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<App />}>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="admin-panel" element={<AdminPanel />}>
                        <Route index element={<Products />} />
                        {/* <Route path="product-details/:id" element={<ProductDetails />} /> */}
                        <Route path="categories" element={<Categories />} />
                        <Route path="categories/:id" element={<SubCategories />} />
                        <Route path="brands" element={<Brands />} />
                        <Route path="brand-categories" element={<BrandCategories />} />
                        <Route path="ads" element={<Ads />} />
                        <Route path="stock" element={<Stock />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />}></Route>
            </Route>
        )
    )
    return <Suspense fallback={<div className="w-full h-[80vh] flex justify-center items-center m-auto"><p className="text-orange-400 text-[24px]">Loading...</p> <div className="loader"></div></div>}>
        <RouterProvider router={router} />
    </Suspense>;
}
export default Index;

