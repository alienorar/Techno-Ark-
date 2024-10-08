import https from "./config"
import { AuthType } from "@types"
const auth:AuthType = {
    sign_up: (data) => https.post("/auth/admin/sign-up", data),
    sign_in: (data) => https.post("/auth/sign-in", data)
}
export default auth