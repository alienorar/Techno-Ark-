import { useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ConfirmType } from '@types';

const PopconfirmDelete = ({ onConfirm, onCancel, id, title }: ConfirmType) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showDeleteModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
           if (id) {
               onConfirm(id);
           }
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        onCancel();
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="delete">
                <Button  onClick={showDeleteModal}>
                    <DeleteOutlined className='text-orange-500 text-[18px]' />
                </Button>
            </Tooltip>

            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okButtonProps={{
                    style: { backgroundColor: 'orangered', borderColor: 'orangered' },
                }}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this item?</p>
            </Modal>
        </>
    );
};

export default PopconfirmDelete;
