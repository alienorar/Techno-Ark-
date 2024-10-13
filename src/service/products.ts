import { ProductType } from "@types";
import https from "./config";
const products:ProductType = {
    create: (data) => https.post(`products/create/`, data),
    get: (params) => https.get("/products/search", { params }),
    update: (id, data) => https.patch(`/products/update/${id}`, data),
    delete: (id) => https.delete(`/products/delete/${id}`),
    getById: (id) => https.get(`/products/${id}`)
};

export default products;