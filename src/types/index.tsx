// ============ Auth ============

import React, { ReactNode } from "react";

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
    [x: string]: any
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

// ============ Category ============

export interface CategoryModal extends ModalProps {
    onOk: () => void,
    getData: () => void,
}

export interface CategoryType {
    create: (data: CreateType) => Promise<any>,
    get: (params: ParamsType) => Promise<any>,
    update: (id: UpdateType["id"], data: UpdateType["data"]) => Promise<any>,
    delete: (id: DeleteType) => Promise<number>
}

export interface ConfirmType {
    onConfirm: (id?: number, deleteData?: any) => void;
    onCancel: () => void,
    id: number,
    title: string
}

export interface ModalPropstype {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
    sx?: React.CSSProperties
}
