import { StockType } from "@types";
import https from "./config";
const stock:StockType = {
    create: (data) => https.post(`stock/create/`, data),
    get: (params) => https.get("/stock", { params }),
    update: (id, data) => https.patch(`/stock/update/${id}`, data),
    delete: (id) => https.delete(`/stock/delete/${id}`),
    getCategory: () => https.get("/category/search"),
    getProduct: () => https.get("/products/search")
};

export default stock;
