import { useDarkMode } from "../../../context/DarkModeContext";
export default function AboutTitle() {
  const { isDarkMode } = useDarkMode();
  return (
    <h2
      className={`md:py-10 py-6 rounded-b-[40px] font-bold  md:text-[34px] ultra-small:text-[26px] medium-large:text-[44px] text-center text-off-white ${
        isDarkMode ? "bg-dark-mode-mint" : "bg-second-blue"
      }`}
    >
      About Us
    </h2>
  );
}
