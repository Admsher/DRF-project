import { PuffLoader } from "react-spinners";
import { useDarkMode } from "../../../context/DarkModeContext";
export default function Loader({ isLoading, children }) {
  const { isDarkMode } = useDarkMode();

  const isDarkModeClass = isDarkMode ? "bg-dark-mode-navy" : "bg-white";
  const loaderDarkModeClass = isDarkMode ? "white" : "#32B0F8";

  return (
    <>
      {isLoading ? (
        <div
          className={`grid place-items-center ${isDarkModeClass} h-dvh w-dvw`}
        >
          <PuffLoader color={`${loaderDarkModeClass}`} size={120} />
        </div>
      ) : (
        children
      )}
    </>
  );
}
