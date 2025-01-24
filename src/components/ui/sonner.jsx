import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import { AiOutlineWarning, AiOutlineCloseCircle } from "react-icons/ai";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: `
            group toast group-[.toaster]:rounded-lg group-[.toaster]:shadow-lg
            group-[.toaster]:px-4 group-[.toaster]:py-3
            group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900
            border group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-900
            dark:group-[.toaster]:text-red-50 dark:group-[.toaster]:border-red-700
          `,
          description: `
            group-[.toast]:text-red-700 dark:group-[.toast]:text-red-300
            mt-2 text-sm
          `,
          actionButton: `
            group-[.toast]:bg-red-700 group-[.toast]:text-white
            rounded-md px-3 py-1 hover:bg-red-600
            dark:group-[.toast]:bg-red-500 dark:group-[.toast]:hover:bg-red-400
          `,
          cancelButton: `
            group-[.toast]:bg-red-100 group-[.toast]:text-red-500
            rounded-md px-3 py-1 hover:bg-red-200
            dark:group-[.toast]:bg-red-800 dark:group-[.toast]:text-red-300
            dark:group-[.toast]:hover:bg-red-700
          `,
        },
        icon: <AiOutlineWarning className="text-red-500 dark:text-red-300 text-2xl" />,
        closeButton: <AiOutlineCloseCircle className="text-red-500 dark:text-red-300 text-2xl" />,
      }}
      {...props}
    />
  );
};

export { Toaster };