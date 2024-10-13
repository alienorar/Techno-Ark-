import https from "./config";
import { CategoryType } from '@types'; 
const category:CategoryType = {
    create: (data) => https.post("/category/create", data),
    get: (params) => https.get("/category/search",{params}),
    update: (id, data) => https.patch(`/category/update/${id}`, data),
    delete: (id) => https.delete(`/category/delete/${id}`),
    getCategory: () => https.get("/category/search")
};

export default category;
