import Swal from "sweetalert2";

export const showAlert = {
  success: (message: string, title = "Success") =>
    Swal.fire({
      icon: "success",
      title,
      text: message,
    }),

  error: (message: string, title = "Oops!") =>
    Swal.fire({
      icon: "error",
      title,
      text: message,
    }),

  warning: (message: string, title = "Warning") =>
    Swal.fire({
      icon: "warning",
      title,
      text: message,
    }),

  info: (message: string, title = "Info") =>
    Swal.fire({
      icon: "info",
      title,
      text: message,
    }),
};
