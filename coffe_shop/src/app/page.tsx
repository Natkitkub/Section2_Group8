'use client'
import Link from "next/link";
import Image from "next/image";
import shop from "../../public/images/HomePage/About.png"
import americano from "../../public/images/coffeemenu/americano.png"
import icaramelmac from "../../public/images/HomePage/icaramelmac.png"
import promotion from "../../public/images/HomePage/promotion.png"
import mtchlatte from "../../public/images/HomePage/mtchlatte.png"
import { useState, useEffect } from "react";
import LoadingScene from "./components/loadingScene";
import GoogleMap from "./components/GoogleMap";

export default function Home() {
  const popularItems = [
    {
      id: 1,
      title: "Americano",
      desc: "A bold and aromatic black coffee made from 100% premium beans. Smooth bitterness with a refreshing finish — perfect for those who love pure, classic coffee without milk.",
      image: americano
    },
    {
      id: 2,
      title: "Cappuccino",
      desc: "A rich espresso blended with fresh milk and light milk foam for a silky, balanced taste. The perfect harmony of coffee aroma and creamy texture for coffee lovers.",
      image: icaramelmac,
    },
    {
      id: 3,
      title: "Matcha Latte",
      desc: "Finely ground Japanese matcha mixed with creamy fresh milk, offering a gentle sweetness and smooth earthy flavor in every sip.",
      image: mtchlatte,
    },
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScene />;

  return (
    <>
      {/* ABOUT SECTION */}
      <div className="ml-10 mt-10 mr-10 max-w-8xl mx-auto px-20 py-20 rounded-lg" style={{ backgroundColor: "#fff2d8" }}>
        <div className="flex flex-col lg:flex-row items-center gap-10 ">
          <Image
            src={shop}
            alt="About Image"
            width={600}
            height={600}
            className="rounded-lg w-full lg:w-1/2 object-cover"
          />
          <div className="flex flex-col lg:w-1/2 text-justify">
            <h1 className="text-5xl font-bold">About</h1>
            <p className="mt-5 text-2xl">DUDE TEE NHEE — Where Every Cup Comes with a Story</p> <br />
            <p>
            Our café was born from a deep passion for coffee, blended with our love for technology as ICT students. 
              The idea began during countless late nights spent at cafés near our university, 
              where we noticed that many of our friends also relied on coffee as a source of motivation for studying and working. 
              That inspired us to create a small space that connects the flavor of coffee with the digital world.
            </p>
            <Link
              href="/contact"
              className="text-2xl underline underline-offset-4 hover:cursor-pointer hover:text-blue-600 transition"
            >
              👥 Meet Our Teams
            </Link>
          </div>
        </div>
      </div>

      {/* POPULAR SECTION */}
      <div className="ml-10 mt-10 mr-10 max-w-8xl mx-auto px-20 py-20 rounded-lg" style={{ backgroundColor: "#fff2d8" }}>
        <section className="max-w-8xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-8 text-black">Popular</h1>
          <div className="flex flex-col md:flex-row justify-between gap-10 ">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md flex-1 p-4 text-justify hover:shadow-5xl transition-transform transform hover:-translate-y-2 overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="rounded-lg w-full h-auto object-cover"
                />
                <div className="mt-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* PROMOTION SECTION */}
      <div className="ml-10 mt-10 mr-10 mb-10 max-w-8xl px-20 py-20 rounded-lg" style={{ backgroundColor: "#fff2d8" }}>
        <section className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-10 text-black">Promotion</h1>
          <Image
            alt="Promotion"
            src={promotion}
            className="object-cover rounded-lg"
          />
        </section>
      </div>

      <>
      {/* ส่วนอื่นๆ ของ Home */}
      <GoogleMap />
    </>
    </>
  );
}
