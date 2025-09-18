import Ready from "../components/ready";
import Features from "../components/features";
import Hero from "../components/hero";
import Navbar from "../components/navbar";
import Image from "next/image";

export default function Home() {
  return (
  <div className="w-full h-full flex flex-col ">  
    <main className="min-h-screen bg-[#0B0B0F] text-white flex flex-col"> 
      <Hero/>
    </main>  
        <Features/>
        <Ready/>
    </div>
  );
}
