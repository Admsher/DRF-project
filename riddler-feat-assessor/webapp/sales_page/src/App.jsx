import Header from "./Components/header/Header.jsx";
import Hero from "./Components/Body/HeroSection/Hero.jsx";
import Features from "./Components/Body/FeaturesArticle/Features.jsx";
import Options from "./Components/Body/Pricing/Options.jsx";
import WhyBiasZero from "./Components/Body/whyBias/WhyBiasZero.jsx";
import Footer from "./Components/Body/Footer/Footer.jsx";
import Contact from "./Components/Body/ContactPage/Contact.jsx";
import Loader from "./Components/Body/loader/Loader.jsx";
import About from "./Components/Body/About/About us.jsx";
export default function App() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Loader>
      <Header scrollToSection={scrollToSection} />
      <Hero />
      <Features />
      <About />
      <Options />
      <WhyBiasZero />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </Loader>
  );
}
