"use client";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="relative bg-black  text-white py-5 pt-24 px-6 text-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/img/background.jpg')] bg-cover bg-center opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-3xl md:text-4xl  text-[#f59e0b]">
          WE READY TO HAVE YOU <br />
          <span className="text-white ">THE BEST DINING EXPERIENCES</span>
        </h2>

        <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-center text-sm md:text-base text-gray-300">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#f59e0b]" />
            <span>Jendral Sudirman Street Pahoman, Bandar Lampung, 35222</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-[#f59e0b]" />
            <span>+0721 471 285</span>
          </div>
        </div>

        <Button className="bg-[#f59e0b] text-black hover:bg-yellow-500 font-semibold px-6 py-2 mt-4 rounded-lg shadow-md">
          RESERVE A TABLE
        </Button>

        <div className="flex gap-6 mt-6 text-white">
          <a href="#" aria-label="Instagram" className="hover:text-[#f59e0b] transition">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-[#f59e0b] transition">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-[#f59e0b] transition">
            <FaFacebookF />
          </a>
        </div>

        <div className="mt-4 text-sm text-gray-500">&copy; 2025 Dine Lux. All rights reserved.</div>
      </div>
    </footer>
  );
}
