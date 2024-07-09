import Animation from "./Animation";
import { useDarkMode } from "./../../../context/DarkModeContext";
export default function Features() {
  const { isDarkMode } = useDarkMode();
  return (
    <section
      id='features'
      className={`features ${
        isDarkMode
          ? "bg-dark-mode-navy"
          : "bg-gradient-to-r from-main-blue to-white"
      } `}
    >
      <div className='features__content relative'>
        <Animation />
      </div>
    </section>
  );
}
