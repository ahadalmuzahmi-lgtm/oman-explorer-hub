import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Destinations from "@/components/sections/Destinations";
import Experiences from "@/components/sections/Experiences";
import Features from "@/components/sections/Features";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>GoOman - Discover the Magic of Oman | Tourism & Travel Platform</title>
        <meta
          name="description"
          content="Experience authentic Oman adventures. Book hotels, cultural tours, desert safaris & local experiences. Your gateway to the Sultanate's hidden treasures."
        />
        <meta
          name="keywords"
          content="Oman tourism, Oman travel, Muscat hotels, Oman tours, desert safari, cultural experiences, local guides"
        />
        <link rel="canonical" href="https://gooman.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Destinations />
          <Experiences />
          <Features />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
