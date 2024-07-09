import AboutTitle from "./AboutTitle";
import AboutLaptop from "./AboutLaptop";
import AboutMission from "./AboutMission";
import AboutVision from "./AboutVision";
import AboutResume from "./AboutResume";
import AboutRevolution from "./AboutRevolution";
import { useDarkMode } from "../../../context/DarkModeContext";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function AboutUs() {
  const { isDarkMode } = useDarkMode();
  return (
    <article
      className={`about-us ${
        isDarkMode ? "bg-dark-mode-navy" : "bg-off-white"
      }`}
      id='aboutUs'
    >
      <div className='wrapper-l'>
        <AboutTitle />
      </div>
      <Swiper
        slidesPerView={1}
        loop={true}
        pagination={{
          clickable: true,
        }}
        wrapperClass='md:py-[60px] py-[20px]'
        grabCursor={true}
        speed={2000}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        <SwiperSlide>
          <AboutRevolution />
        </SwiperSlide>
        <SwiperSlide>
          <AboutLaptop />
        </SwiperSlide>
        <SwiperSlide>
          <AboutMission />
        </SwiperSlide>
        <SwiperSlide>
          <AboutVision />
        </SwiperSlide>
        <SwiperSlide>
          <AboutResume />
        </SwiperSlide>
        <div
          className={`swiper-button-next after:font-bold ${
            isDarkMode ? "after:text-dark-mode-mint" : "after:text-second-blue"
          }`}
        ></div>
        <div
          className={`swiper-button-prev after:font-bold ${
            isDarkMode ? "after:text-dark-mode-mint" : "after:text-second-blue"
          }`}
        ></div>
      </Swiper>
    </article>
  );
}
