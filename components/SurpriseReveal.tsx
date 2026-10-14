"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { BirthdayConfig } from "@/content/birthday";
import styles from "./SurpriseReveal.module.css";

interface Props {
  config: BirthdayConfig;
}

export default function SurpriseReveal({ config }: Props) {
  const confettiRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    const launchConfetti = async () => {
      const canvasConfetti = (await import("canvas-confetti")).default;
      if (cancelled) return;

      const colors = ["#D96C91", "#D6B779", "#F8E7EC", "#581C32", "#ffffff"];

      const burst = () => {
        canvasConfetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.5, x: 0.5 },
          colors,
          scalar: 1.1,
          ticks: 180,
        });
      };

      burst();
      const t1 = setTimeout(burst, 400);
      const t2 = setTimeout(burst, 800);

      confettiRef.current = () => {
        clearTimeout(t1);
        clearTimeout(t2);
        canvasConfetti.reset();
      };
    };

    const timer = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? undefined
      : setTimeout(launchConfetti, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      confettiRef.current?.();
    };
  }, []);

  return (
    <section
      className={styles.reveal}
      aria-label="Birthday surprise reveal"
      id="surprise-reveal"
    >
      <div className={styles.bg} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={styles.card}
          aria-live="polite"
        >
          <motion.span
            className={styles.emoji}
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 0.6, delay: 0.5 }}
            aria-hidden="true"
          >
            🎂
          </motion.span>

          <Sparkles className={styles.sparkleIcon} aria-hidden="true" />

          <motion.h2
            className={styles.message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {config.surprise.revealMessage}
          </motion.h2>

          <motion.p
            className={styles.subMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {config.surprise.subMessage}
          </motion.p>

          <motion.div
            className={styles.scrollCue}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            aria-label="Scroll to continue"
          >
            <span className={styles.scrollText}>Scroll down to continue</span>
            <span className={styles.scrollArrow} aria-hidden="true">↓</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
