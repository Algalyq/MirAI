'use client'
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import Carousel from "./carousel";
import "./style.css"
export default function Landing() {
  return (
    <>
 <div className="z-10 w-full max-w-4xl px-5 xl:px-0 flex flex-col items-center justify-center">
  <h1
    className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
    style={{ animationDelay: "0.12s", animationFillMode: "forwards"}}
  >
    <Carousel/>
  </h1>
  <p
    className="mt-12 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl font-semibold Para"
    style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
  >
    <Balancer>Erteńgi kúnniń bolashaǵy
    </Balancer>
  </p>
</div>

    </>
  )
}