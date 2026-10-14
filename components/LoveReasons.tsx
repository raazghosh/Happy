"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import type { BirthdayConfig, LoveReason } from "@/content/birthday";
import styles from "./LoveReasons.module.css";

interface Props {
  config: BirthdayConfig;
}

function ReasonCard({ reason, index }: { reason: LoveReason; index: number }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((f) => !f);
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
    >
      <div
        className={`${styles.card} ${flipped ? styles.cardFlipped : ""}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? `Reason revealed: ${reason.back}` : `Reveal reason: ${reason.front}`}
        onClick={toggle}
        onKeyDown={handleKey}
        id={`love-reason-${reason.id}`}
      >
        {/* Front */}
        <div className={styles.face} aria-hidden={flipped}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Heart className={styles.heartIcon} aria-hidden="true" />
          <p className={styles.frontText}>{reason.front}</p>
          <span className={styles.hint}>Tap to reveal</span>
        </div>

        {/* Back */}
        <div className={`${styles.face} ${styles.faceBack}`} aria-hidden={!flipped}>
          <Heart className={`${styles.heartIcon} ${styles.heartIconBack}`} aria-hidden="true" />
          <p className={styles.backText}>{reason.back}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function LoveReasons({ config }: Props) {
  return (
    <section
      className={`section ${styles.section}`}
      id="love-reasons"
      aria-label="Reasons I love you"
    >
      <div className="container">
        <div className="section-title">
          <span className="script-accent">from my heart</span>
          <h2>Why I Love You</h2>
          <p className={styles.subtitle}>
            Each card holds a reason. Tap to reveal.
          </p>
        </div>

        <div className={styles.grid} role="list">
          {config.loveReasons.map((reason, i) => (
            <div key={reason.id} role="listitem">
              <ReasonCard reason={reason} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
