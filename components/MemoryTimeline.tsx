"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { BirthdayConfig } from "@/content/birthday";
import styles from "./MemoryTimeline.module.css";

interface Props {
  config: BirthdayConfig;
}

export default function MemoryTimeline({ config }: Props) {
  const { timeline } = config;

  return (
    <section
      className={`section ${styles.section}`}
      id="timeline"
      aria-label="Our story timeline"
    >
      <div className="container">
        <div className="section-title">
          <span className="script-accent">written in time</span>
          <h2>Our Story</h2>
        </div>

        {timeline.length === 0 ? (
          <p className={styles.empty}>
            Add your milestone moments to the <code>timeline</code> array in{" "}
            <code>content/birthday.ts</code>.
          </p>
        ) : (
          <div className={styles.timeline} role="list">
            {timeline.map((entry, i) => (
              <motion.article
                key={entry.id}
                className={`${styles.entry} ${i % 2 === 0 ? styles.entryLeft : styles.entryRight}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                role="listitem"
              >
                {/* Connector dot */}
                <div className={styles.dot} aria-hidden="true">
                  <span className={styles.dotInner} />
                </div>

                <div className={styles.card}>
                  {entry.imageSrc && (
                    <div className={styles.entryImageWrap}>
                      <Image
                        src={entry.imageSrc}
                        alt={entry.imageAlt ?? entry.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 400px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div className={styles.cardBody}>
                    <div className={styles.dateBadge}>
                      <Calendar size={12} aria-hidden="true" />
                      <time>{entry.date}</time>
                    </div>
                    <h3 className={styles.title}>{entry.title}</h3>
                    <p className={styles.description}>{entry.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Central line */}
            <div className={styles.line} aria-hidden="true" />
          </div>
        )}
      </div>
    </section>
  );
}
