import { lazy } from 'react';
const  SignIn  = lazy(() => import('./sign-in'));
const SignUp = lazy(() => import('./sign-up'));
const AdminPanel = lazy(() => import('./admin-panel'));
const Products = lazy(() => import('./products'));
const Categories = lazy(() => import('./categories'));
const Brands = lazy(() => import('./brands'));
const SubCategories = lazy(() => import('./sub-categories'));
const BrandCategories = lazy(() => import('./brand-categories'));
const Ads = lazy(() => import('./ads'));
const Stock = lazy(() => import('./stock'));
const Settings = lazy(() => import('./settings'));
const NotFound = lazy(() => import('./not-found'));

export{
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
    Settings
}