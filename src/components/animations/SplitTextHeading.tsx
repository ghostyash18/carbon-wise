"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SplitTextHeadingProps {
  text: string;
  className?: string;
  delayOffset?: number;
}

export function SplitTextHeading({ text, className = "", delayOffset = 0 }: SplitTextHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  // If reduced motion is preferred, just render the text without splitting/animating individual letters
  if (shouldReduceMotion) {
    return (
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delayOffset }}
        className={className}
      >
        {text}
      </motion.h1>
    );
  }

  // Split text into words, then words into characters for more natural wrapping
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Stagger delay between each character
        delayChildren: delayOffset,
      },
    },
  };

  const charVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: "blur(4px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    },
  };

  return (
    <motion.h1
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={charVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
