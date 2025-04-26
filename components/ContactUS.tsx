"use client";

import type React from "react";

import { useState } from "react";
import {
  Building,
  Clock,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-black min-h-screen text-white py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-[1px] w-6 bg-primary"></div>
                <span className="text-xs uppercase tracking-widest text-primary">
                  Keep close
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Get In Touch</h1>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              quis commodo ligula quis dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim.
            </p>

            <div className="gap-7 grid grid-cols-2 pt-2">
              <div className="flex items-center gap-4">
                <div className="text-primary mt-1">
                  <Building className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Story Restaurant, 2, Tokyo</p>
                  <p className="text-white/70 text-sm">Building 123</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-primary mt-1">
                  <Phone className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">(+961) 01-234-567-890</p>
                  <p className="text-white/70 text-sm">(+961) 01-234-567-891</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-primary mt-1">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Reservation@story.com</p>
                  <p className="text-white/70 text-sm">Info@story.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-primary mt-1">
                  <Clock className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Open 08:00 am-10:00 pm</p>
                  <p className="text-white/70 text-sm">
                    Closed 10:00 pm-08:00 am
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-xs uppercase tracking-widest text-white/80 mb-4">
                Follow us
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white/70 hover:text-primary">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-primary">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/70 hover:text-primary">
                  <Dribbble className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Your Details</h2>
              <p className="text-white/70 text-sm mt-1">
                Let us know how to get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-5 w-full ">
              <div className="w-1/2">
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-white/80 mb-2">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border-none text-white rounded-none px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  placeholder="John"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="email" className="block text-xs uppercase tracking-wider text-white/80 mb-2">
                  Email Address <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border-none text-white rounded-none px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  placeholder="john@example.com"
                />
              </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs uppercase tracking-wider text-white/80 mb-2"
                >
                  Subject <span className="text-primary">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border-none text-white rounded-none px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wider text-white/80 mb-2"
                >
                  Comments / Questions <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-900 border-none text-white rounded-none px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary min-h-[120px] text-sm resize-none"
                  placeholder="Your message..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-primary hover:bg-amber-600 text-black font-medium px-8 py-2.5 uppercase text-sm tracking-wide"
                >
                  Contact Us
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
