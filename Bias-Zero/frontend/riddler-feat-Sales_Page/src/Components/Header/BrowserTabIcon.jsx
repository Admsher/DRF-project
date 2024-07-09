import { useEffect } from "react";
import BrowserIconLight from "../Body/assets/images/BrowserIcons/browser-tab-light.png";
import BrowserIconDark from "../Body/assets/images/BrowserIcons/browser-tab-dark.png";
const updateFavicon = (isDarkMode) => {
  const favicon = document.getElementById("favicon");
  if (favicon) {
    favicon.href = isDarkMode ? BrowserIconDark : BrowserIconLight;
  }
};
const checkSystemPreference = () => {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};
export default function BrowserTabIcon() {
  useEffect(() => {
    const systemPrefersDark = checkSystemPreference();
    updateFavicon(systemPrefersDark);
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => updateFavicon(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return null;
}
