import Videotron from "../components/VideoTron/Videotron";
import Dashboard from "../components/Dashboard";
import Ceo from "../components/Ceo";
import Package from "../components/Package/Package";
import VisionMission from "./VisionMission";
import RiskAssistance from "./RiskAssistance";
import OurTeam from "./OurTeam";
import Faq from "./Faq";
import EducationVideo from "./EducationVideo";
import CounterSection from "./CounterSection";
import ChartSection from "./ChartSection";
// import SpeedDials from "../components/SpeedDial/SpeedDial";
// import { Footer } from "../components";
import { useEffect } from "react";
import Aos from "aos";

export default function Landing() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Videotron />
      <Dashboard />
      <CounterSection />
      <Ceo />
      <VisionMission />
      <ChartSection />
      <Package />
      <RiskAssistance />
      <OurTeam />
      <Faq />
      <EducationVideo />
      {/* <Footer /> */}
    </>
  );
}
