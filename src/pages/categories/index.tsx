import { useEffect, useState } from "react";
import { Button, Space, Tooltip } from 'antd';
import { EditOutlined, EnterOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable, GlobalSearch,} from '@components';
import { Category } from '@modals';
import { category } from '@service';
import { ParamsType } from "@types";
import { ConfirmDelete } from '@confirmation';
import { openNotification } from "@utils";


const Index = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const [total, setTotal] = useState();
  const navigate = useNavigate()
  const { search } = useLocation()
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  })

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
  const handleTableChange = (pagination: any) => {
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


  const updateParams = (newParams: ParamsType) => {
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
      const res = await category.get(params);
      if (res.status === 200) {
        setData(res?.data?.data?.categories);
        setTotal(res?.data?.data?.count)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [params]);

  // =========== edit Data ===========
  const editData = (item: any) => {
    setUpdate(item);
    showModal()

  };


  // ======== delete Data ========= 

  const deleteData = async (id: number | undefined) => {
    console.log(id)
    const res: any = await category.delete(id);
    if (res.status === 200) {
      getData();
      openNotification('success',"Success", res.data?.message,)
 
    }
  };

  // ========== single page ===========
  const handleView = (id: number | undefined) => {
    navigate(`/admin-panel/categories/${id}`);
  }


  // }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: "Name",
      dataIndex: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Tooltip title="edit"><Button onClick={() => editData(record)}><EditOutlined className="text-[18px]" /></Button></Tooltip>
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Brands ?"}
          />
          <Tooltip title="view">
            <Button onClick={() => handleView(record.id.toString())}><EnterOutlined className="text-[18px]" /></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Category
        open={isModalOpen}
        onOk={handleOk}
        handleClose={handleClose}
        getData={getData}
        update={update}

      />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Categories"} />
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
          pageSizeOptions: ['2', '3', '4', '6']
        }}
      />
    </>
  );
};


export default Index;
