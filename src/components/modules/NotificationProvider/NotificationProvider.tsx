import {Alert} from "@mui/material";
import {removeNotification} from "../../../store/notificationReducer.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";
import sx from "./NotificationProvider.module.css";

const NotificationProvider = () => {
  const notificationsList = useAppSelector(state => state.app.notificationsList);
  const dispatch = useAppDispatch();

  const onClose = (uuid: string) => {
    dispatch(removeNotification({uuid: uuid}));
  };

  return (
    <div className={sx.notificationBlock}>
      {
        notificationsList.map((notification) => (
          <Alert
            onClose={() => onClose(notification.uuid)}
            severity={notification.level}
          >
            {notification.message}
          </Alert>
        ))
      }
    </div>
  );
};

export default NotificationProvider;