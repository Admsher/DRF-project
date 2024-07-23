import { useState, useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { useDarkMode } from "../../../context/DarkModeContext";
export default function Loader({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    let isMounted = true;
    const loaderDuration = 2000;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, loaderDuration));
      } catch (error) {
        console.error("Page loading failed!", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

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
