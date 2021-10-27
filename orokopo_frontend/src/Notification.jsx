import { notification, Alert } from "antd";

export function showNotification(message, type = "success", duration = 3) {
  notification.open({
    duration: duration,
    description: <Alert message={message} type={type} showIcon />,
  });
}
