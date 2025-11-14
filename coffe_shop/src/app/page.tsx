"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import shop from "../../public/images/HomePage/About.png";
import americano from "../../public/images/coffeemenu/americano.png";
import icaramelmac from "../../public/images/HomePage/icaramelmac.png";
import promotion from "../../public/images/HomePage/promotion.png";
import mtchlatte from "../../public/images/HomePage/mtchlatte.png";

import LoadingScene from "./components/loadingScene";

type CoffeeQuoteType = {
  quote: string;
  author: string;
  coffeeName: string;
  coffeeImage: string;
};
const coffeeImageMap: any = {
  "Americano": americano,
  "Cappuccino": icaramelmac,
  "Matcha Latte": mtchlatte,
};


export default function Home() {
  const popularItems = [
    { id: 1, title: "Americano", desc: "A bold and aromatic black coffee made from 100% premium beans.", image: americano },
    { id: 2, title: "Cappuccino", desc: "A rich espresso blended with fresh milk and silky foam.", image: icaramelmac },
    { id: 3, title: "Matcha Latte", desc: "Japanese matcha mixed with creamy milk for a smooth earthy taste.", image: mtchlatte },
  ];

  // ========== STATE ==========
  const [loading, setLoading] = useState(true);
  const [coffeeQuote, setCoffeeQuote] = useState<CoffeeQuoteType | null>(null);
  const [showModal, setShowModal] = useState(false);

  // ========== LOADING SCREEN ==========
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // ========== DISABLE SCROLL WHEN MODAL OPEN ==========
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  // ========== FETCH COFFEE QUOTE ==========
  const fetchCoffeeQuote = async () => {
    try {
      const res = await fetch("http://localhost:5050/api/coffee-quote");
      const data = await res.json();
      setCoffeeQuote(data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch quote:", err);

      // ⭐ fallback เมื่อ API ล่ม
      setCoffeeQuote({
        quote: "Coffee is always a good idea.",
        author: "Anonymous",
        coffeeName: "Americano",
        coffeeImage: americano.src, // ⭐ ใช้ .src เพื่อไม่ error
      });

      setShowModal(true);
    }
  };

  if (loading) return <LoadingScene />;

  return (
    <main className="space-y-10">

      {/* ================== ABOUT SECTION ================== */}
      <section 
        aria-labelledby="about-title"
        className="ml-10 mt-10 mr-10 max-w-8xl mx-auto px-20 py-20 rounded-lg bg-[#fff2d8]"
      >
        <div className="flex flex-col lg:flex-row items-center gap-10">
          
          <figure className="lg:w-1/2 w-full">
            <Image
              src={shop}
              alt="Coffee shop interior"
              width={800}
              height={800}
              className="rounded-lg object-cover"
            />
          </figure>

          <article className="flex flex-col lg:w-1/2 text-justify">
            <header>
              <h1 id="about-title" className="text-5xl font-bold">About</h1>
              <p className="mt-5 text-2xl">
                DUDE TEE NHEE — Where Every Cup Comes with a Story
              </p>
            </header>

            Our café was born from a deep passion for coffee, blended with our love for technology as ICT students. 
              The idea began during countless late nights spent at cafés near our university, 
              where we noticed that many of our friends also relied on coffee as a source of motivation for studying and working. 
              That inspired us to create a small space that connects the flavor of coffee with the digital world.

            <Link
              href="/contact"
              className="text-2xl underline underline-offset-4 hover:text-blue-600 transition mt-4"
            >
              👥 Meet Our Teams
            </Link>
          </article>

        </div>
      </section>


      {/* ================== POPULAR SECTION ================== */}
      <section 
        aria-labelledby="popular-title"
        className="ml-10 mr-10 max-w-8xl mx-auto px-20 py-20 rounded-lg bg-[#fff2d8]"
      >
        <h1 id="popular-title" className="text-5xl font-extrabold mb-8 text-black">
          Popular
        </h1>

        <div className="flex flex-col md:flex-row justify-between gap-10">
          {popularItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-md flex-1 p-4 text-justify hover:shadow-5xl transition-transform transform hover:-translate-y-2 cursor-pointer"
            >
              <figure>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="rounded-lg w-full h-auto object-cover"
                />
                <figcaption className="mt-4">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                </figcaption>
              </figure>
            </article>
          ))}
        </div>
      </section>


      {/* ================== PROMOTION SECTION ================== */}
      <section 
        aria-labelledby="promotion-title"
        className="ml-10 mr-10 mb-10 max-w-8xl mx-auto px-20 py-20 rounded-lg bg-[#fff2d8]"
      >
        <h1 id="promotion-title" className="text-5xl font-extrabold mb-10 text-black">
          Promotion
        </h1>

        <figure>
          <Image
            alt="Promotion Banner"
            src={promotion}
            className="object-cover rounded-lg"
          />
        </figure>
      </section>


      {/* ================== COFFEE QUOTE BUTTON ================== */}
      <section className="ml-10 mr-10 mb-10 max-w-8xl mx-auto px-20 py-20 rounded-lg bg-yellow-100">
        <h1 className="text-4xl font-bold mb-5">☕ Coffee Quote</h1>

        <button
          onClick={fetchCoffeeQuote}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          ✨ Get Your Coffee Quote
        </button>
      </section>

      {/* ================== MODAL ================== */}
      {showModal && coffeeQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>

          {/* modal */}
          <div className="relative bg-white rounded-lg p-8 shadow-xl max-w-lg w-full z-10">
            <button
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <p className="text-2xl mb-2 text-center">"{coffeeQuote.quote}"</p>
            <p className="text-xl mb-4 font-light text-center">— {coffeeQuote.author}</p>

            <h2 className="text-3xl font-semibold mb-4 text-center">
              Recommended Coffee: {coffeeQuote.coffeeName}
            </h2>

            <Image
              src={coffeeQuote.coffeeImage}
              alt={coffeeQuote.coffeeName}
              width={300}
              height={300}
              className="rounded-lg mx-auto"
            />
          </div>
        </div>
      )}

    </main>
  );
}
