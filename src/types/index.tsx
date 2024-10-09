// import React, { ReactNode } from "react";

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
    // [x: string]: any
    sign_in: (data: SignIn) => Promise<any>,
    sign_up: (data: SignUp) => Promise<any>

}

// ============ Globals ============
export interface ParamsType {
    limit: number,
    search: string,
    page: number,

}

export interface ModalProps {
    open: boolean,
    handleClose: () => void,
    update: any,
    onOk?:()=> void,
    getData?:()=>void,
    categories?:any

}

// ============ Create  ============
export interface CreateType {
    name: string,
}

// ============ Update ============
export interface UpdateType {
    id: number,
    data: any,
}
// ============ Delete ============
export interface DeleteType {
    id: number,
}

// ============Notification=============
export type NotificationType = 'success' | 'info' | 'warning' | 'error';


// ============Global Search=============
export interface SearchType {
    updateParams: (params: ParamsType) => void; 
    placeholder?: string;
}

// ============ Category ===========
export interface CategoryModal extends ModalProps {
    onOk: () => void,
    getData: () => void,
}

export interface CategoryType {
    create: (data: CreateType) => Promise<any>,
    get: (params?: ParamsType) => Promise<any>,
    update: (id: UpdateType["id"], data: UpdateType["data"]) => Promise<any>,
    delete: (id: number | undefined) => Promise<number>
}

export interface ConfirmType {
    onConfirm: (id: number) => void;
    onCancel: () => void,
    id: number,
    title: string
}

// export interface ModalPropstype {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     children: ReactNode;
//     sx?: React.CSSProperties
// }


// ============Sub Category=============
export interface SubCreate{
    name:string,
    parent_category_id?:number,
}


export interface SubCategoryType{
    create: (data:SubCreate) => Promise<any>,
    get: (parent_category_id:number) => Promise<any>,
    update: (id: UpdateType["id"], data: UpdateType["data"]) => Promise<any>,
    delete: (id: number | undefined) => Promise<number>
}

export interface TablePropsType{
columns:any,
data:any,
pagination:any,
handleChange:any,
}
