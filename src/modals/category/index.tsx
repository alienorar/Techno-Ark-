
import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';
import { CategoryModal, CategoryUpdate, } from '@types';
import { category } from '@service';

const CategoriesModal = ({ open, onOk, handleClose, update, getData }: CategoryModal) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update.name,
            })
        } else {
            form.resetFields()
        }
    })

    const onFinish = async (values:CategoryUpdate) => {
        try {
            if (update?.id) {
                const res = await category.update(update.id, values);
                if (res.status === 200) {
                    handleClose()
                    getData()
                }
            } else {
                const res = await category.create(values);
                if (res.status === 201) {
                    getData()
                    handleClose()
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
                    label="Category name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: 8, }}
                    // className='h-10'
                    rules={[
                        {
                            required: true,
                            message: 'Enter category name!',
                        },
                    ]}
                >
                    <Input className='h-10 border-[0.5px] ' />
                </Form.Item>

                <Form.Item>
                    <Button
                        block
                        htmlType="submit"
                        style={{
                            backgroundColor: "#e35112",
                            color: "white",
                            height: 40,
                            fontSize: "18px",
                            marginTop: 10,
                        }}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CategoriesModal;
