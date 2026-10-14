"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import type { BirthdayConfig } from "@/content/birthday";
import styles from "./BirthdayHero.module.css";

interface Props {
  config: BirthdayConfig;
  onReveal: () => void;
}

export default function BirthdayHero({ config, onReveal }: Props) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [floatingElements, setFloatingElements] = useState<
    Array<{ id: number; x: number; delay: number; size: number; type: string }>
  >([]);

  useEffect(() => {
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      size: 0.6 + Math.random() * 0.8,
      type: i % 3 === 0 ? "heart" : i % 3 === 1 ? "petal" : "sparkle",
    }));
    setFloatingElements(elements);
  }, []);

  const handleReveal = () => {
    setHasInteracted(true);
    setTimeout(onReveal, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleReveal();
    }
  };

  return (
    <AnimatePresence>
      {!hasInteracted && (
        <motion.section
          className={styles.hero}
          aria-label="Birthday welcome screen"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Animated background */}
          <div className={styles.bg} aria-hidden="true">
            <div className={styles.bgGradient} />
            <div className={styles.bgOrb1} />
            <div className={styles.bgOrb2} />
          </div>

          {/* Floating decorative elements */}
          <div className={styles.floatingContainer} aria-hidden="true">
            {floatingElements.map((el) => (
              <motion.span
                key={el.id}
                className={styles.floatingEl}
                style={{ left: `${el.x}%`, fontSize: `${el.size}rem` }}
                animate={{ y: ["100vh", "-10vh"] }}
                transition={{
                  duration: 8 + el.delay,
                  repeat: Infinity,
                  delay: el.delay,
                  ease: "linear",
                }}
              >
                {el.type === "heart" ? "♥" : el.type === "petal" ? "✿" : "✦"}
              </motion.span>
            ))}
          </div>

          {/* Content */}
          <div className={styles.content}>
            <motion.p
              className={styles.scriptAccent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              for my favourite person
            </motion.p>

            <motion.h1
              className={styles.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              {config.recipient.nickname}
            </motion.h1>

            <motion.p
              className={styles.tagline}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9 }}
            >
              {config.hero.tagline}
            </motion.p>

            <motion.div
              className={styles.heroImageWrapper}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <div className={styles.heroImageInner}>
                {imgError ? (
                  <div className={styles.heroImagePlaceholder} aria-label={config.hero.heroImageAlt}>
                    <span className={styles.placeholderIcon} aria-hidden="true">♥</span>
                    <span className={styles.placeholderText}>
                      Place her photo at<br />public/images/hero/hero.jpg
                    </span>
                  </div>
                ) : (
                  <Image
                    src={config.hero.heroImage}
                    alt={config.hero.heroImageAlt}
                    fill
                    priority
                    sizes="(max-width: 480px) 140px, 260px"
                    style={{ objectFit: "cover" }}
                    onError={() => setImgError(true)}
                  />
                )}
              </div>
              <div className={styles.imageGlow} aria-hidden="true" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <button
                className={`btn-primary ${styles.ctaBtn}`}
                onClick={handleReveal}
                onKeyDown={handleKeyDown}
                id="open-surprise-btn"
                aria-label={config.hero.ctaLabel}
              >
                <Sparkles size={18} aria-hidden="true" />
                {config.hero.ctaLabel}
                <Sparkles size={18} aria-hidden="true" />
              </button>
            </motion.div>

            <motion.div
              className={styles.scrollHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              aria-hidden="true"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
