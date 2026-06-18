import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { KnowledgeSources } from "../components/KnowledgeSources";
import { DeploymentChannels } from "../components/DeploymentChannels";
import { UseCases } from "../components/UseCases";
import { DashboardPreview } from "../components/DashboardPreview";
import { Pricing } from "../components/Pricing";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { FinalCTA } from "../components/FinalCTA";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";

export default function LandingPage() {
  return (
    <PageTransition>
      <Navbar />
      <main className="relative z-10 flex-1 flex flex-col">
        <Hero />
        <Features />
        <HowItWorks />
        <KnowledgeSources />
        <DeploymentChannels />
        <UseCases />
        <DashboardPreview />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </PageTransition>
  );
}
