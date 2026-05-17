"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NAVBAR_HEIGHT } from "@/lib/constants";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleLocationSearch = async () => {
    console.log(searchQuery);
  };

  return (
    <div
      id="top"
      className="relative min-h-screen"
      style={{
        marginTop: -NAVBAR_HEIGHT,
        scrollMarginTop: NAVBAR_HEIGHT,
      }}
    >
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 z-[1] bg-black/60" aria-hidden />
      {/* Feather into dark sections below (#primary-950 family) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-36 bg-gradient-to-b from-transparent via-black/70 to-primary-950 md:h-44"
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 z-10 w-full -translate-x-1/2 -translate-y-1/2 transform text-center"
      >
        <div className="max-w-4xl mx-auto px-16 sm:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Start your <span className="text-teal-500">journey</span> to finding the perfect place to call <span className="text-secondary-500">home</span>
          </h1>
          <p className="text-xl text-white mb-8">
            Explore our wide range of rental properties tailored to fit your
            lifestyle and needs!
          </p>

          <div className="flex justify-center">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, neighborhood or address"
              className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
            />
            <Button
              onClick={handleLocationSearch}
              className="bg-secondary-500 text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12"
            >
              Search
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;