import {Alert} from "@mui/material";
import {removeNotification} from "../../../store/notificationReducer.ts";
import {useAppDispatch, useAppSelector} from "../../../store/hooks.ts";

const NotificationPopups = () => {
  const notificationsList = useAppSelector(state => state.app.notificationsList);
  const dispatch = useAppDispatch();

  const onClose = (uuid: string) => {
    dispatch(removeNotification({uuid: uuid}));
  };

  return (
    notificationsList.map((notification) => {
      return (
        <Alert onClose={() => onClose(notification.uuid)} severity={notification.level}>
          {notification.message}
        </Alert>
      );
    })
  );
};

export default NotificationPopups;