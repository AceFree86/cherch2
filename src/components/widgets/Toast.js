import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 500,
    progress: 0,
    theme: "light",
  });
};

export const showErrorToast = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
    progress: 0,
    theme: "light",
  });
};

export const showInfo = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 1000,
    progress: 0,
    theme: "light",
  });
};
