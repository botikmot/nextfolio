"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="container py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold font-heading">
            {title}
          </h2>
          {subtitle && (
            <p className="text-neutral-600 dark:text-neutral-400 mt-2">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </motion.div>
    </section>
  );
}
