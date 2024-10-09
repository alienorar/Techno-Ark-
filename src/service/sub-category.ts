import { SubCategoryType } from "@types";
import https from "./config";
const subCategory:SubCategoryType = {
    create: (data) => https.post("/sub-category/create", data),
    get: (parent_category_id) => https.get(`/sub-category/search/${parent_category_id}`),
    update: (id, data) => https.patch(`/sub-category/update/${id}`,data),
    delete: (id) => https.delete(`/sub-category/delete/${id}`),
};

export default subCategory;
