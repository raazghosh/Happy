"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { BirthdayConfig } from "@/content/birthday";
import styles from "./LoveLetter.module.css";

interface Props {
  config: BirthdayConfig;
}

export default function LoveLetter({ config }: Props) {
  const [opened, setOpened] = useState(false);
  const { letter } = config;

  return (
    <section
      className={`section ${styles.section}`}
      id="love-letter"
      aria-label="Personal birthday letter"
    >
      <div className="container">
        <div className="section-title">
          <span className="script-accent">written for you</span>
          <h2>A Letter</h2>
        </div>

        <div className={styles.letterWrap}>
          {/* Envelope / unopened state */}
          {!opened && (
            <motion.div
              className={styles.envelope}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.envelopeBody} aria-hidden="true">
                <span className={styles.waxSeal}>♥</span>
              </div>
              <p className={styles.envelopeHint}>A letter just for you</p>
              <button
                className={`btn-primary ${styles.openBtn}`}
                onClick={() => setOpened(true)}
                id="open-letter-btn"
                aria-label="Open the birthday letter"
              >
                <BookOpen size={18} aria-hidden="true" />
                Open the letter
              </button>
            </motion.div>
          )}

          {/* Letter content */}
          {opened && (
            <motion.article
              className={styles.letter}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Birthday love letter"
            >
              {/* Paper texture */}
              <div className={styles.paperLines} aria-hidden="true" />

              <header className={styles.letterHeader}>
                <p className={styles.salutation}>{letter.salutation}</p>
              </header>

              <div className={styles.letterBody}>
                {letter.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className={styles.para}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              <footer className={styles.letterFooter}>
                <p className={styles.closing}>{letter.closing}</p>
                <p className={styles.signature}>{letter.signature}</p>
              </footer>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}
