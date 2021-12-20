import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import React from "react";
export const toastError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastSucces = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastLoading = (message, delaytime) => {
  var mess = "Vui lòng đợi ...";
  if (message !== undefined) mess = message;

  const id = toast.loading(mess);

  var delayInMilliseconds = 4000;
  if (delaytime !== undefined) delayInMilliseconds = delaytime;

  setTimeout(function () {
    toast.dismiss(id);
  }, delayInMilliseconds);
  return id;
};
