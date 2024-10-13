import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable, GlobalSearch } from '@components';
import { Product} from '@modals'
import { category, products } from '@service';
import { ConfirmDelete } from '@confirmation';
import { AnyObject } from "antd/es/_util/type";
import { ParamsType} from "@types";


const Index = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState();
  const [categories, setCategories] = useState([]);
  const { search } = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  })

  // ============ Drawer ==========
  const showDrawer = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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

  const updateParams = (newParams:ParamsType) => {
    setParams((prev) => ({
      ...prev,
      ...newParams
    }));
  };

  // ============ Table ==============
  const handleTableChange = (pagination:AnyObject) => {
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

  // ============ get Data ============
  const getData = async () => {
    try {
      const res:any = await products.get(params);
      if (res.status === 200) {
        setData(res?.data?.data?.products);
        setTotal(res?.data?.data?.count)


      }
    } catch (error) {

    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  // =========== edit Data ===========
  const editData = (item:any) => {
    setUpdate(item);
    showDrawer()

  };

  // ======== delete Data ========= 
  const deleteData = async (id:number) => {
    const res:any = await products.delete(id);
    if (res.status === 200) {
      getData();
      // notify(res.data.message);
    }
  };

  const handleView = (record:any) => {
    navigate(`product-details/${record.id}`);
  };


  //========= get categories  ============
  const getCategories = async () => {
    try {
      const res = await category.get();
      const fetchedData = res?.data?.data?.categories;
      setCategories(fetchedData);
    } catch (error) {
    }
  };

  useEffect(() => {
    getCategories();
  }, [params]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Product name',
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
      render: (_:any, record:AnyObject) => (
        <Space size="middle">
          <Tooltip title="edit"> <Button onClick={() => editData(record)}><EditOutlined /></Button></Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Product ?"}
          />
          <Tooltip title="view">
            <Button onClick={() => handleView(record)}><EyeOutlined /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Product
        handleClose={handleClose}
        open={open}
        getData={getData}
        update={update}
        categories={categories}
      />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Products"} />
        <div className="flex gap-2 items-center ">
          <Button size="large" style={{ maxWidth: 160, minWidth: 80, backgroundColor: "orangered", color: "white", height: 40 }} onClick={showDrawer} >
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
