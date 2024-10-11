import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import { GlobalTable, GlobalSearch } from '@components';
import { BrandCategory} from '@modals'
import { brandCategory } from '@service';
import { ConfirmDelete } from '@confirmation';
import { BrandCategoryCreate, ParamsType } from "@types";

const Index = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [update, setUpdate] = useState({});
    const [total, setTotal] = useState();
    const [parentBrand, setParentbrand] = useState([]);
    const { search } = useLocation()
    const navigate = useNavigate()
    const [params, setParams] = useState({
        search: "",
        limit: 2,
        page: 1
    })

    //========= get from query =========

    useEffect(() => {
        const params = new URLSearchParams(search)
        let page = Number(params.get("page")) || 1;
        let limit = Number(params.get("limit")) || 2;
        let search_value = params.get("search") || "";
        setParams((prev) => ({
            ...prev,
            limit: limit,
            page: page,
            search: search_value,
        }))
    }, [search])


    // ============ Table ==============
    const handleTableChange = (pagination:any) => {
        const { current, pageSize } = pagination
        setParams((prev) => ({
            ...prev,
            limit: pageSize,
            page: current,
        })
        )
        const searchParams = new URLSearchParams(search)
        searchParams.set("page", `${current}`)
        searchParams.set('limit', `${pageSize}`)
        navigate(`?${searchParams}`)
    }

    const updateParams = (newParams:ParamsType) => {
        setParams((prev) => ({
            ...prev,
            ...newParams
        }));
    };

    //  ============ Modal ===========
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleClose = () => {
        setIsModalOpen(false);
        setUpdate({})
    };

    // ============ get Data ============
    const getData = async () => {
        try {
            const res = await brandCategory.get(params);
            if (res.status === 200) {
                setData(res?.data?.data?.brandCategories);
                setTotal(res?.data?.data?.count)

            }
        } catch (error) { }
    };

    useEffect(() => {
        getData();
    }, [params]);

    // =========== edit Data ===========
    const editData = (item:any) => {
        setUpdate(item);
        showModal()


    };


    // ======== delete Data ========= 
    const deleteData = async (id:number) => {
        const res:any = await brandCategory.delete(id);
        if (res.status === 200) {
            getData();
        }
    };


    //========= get categories ============
    const getBrands = async () => {
        try {
            const res = await brandCategory.getBrands();
            const fetchedCategories = res?.data?.data?.brands;
            setParentbrand(fetchedCategories);


        } catch (error) {

        }
    };

    useEffect(() => {
        getBrands();
    }, [params]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Brand category name',
            dataIndex: 'name',
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (date:string) => new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')
        },
        {
            title: 'Action',
            key: 'action',
            render: (_:any, record:BrandCategoryCreate) => (
                <Space size="middle">
                    <Tooltip title="edit"><Button onClick={() => editData(record)}><EditOutlined /></Button></Tooltip>
                    <ConfirmDelete
                        id={record.id}
                        onConfirm={deleteData}
                        onCancel={() => console.log('Cancelled')}
                        title={"Delete this Brands ?"}
                    />
                </Space>
            ),
        },
    ];

    return (
        <>
            <BrandCategory
                open={isModalOpen}
                onOk={handleOk}
                handleClose={handleClose}
                getData={getData}
                update={update}
                parentBrand={parentBrand}
        
            />
            <div className="flex items-center justify-between py-4">
                <GlobalSearch updateParams={updateParams} placeholder={"Search Brand Categories"} />
                <div className="flex gap-2 items-center ">
                    <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 80, backgroundColor: "orangered", color: "white", height: 40 }} onClick={showModal}>
                        Create
                    </Button>

                </div>
            </div>
            <GlobalTable
                data={data}
                columns={columns}
                handleChange={handleTableChange}
                pagination={{
                    current: params.page,
                    pageSize: params.limit,
                    total: total,
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '3', '4', '6',]
                }}
            />
        </>
    );
};

export default Index;