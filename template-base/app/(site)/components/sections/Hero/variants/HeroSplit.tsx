"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSplit() {
  return (
    <section className="container py-20 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold"
        >
          Hi, I’m Jane Doe
        </motion.h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Full Stack Developer
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-primary text-white rounded-lg shadow"
          >
            View My Work
          </a>
          <a
            href="/resume.pdf"
            className="px-6 py-3 border rounded-lg"
          >
            Download CV
          </a>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <Image
          src="/avatar.png"
          alt="Profile"
          width={300}
          height={300}
          className="rounded-full shadow-lg"
        />
      </motion.div>
    </section>
  );
}
