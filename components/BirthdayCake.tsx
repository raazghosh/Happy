"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Heart } from "lucide-react";
import type { BirthdayConfig } from "@/content/birthday";
import styles from "./BirthdayCake.module.css";

interface Props {
  config: BirthdayConfig;
  onRestart: () => void;
}

function CakeIllustration() {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.cakeSvg}
      aria-hidden="true"
      role="img"
    >
      {/* Plate */}
      <ellipse cx="100" cy="200" rx="85" ry="12" fill="#D6B779" opacity="0.3" />
      {/* Bottom tier */}
      <rect x="20" y="140" width="160" height="55" rx="8" fill="#D96C91" />
      <rect x="20" y="138" width="160" height="12" rx="6" fill="#F8E7EC" />
      {/* Middle tier */}
      <rect x="38" y="95" width="124" height="50" rx="8" fill="#F8E7EC" />
      <rect x="38" y="93" width="124" height="12" rx="6" fill="#D96C91" opacity="0.7"/>
      {/* Top tier */}
      <rect x="58" y="60" width="84" height="40" rx="8" fill="#FFF8F0" />
      <rect x="58" y="58" width="84" height="10" rx="5" fill="#D6B779" opacity="0.8"/>
      {/* Frosting drips */}
      <path d="M60 60 Q65 72 70 60 Q75 72 80 60 Q85 72 90 60 Q95 72 100 60 Q105 72 110 60 Q115 72 120 60 Q125 72 130 60 Q135 72 140 60" stroke="#F8E7EC" strokeWidth="4" fill="none" strokeLinecap="round"/>
      {/* Candles */}
      <rect x="83" y="28" width="8" height="32" rx="4" fill="#581C32" />
      <rect x="109" y="35" width="8" height="25" rx="4" fill="#D6B779" />
      {/* Flames */}
      <ellipse cx="87" cy="24" rx="5" ry="8" fill="#FFD700" opacity="0.9">
        <animate attributeName="ry" values="8;10;8" dur="0.8s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="24;22;24" dur="0.8s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="87" cy="24" rx="3" ry="5" fill="#FFA500">
        <animate attributeName="ry" values="5;7;5" dur="0.8s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="24;22;24" dur="0.8s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="113" cy="31" rx="5" ry="8" fill="#FFD700" opacity="0.9">
        <animate attributeName="ry" values="8;10;8" dur="1.1s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="31;29;31" dur="1.1s" repeatCount="indefinite"/>
      </ellipse>
      <ellipse cx="113" cy="31" rx="3" ry="5" fill="#FFA500">
        <animate attributeName="ry" values="5;7;5" dur="1.1s" repeatCount="indefinite"/>
        <animate attributeName="cy" values="31;29;31" dur="1.1s" repeatCount="indefinite"/>
      </ellipse>
      {/* Decorative hearts */}
      <text x="42" y="175" fontSize="14" fill="rgba(255,248,240,0.8)">♥</text>
      <text x="140" y="175" fontSize="14" fill="rgba(255,248,240,0.8)">♥</text>
      <text x="50" y="125" fontSize="10" fill="rgba(88,28,50,0.4)">✦</text>
      <text x="138" y="125" fontSize="10" fill="rgba(88,28,50,0.4)">✦</text>
    </svg>
  );
}

export default function BirthdayCake({ config, onRestart }: Props) {
  const confettiRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const launch = async () => {
      const confetti = (await import("canvas-confetti")).default;
      if (cancelled) return;

      const colors = ["#D96C91", "#D6B779", "#F8E7EC", "#581C32", "#ffffff", "#FFD700"];

      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        confetti({
          particleCount: 25,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors,
          scalar: 0.9,
        });
        confetti({
          particleCount: 25,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors,
          scalar: 0.9,
        });
      }, 2000);

      confettiRef.current = () => {
        clearInterval(interval);
        confetti.reset();
      };
    };

    const timer = setTimeout(launch, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
      confettiRef.current?.();
    };
  }, []);

  return (
    <section
      className={`section ${styles.section}`}
      id="birthday-cake"
      aria-label="Birthday finale"
    >
      <div className={styles.bg} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cake */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <CakeIllustration />
          </motion.div>

          {/* Wish */}
          <motion.h2
            className={styles.wish}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {config.finalMessage.wish}
          </motion.h2>

          {/* Final message */}
          <motion.p
            className={styles.message}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {config.finalMessage.message}
          </motion.p>

          {/* Closing hearts */}
          <motion.div
            className={styles.hearts}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Heart className={styles.heartLg} />
            <Heart className={styles.heartSm} />
            <Heart className={styles.heartLg} />
          </motion.div>

          {/* Sender */}
          <motion.p
            className={styles.senderLine}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            With all my love, <span className={styles.senderName}>{config.sender.name}</span>
          </motion.p>

          {/* Restart */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <button
              className={`btn-ghost ${styles.restartBtn}`}
              onClick={onRestart}
              id="restart-btn"
              aria-label="Go back to the beginning"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Start again
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
