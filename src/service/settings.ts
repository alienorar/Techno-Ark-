import { SettingsType } from "@types";
import https from "./config";
const settings:SettingsType = {
    get: (id) => https.get(`/admin/${id}`),
};

export default settings;
