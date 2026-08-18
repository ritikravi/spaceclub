import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import WhatWeDo from "@/components/home/WhatWeDo";
import Divisions from "@/components/home/DivisionsPreview";
import Programs from "@/components/home/ProgramsPreview";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Testimonials from "@/components/home/Testimonials";
import JoinCTA from "@/components/home/JoinCTA";
import FeaturedEventBanner from "@/components/FeaturedEventBanner";

export default function HomePage() {
  return (
    <>
      <FeaturedEventBanner />
      <Hero />
      <Stats />
      <WhatWeDo />
      <Divisions />
      <Programs />
      <UpcomingEvents />
      <Testimonials />
      <JoinCTA />
    </>
  );
}
