import { useEffect, useState } from "react";
import { Button, Space } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalTable, GlobalSearch } from '@components';
import { Ads } from '@modals';
import { ads } from '@service';
import { ConfirmDelete } from '@confirmation';
import { ParamsType } from "@types";


const Index = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, setTotal] = useState();
  const navigate = useNavigate()
  const { search } = useLocation()
  // const notify = (message) => toast.success(message);
  const [params, setParams] = useState({
    search: "",
    limit: 2,
    page: 1
  })


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

  //  ============ Modal ===========
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    // setUpdate({})
  };

  // ============ get Data ============
  const getData = async () => {

    try {
      const res:any = await ads.get(params);
      if (res.status === 200) {
        setData(res?.data?.data);
        setTotal(res?.data?.data?.count)


      }
    } catch (error) {

    }
  };

  useEffect(() => {
    getData();
  }, [params]);


  // ======== delete Data ========= 
  const deleteData = async (id:number) => {
    const res:any = await ads.delete(id);
    if (res.status === 200) {
      getData();
      // notify(res.data.message);
    }
  };

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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      render: (date:string) => new Date(date).toLocaleDateString('en-GB').replace(/\//g, '.')
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any, record:any) => (
        <Space size="middle">
          <ConfirmDelete
            id={record.id}
            onConfirm={deleteData}
            onCancel={() => console.log('Cancelled')}
            title={"Delete this Ad?"}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
     
      <Ads
        open={isModalOpen}
        onOk={handleOk}
        handleClose={handleClose}
        getData={getData}
  
      />
      <div className="flex items-center justify-between py-4">
        <GlobalSearch updateParams={updateParams} placeholder={"Search Ads"} />
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
