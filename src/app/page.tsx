import React from "react";
import Hero from "./_components/PortifilopCom/Hero";
import Work from "./_components/PortifilopCom/Work";
import About from "./_components/PortifilopCom/About";
import Blog from "./_components/PortifilopCom/Blog";
import Contact from "./_components/PortifilopCom/Contact";

export default function page() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Blog />
      <Contact />
    </>
  );
}
