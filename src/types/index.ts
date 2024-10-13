
import { AnyObject } from "antd/es/_util/type";
import { TablePaginationConfig, ColumnsType } from "antd/es/table";


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
    sign_in: (data: SignIn) => Promise<any>,
    sign_up: (data: SignUp) => Promise<any>

}

// ============ Globals ============
export interface ParamsType {
    limit: number,
    search: string,
    page: number,

}

export interface GlobalModalProps {
    open?: boolean,
    handleClose: () => void,
    onOk?: () => void,
    getData?: () => void,
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
export interface CategoryUpdate {
    name?: string,
    id?: number,
}
export interface CategoryModal extends CategoryModalProps {
    onOk: () => void,
    getData: () => void,
}

export interface CategoryType {
    create: (data: CategoryUpdate) => Promise<any>,
    get: (params?: ParamsType) => Promise<any>,
    update: (id: UpdateType["id"], data: UpdateType["data"]) => Promise<any>,
    delete: (id: number | undefined) => Promise<number>,
    getCategory: () => Promise<any>
}

export interface ConfirmType {
    onConfirm: (id: number) => void;
    onCancel: () => void,
    id: number | undefined,
    title: string
}

export interface CategoryModalProps extends GlobalModalProps {
    update?: CategoryUpdate,
    categories?: any[]

}

// ============Sub Category=============
export interface SubCreate {
    name?: string,
    parent_category_id?: number,
    id?: number
}

export interface SubModalprops extends GlobalModalProps {
    update: SubCreate,
    categories: any[]
}

export interface SubCategoryType {
    create: (data: SubCreate) => Promise<any>,
    get: (parent_category_id: number) => Promise<any>,
    update: (id: UpdateType["id"], data: UpdateType["data"]) => Promise<any>,
    delete: (id: number | undefined) => Promise<number>
}

export interface TablePropsType {
    columns: ColumnsType<AnyObject>,
    data: AnyObject[] | undefined,
    pagination: false | TablePaginationConfig | undefined,
    handleChange: (pagination: TablePaginationConfig) => void,
}


// ============ Brand=============
export interface BrandCreate {
    categoryId?: number,
    createdAt?: string,
    description?: string,
    id?: number,
    image?: any,
    lastUpdateAt?: string,
    name?: string
}

export interface BrandUpdate {
    category_id?: string,
    createdAt?: string,
    description?: string,
    id?: number,
    lastUpdateAt?: string,
    name?: string
}

export interface BrandType {
    create: (data: BrandCreate) => Promise<any>,
    get: (params: ParamsType) => Promise<any>,
    update: (id: number, data: BrandUpdate) => Promise<any>,
    delete: (id: number) => Promise<number>,
    getBrandById: (id: number) => Promise<number>
}

export interface BrandModalProps extends GlobalModalProps {
    update: BrandUpdate,
    categories?: any[],

}


// ============ Brand Categories=============
export interface BrandCategoryCreate {
    name?: string,
    brand_id?: number,
    id?: number,
}

export interface BrandCategoryType {
    create: (data: BrandCategoryCreate) => Promise<any>,
    get: (params: ParamsType) => Promise<any>,
    update: (id: number, data: BrandCategoryCreate) => Promise<any>,
    delete: (id: number) => Promise<number>,
    getBrandCat: (id: number) => Promise<number>,
    getBrands: () => Promise<any>
}


export interface BrandCategoryModal extends GlobalModalProps {
    update?: BrandCategoryCreate,
    parentBrand: AnyObject,
}

// ============ Stock =============
export interface StockCreate {
    category_id?: number,
    brand_id?: number,
    product_id?: number,
    quantity?: number,
    id?: number,

}

export interface StockType {
    create: (data: StockCreate) => Promise<any>,
    get: (params: ParamsType) => Promise<any>,
    update: (id: number, data: StockCreate) => Promise<any>,
    delete: (id: number) => Promise<number>,
    getCategory: () => Promise<any>,
    getProduct: () => Promise<any>,

}

export interface StockModalProps extends GlobalModalProps {
    update?: StockCreate,
    categories?: any,
    products?: any,

}



// =============Product =============
export interface ProductCreate {
    name?: string,
    price?: string,
    category_id?: string,
    brand_id?: string,
    brand_category_id?: string,
    files?: any,
    id?: number,


}
export interface ProductType {
    create: (data: ProductCreate) => Promise<any>,
    get: (params: ParamsType) => Promise<ParamsType>,
    update: (id: number, data: ProductCreate) => Promise<ProductCreate>,
    delete: (id: number) => Promise<number>,
    getById: (id: number) => Promise<number>,
    getByBrand: (id: number) => Promise<number>,

}

export interface ProductModalProps extends GlobalModalProps {
    update?: ProductCreate,
    categories?: any[]
}


// ============== Ads ============
export interface AdsCreate {
    position: number,
    file: any
}

export interface AdsType {
    create: (data: AdsCreate) => Promise<any>,
    get: (params: ParamsType) => Promise<ParamsType>,
    delete: (id: number) => Promise<number>,
}






// export interface ModalPropstype {
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//     children: ReactNode;
//     sx?: React.CSSProperties
// }




