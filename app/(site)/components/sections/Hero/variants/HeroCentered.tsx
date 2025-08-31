"use client";

import { motion } from "framer-motion";

export default function HeroCentered() {
  return (
    <section className="container py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold"
      >
        Hi, I’m Jane Doe
      </motion.h1>
      <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
        Full Stack Developer
      </p>
      <div className="mt-6 flex justify-center gap-4">
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
    </section>
  );
}
