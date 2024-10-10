import { Modal, Form, Input, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import { brand } from '@service';
import { BrandCreate, BrandModalProps,} from '@types';
const { Option } = Select;

const Index = ({ open, onOk, handleClose, update, getData, categories, }: BrandModalProps) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (update?.id) {
            form.setFieldsValue({
                name: update?.name,
                description: update?.description,
                categoryId: update?.category_id
            });
        } else {
            form.resetFields();
        }
    }, [update, form]);

    const [file, setFile] = useState([]);
    const handleChange = (e: any) => {
        let fileData = e.target.files[0]
        setFile(fileData);
    };


    const onFinish = async (value: any) => {
        const demo:BrandCreate = {
            name: value?.name,
            description: value?.description,
            categoryId: parseInt(value?.category_id)
        }

        let formData:any = new FormData();
        formData.append("name", value?.name);
        formData.append("categoryId", value?.category_id);
        formData.append("description", value?.description);
        formData.append("file", file);

        try {
            if (update?.id) {
                const res = await brand.update(update?.id, demo);
                if (res.status === 200) {
                    handleClose();
                    if (getData) {
                        getData()
                    }
                }
            } else {
                const res = await brand.create(formData);
                if (res.status === 201) {
                    handleClose();
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
            title="Add New Brand"
            open={open}
            onOk={onOk}
            onCancel={handleClose}
            footer={null}
          
        >
            <Form
                form={form}
                name="brands_form"
                style={{ display: "flex", flexDirection: "column" }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Brand name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        { required: true, message: 'Enter Brand name!' },
                    ]}
                >
                    <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        { required: true, message: 'Enter Description!' },
                    ]}
                >
                    <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

                <Form.Item
                    name="categoryId"
                    label="Category"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        { required: true, message: 'Enter Brand name!' },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Select a Category"
                    // filterOption={(input, option) =>
                    //     (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    // }
                    >
                        {categories?.map((item: any, index: number) => (
                            <Option value={parseInt(item.id)} key={index}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {
                    update?.id ? "" :
                        <Form.Item
                            name="file"
                            label="File"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: 8 }}
                            rules={[
                                { required: true, message: 'Upload file!' },
                            ]}>
                            <input type="file" onChange={handleChange} />
                        </Form.Item>
                }

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

export default Index;
