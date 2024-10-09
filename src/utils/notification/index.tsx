import { notification } from 'antd';
import { NotificationType } from '@types';
export const openNotification = (type: NotificationType, message: string, description: string) => {
    notification[type]({
        message,
        description,
        placement: 'topRight',
        showProgress: true,
    });
};
