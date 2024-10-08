// ============ Auth ============

interface SignIn {
    phone_number: string,
    password: string,
}
interface SignUp extends SignIn {
    first_name: string,
    last_name: string,
    email: string,
}

export interface AuthType {
sign_in:(data:SignIn)=> Promise<any>,
sign_up:(data:SignUp)=> Promise<any>

}
