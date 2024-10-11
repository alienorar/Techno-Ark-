import { BrandCategoryType } from "@types";
import https from "./config";
const brandCategory:BrandCategoryType = {
    create: (data) => https.post("/brand-category/create", data),
    get: (params) => https.get(`brand-category/search/`,{params}),
    update: (id, data) => https.patch(`/brand-category/update/${id}`, data),
    delete: (id) => https.delete(`/brand-category/delete/${id}`),
    getBrandCat: (id) => https.get(`/brand-category/brand/${id}`),
    getBrands: () => https.get("/brand/search/")
};

export default brandCategory;