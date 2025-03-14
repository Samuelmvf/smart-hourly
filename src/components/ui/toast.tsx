import { ExternalToast, toast as sonnerToast } from "sonner";

const colorMap = {
  success: "#22c55e",
  error: "#dc2626",
  warning: "#eab308",
};

export const toast = {
  success: function (message: string, options?: ExternalToast) {
    sonnerToast.success(message, {
      style: {
        backgroundColor: colorMap.success,
      },
      ...options,
    });
  },
  error: function (message: string, options?: ExternalToast) {
    sonnerToast.error(message, {
      style: {
        backgroundColor: colorMap.error,
      },
      ...options,
    });
  },
  warning: function (message: string, options?: ExternalToast) {
    sonnerToast.warning(message, {
      style: {
        backgroundColor: colorMap.warning,
      },
      ...options,
    });
  },
};
