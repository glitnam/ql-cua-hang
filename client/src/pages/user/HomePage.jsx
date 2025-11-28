import React from "react";
import { Link } from "react-router-dom";
import banner from "../../assets/mau-banner-quang-cao-khuyen-mai.jpg";
export default function HomePage() {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Nshop</h1>
        <p className="text-lg md:text-2xl mb-6">
          Mang đến sự tiện nghi cho mọi nhà
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-white text-gray-900 rounded-full font-medium shadow hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
