import { createContext, useState, useContext } from "react";
import MySnakeBar from "../components/MySnakeBar";

type ToastProp = {
  showHideToast: (message: string) => void;
};

const ToastContext = createContext<ToastProp>({
  showHideToast: () => {},
});

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showHideToast = (message: string) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnakeBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};
