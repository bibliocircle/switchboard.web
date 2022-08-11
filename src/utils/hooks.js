import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createAlert } from "../store/slices/application";

export const useUrlHash = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.hash.replace("#", ""));
  return Object.fromEntries(params);
};

export const useAlerts = () => {
  const dispatch = useDispatch();

  const createAlertPayload = ({ message, duration, type }) => {
    return {
      message,
      autoHideDuration: duration || 5000,
      type,
    };
  };

  return {
    infoAlert(message, duration) {
      dispatch(
        createAlert(createAlertPayload({ message, duration, type: "info" }))
      );
    },
    errorAlert(message, duration) {
      dispatch(
        createAlert(createAlertPayload({ message, duration, type: "error" }))
      );
    },
    successAlert(message, duration) {
      dispatch(
        createAlert(createAlertPayload({ message, duration, type: "success" }))
      );
    },
    warningAlert(message, duration) {
      dispatch(
        createAlert(createAlertPayload({ message, duration, type: "warning" }))
      );
    },
  };
};
