import { Form, Input, Button, Select, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import { products, brand, brandCategory } from '@service';
import { ProductCreate, ProductModalProps } from '@types';
const { Option } = Select;

const Index = ({ open, handleClose, update, getData, categories, }: ProductModalProps) => {
    const [form] = Form.useForm();
    const [filteredBrands, setFilteredBrands] = useState([])
    const [filteredBrandCat, setFilteredBrandCat] = useState([])
    const [file, setFile] = useState([]);
    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                name: update?.name,
                price: update?.price,
                category_id: update?.category_id,
                brand_id: update?.brand_id,
                brand_category_id: update?.brand_category_id,
                files: update?.files
            })
        }
        else {
            form.resetFields();
        }
    }, [update, form])


    const getBrand = async (id: number) => {
        try {
            const res: any = await brand.getBrandById(id)
            setFilteredBrands(res?.data?.data?.brands)
        } catch (error) {
            console.log("error");

        }

    }

    const getCategories = (evt: number) => {
        getBrand(evt)

    }
    const getBrandCat = async (id: number) => {
        try {
            const res: any = await brandCategory.getBrandCat(id)
            setFilteredBrandCat(res?.data?.data?.brandCategories)
        } catch (error) {

        }
    }

    const handleBrandChange = (evt: number) => {
        getBrandCat(evt)
    }

    const handleFileChange = (event: any) => {
        const fileData = event.target.files[0];
        setFile(fileData);
    };

    const onFinish = async (values: ProductCreate) => {
        let formData: any = new FormData();
        formData.append("name", values?.name);
        formData.append("price", values?.price);
        formData.append("category_id", values?.category_id);
        formData.append("brand_id", values?.brand_id);
        formData.append("brand_category_id", values?.brand_category_id);
        formData.append("files", file);
        try {
            if (update?.id) {
                const res: any = await products.update(update.id, formData);
                if (res.status === 200) {
                    handleClose()
                    if (getData) {
                        getData()
                    }
                }
            } else {
                const res: any = await products.create(formData);
                if (res.status === 201) {
                    handleClose()
                    if (getData) {
                        getData()
                    }

                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Drawer onClose={handleClose} open={open} width={600}>
                <h2 className='text-[24px] font-semibold my-3'>Add Product</h2>

                <Form
                    form={form}
                    name="brands_form"
                    style={{ display: "flex", flexDirection: "column", }}
                    onFinish={onFinish}

                >
                    <div className='flex gap-3 '>
                        <Form.Item
                            label="Product name"
                            name="name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product name!' },
                            ]}
                        >
                            <Input className='h-10 p-2 border-[1.4px]' />
                        </Form.Item>
                        <Form.Item
                            label="Product price"
                            name="price"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[
                                { required: true, message: 'Enter product price!' },
                            ]}
                        >
                            <Input className='h-10 p-2 border-[1.4px]' type='number' />
                        </Form.Item>
                    </div>
                    <div className='flex gap-3 mb-5'>
                        <Form.Item
                            name="category_id"
                            label=" Select Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 8, height: 40, width: "100%", border: "2px", borderColor: "gray" }}
                            rules={[
                                { required: true, message: 'Select category!' },
                            ]}


                        >
                            <Select
                                showSearch
                                className='border-[1.4px] rounded-lg h-10 '
                                onChange={(evt => getCategories(evt))}
                            >
                                {categories?.map((item, index) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="brand_id"
                            label="Select Brand"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: "40px", width: "100%" }}
                            rules={[
                                { required: true, message: 'Select Brand!' },
                            ]}
                        >
                            <Select
                                className='border-[1.4px] rounded-lg h-10 '
                                onChange={(value) => handleBrandChange(value)}
                            >
                                {filteredBrands?.map((item: any, index: number) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                    </div>
                    <div className='grid grid-cols-2 gap-3 mb-5 mt-4' >
                        <Form.Item
                            name="brand_category_id"
                            label="Select Brand  Category"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ height: 40, }}
                            rules={[
                                { required: true, message: 'Select Brand category!' },
                            ]}
                        >
                            <Select
                                className='border-[1.4px] rounded-lg h-10 '

                            >
                                {filteredBrandCat?.map((item: any, index: number) => (
                                    <Option value={item.id} key={index}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="file"
                            label="File"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            rules={[
                                { required: true, message: 'Upload file!' },
                            ]}>
                            <input type="file" height={80} onChange={handleFileChange} />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            block
                            htmlType="submit"
                            style={{
                                backgroundColor: "#e35112",
                                color: "white",
                                height: "40px",
                                fontSize: "18px",
                                marginTop: "10px",
                            }}
                        >
                            Add
                        </Button>
                    </Form.Item>
                </Form>

            </Drawer>
        </>
    );
};

export default Index;
