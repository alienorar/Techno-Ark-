
import { Modal, Form, Select, Button } from 'antd';
import { useState } from 'react';
import { ads } from '@service';
import { AdsCreate,  GlobalModalProps } from '@types';

const AdsModal = ({ open, onOk, handleClose, getData }:GlobalModalProps) => {
    const [form] = Form.useForm();
    const [file, setFile] = useState([]);
    const positions = [1, 2, 3]

    const handleChange = (e: any) => {
        let fileData = e.target.files[0]
        setFile(fileData);
    };
    const onFinish = async (values: AdsCreate) => {
        let formData: any = new FormData();
        formData.append("position", values?.position);
        formData.append("file", file);
        try {
            const res = await ads.create(formData);
            if (res.status = 201) {
                // notify(res.data.message)
                if (getData) {
                    getData()
                }
                handleClose()
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
                name="Ads_form"
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Position"
                    name="position"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}

                    rules={[
                        {
                            required: true,
                            message: 'Enter position!',
                        },
                    ]}
                >
                    <Select
                        className='h-10 border-[1.4px] rounded-lg'
                        showSearch
                        placeholder="Select Position"
                    >
                        {positions?.map((item: any, index: number) => (
                            <option value={item} key={index}>
                                {item}
                            </option>

                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="file"
                    label="File"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ marginBottom: '8px' }}
                    rules={[
                        { required: true, message: 'Upload file!' },
                    ]}>
                    <input type="file" onChange={handleChange} />
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

export default AdsModal;