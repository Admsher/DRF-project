import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Screens/Root.jsx";
import SalePage from "./Screens/SalePage.jsx";
import ErrorPage from "./Screens/ErrorPage.jsx";
import PrivacyPage from "./Screens/PrivacyPage.jsx";
import TermsPage from "./Screens/TermsPage.jsx";
import Loader from "./Components/Body/Loader/Loader.jsx";
export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <SalePage />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPage />,
        },
        {
          path: "/terms-of-use",
          element: <TermsPage />,
        },
      ],
    },
  ]);
  return (
    <>
      {initialLoading ? (
        <Loader isLoading={true} />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}
