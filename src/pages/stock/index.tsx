import { useEffect, useState } from "react";
import { Button,Space, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom'
import { GlobalTable, GlobalSearch } from '@components';
import { Stock } from '@modals'
import { stock } from '@service';
import { ConfirmDelete } from '@confirmation';
import { ParamsType, StockCreate } from "@types";
import { AnyObject } from "antd/es/_util/type";
// import { products } from "../../service";

const Index = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState();
  const [categories, setCategories] = useState([]);
  const { search } = useLocation()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  })

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

  // ============ get Data ============
  const getData = async () => {
    try {
      const res = await stock.get(params);
      if (res.status === 200) {
        setData(res?.data?.data?.stocks);
        setTotal(res?.data?.data?.count)


      }
    } catch (error) {
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  // =========== edit Data ===========
  const editData = (item:StockCreate) => {
    setUpdate(item);
    showModal()

  };


  // ======== delete Data ========= 
  const deleteData = async (id:number) => {
    const res:any = await stock.delete(id);
    if (res.status === 200) {
      getData();
    }
  };


  //========= get categories  ============
  const getCategories = async () => {
    try {
      const res = await stock.getCategory();
      const fetchedData = res?.data?.data?.categories;
      setCategories(fetchedData);

    } catch (error) {
      console.log(error);
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
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:AnyObject) => (
        <Space size="middle">
          <Tooltip title="edit"><Button onClick={() => editData(record)}><EditOutlined /></Button></Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Stock ?"}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Stock
        open={isModalOpen}
        onOk={handleOk}
        handleClose={handleClose}
        getData={getData}
        update={update}
        categories={categories}

      />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Stocks"} />
        <div className="flex gap-2 items-center ">
          <Button type="primary" size="large" style={{ maxWidth: 160, minWidth: 20, backgroundColor: "orangered" }} onClick={showModal} >
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
