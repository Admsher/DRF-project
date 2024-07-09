import AboutMission from "../Components/Body/About/AboutUs";
import Contact from "../Components/Body/ContactPage/Contact";
import Features from "../Components/Body/FeaturesArticle/Features";
import Hero from "../Components/Body/HeroSection/Hero";
import Options2 from "../Components/Body/Pricing/Options2";
import WhyBiasZero from "../Components/Body/WhyBiasZero/WhyBiasZero";
import Footer from "../Components/Footer/Footer";
import BrowserTabIcon from "../Components/Header/BrowserTabIcon";
import Header from "../Components/Header/Header";

const SalePage = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <BrowserTabIcon />
      <Header scrollToSection={scrollToSection} />
      <Hero />
      <Features />
      <AboutMission />
      <Options2 />
      <WhyBiasZero />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </>
  );
};

export default SalePage;
