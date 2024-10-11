
import { Modal, Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { brandCategory } from '@service';
import { BrandCategoryCreate, BrandCategoryModal,} from '@types';
const { Option } = Select;

const Index = ({ open, onOk, handleClose, update, getData, parentBrand,}:BrandCategoryModal) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update?.name || "",
                brand_id: update?.brand_id,
            })
        } else {
            form.resetFields()
        }
    });

    const onFinish = async (values:BrandCategoryCreate) => {
        try {
            if (update?.id) {
                const res = await brandCategory.update(update.id, values);
                if (res.status === 200) {
                    handleClose()
                    if (getData) {
                      getData()  
                    }
                }
            } else {
                const res = await brandCategory.create(values);
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
            title="Add Brand Category"
            open={open}
            onOk={onOk}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="brand_category_form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label=" Brand category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom:8 }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter brand category name!',
                        },
                    ]}
                >
                    <Input className='h-10 p-3' />
                </Form.Item>

                <Form.Item
                    name="brand_id"
                    label="Parent brand"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter brand  name!',
                        },
                    ]}>
                    <Select
                        showSearch
                        placeholder="Select a Brand"
                    >
                        {parentBrand?.map((item:any, index:number) => (
                            <Option value={parseInt(item.id)} key={index}>
                                {item.name}
                            </Option>

                        ))}

                    </Select>
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

export default Index;