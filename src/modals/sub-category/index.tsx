import { Modal, Form, Input, Button, Select } from 'antd';
import { useEffect } from 'react';
import { subCategory } from '@service';
import { SubModalprops } from '@types';
const { Option } = Select;

const Index = ({ open, onOk, handleClose, update, getData, categories, }:SubModalprops ) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update?.name || "",
                parent_category_id: update?.parent_category_id || null,

            })
        } else {
            form.resetFields()
        }
    });

    const onFinish = async (values: any) => {
        try {
            if (update?.id) {
                const res = await subCategory.update(update.id, values);
                if (res.status === 200) {
                    handleClose()
                    if (getData) {
                        getData()

                    }

                }

            } else {
                const res = await subCategory.create(values);
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
            title="Add New Category"
            open={open}
            onOk={onOk}
            onCancel={handleClose}
            footer={null}
        >
            <Form
                form={form}
                name="category_form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label=" Sub Category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8 }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter category name!',
                        },
                    ]}
                >  <Input className='h-10 border-[0.5px] px-3 ' />
                </Form.Item>

                <Form.Item
                    name="parent_category_id"
                    label="Parent Category"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        {
                            required: true,
                            message: 'Enter category name!',
                        },
                    ]}>
                    <Select
                        showSearch
                        placeholder="Select a Category"
                        className='h-10 border-[0.5px] rounded-lg '
                    >
                        {categories?.map((item: any, index: number) => (
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
