import { Modal, Form, Input, Button, Select, } from 'antd';
import { useState, useEffect } from 'react';
import { brand, products, stock } from '@service';
import { StockCreate, StockModalProps } from '@types';

const Stock = ({ open, onOk, handleClose, getData, categories, update }: StockModalProps) => {
    const [form] = Form.useForm();
    const [filteredBrands, setFilteredBrands] = useState([])
    const [fetchedProducts, setFetchedProducts] = useState([]);
    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                category_id: update?.category_id,
                brand_id: update?.category_id,
                product_id: update?.category_id,
                quantity: Number(update?.quantity),
            });
        } else {
            form.resetFields();
        }
    }, [update, form]);

    // =========== Filter data ==========
    const getBrands = async (id: number) => {
        try {
            const res: any = await brand.getBrandById(id)
            setFilteredBrands(res?.data?.data?.brands)
        } catch (error) {

        }
    }
    const getProducts = async (id: number) => {
        try {
            const res: any = await products.getByBrand(id)
            setFetchedProducts(res?.data?.data)
            console.log(res?.data?.data);

        } catch (error) {
            console.log("error");

        }
    }

    const handleChange = async (evt: number) => {
        getBrands(evt)
    }
    const handleBrandChange = async (evt: number) => {
        getProducts(evt)
        console.log(evt);

    }

    const onFinish = async (values: StockCreate) => {
        values.quantity = Number(values.quantity)
        const dataSetter = {
            category_id: values?.category_id,
            brand_id: values?.brand_id,
            product_id: values?.product_id,
            quantity: Number(values?.quantity),
        }

        try {
            if (update?.id) {
                const res = await stock.update(update.id, dataSetter);
                if (res.status === 200) {
                    handleClose()
                    if (getData) {
                        getData()
                    }
                }
            } else {
                const res = await stock.create(dataSetter);
                if (res.status === 201) {
                    handleClose()
                    if (getData) {
                        getData()
                    }
                }
            }

        } catch (error) {

        }
    };

    return (
        <Modal
            title="Add New Stock"
            open={open}
            onOk={onOk}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="Ads_form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="category_id"
                    label=" Select Category"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px', }}
                    rules={[
                        { required: true, message: 'Select category!' },
                    ]}

                >
                    <Select
                        showSearch
                        className='h-10 border-[1.5px] rounded-lg'
                        onChange={(value) => handleChange(value)}

                    >
                        {categories?.map((item: any, index: number) => (
                            <option value={item.id} key={index}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="brand_id"
                    label="Select Brand"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px', }}
                    rules={[
                        { required: true, message: 'Select brand!' },
                    ]}
                >
                    <Select
                        className='h-10 border-[1.5px] rounded-lg'
                        onChange={(value) => handleBrandChange(value,)}
                    >
                        {filteredBrands?.map((item: any, index: number) => (
                            <option value={item.id} key={index}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="product_id"
                    label="Select Product"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px', }}
                    rules={[
                        { required: true, message: 'Select product!' },
                    ]}
                >
                    <Select
                        className='h-10 border-[1.5px] rounded-lg'
                    >
                        {fetchedProducts?.map((item: any, index: number) => (
                            <option value={item.id} key={index}>
                                {item.name}
                            </option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="quantity"
                    label="Quantity"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8, }}
                    rules={[
                        { required: true, message: 'Enter quantity!' },
                    ]}
                >
                    <Input className='h-10 border-[1.5px]' />
                </Form.Item>
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
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Stock;

