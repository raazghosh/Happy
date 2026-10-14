"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { BirthdayConfig } from "@/content/birthday";
import styles from "./Countdown.module.css";

interface Props {
  config: BirthdayConfig;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isBirthday: boolean;
}

function getTimeLeft(birthdayDate: string, timezone: string): TimeLeft {
  const now = new Date();
  const [year, month, day] = birthdayDate.split("-").map(Number);

  // Create birthday start and end in the target timezone using Intl
  const todayStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

  const todayParts = todayStr.split("-").map(Number);
  const isBirthday =
    todayParts[0] === year && todayParts[1] === month && todayParts[2] === day;

  if (isBirthday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
  }

  // Build target date at midnight in that timezone
  // We approximate by computing UTC offset for the target timezone
  const birthdayMidnightLocal = new Date(
    `${birthdayDate}T00:00:00`
  );
  // Get timezone offset difference
  const targetFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Use a different approach: compute diff to start of birthday in IST
  // We create the birthday as a date string interpreted in UTC+5:30
  const istOffsetMs = 5.5 * 60 * 60 * 1000;
  const birthdayStartUTC = new Date(
    Date.UTC(year, month - 1, day, 0, 0, 0) - istOffsetMs
  );

  const diff = birthdayStartUTC.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isBirthday: false };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className={styles.unit}>
      <motion.div
        key={value}
        className={styles.number}
        initial={{ rotateX: -30, opacity: 0.5 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {pad(value)}
      </motion.div>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default function Countdown({ config }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      setTimeLeft(getTimeLeft(config.birthday.date, config.birthday.timezone));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [config.birthday.date, config.birthday.timezone]);

  if (timeLeft === null) return null;

  return (
    <section className={`section ${styles.section}`} id="countdown" aria-label="Birthday countdown">
      <div className="container">
        <div className="section-title">
          <span className="script-accent" aria-hidden="true">counting down to</span>
          <h2>
            {timeLeft.isBirthday
              ? `Happy Birthday, ${config.recipient.nickname}!`
              : "Shiuri's Special Day"}
          </h2>
        </div>

        {timeLeft.isBirthday ? (
          <motion.div
            className={styles.birthdayMessage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            role="status"
            aria-live="polite"
          >
            <span className={styles.birthdayEmoji} aria-hidden="true">🎉</span>
            <p>Today is the day! Wishing you the most beautiful birthday.</p>
          </motion.div>
        ) : (
          <div
            className={styles.countdown}
            role="timer"
            aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds until her birthday`}
          >
            <CountUnit value={timeLeft.days} label="Days" />
            <div className={styles.colon} aria-hidden="true">:</div>
            <CountUnit value={timeLeft.hours} label="Hours" />
            <div className={styles.colon} aria-hidden="true">:</div>
            <CountUnit value={timeLeft.minutes} label="Minutes" />
            <div className={styles.colon} aria-hidden="true">:</div>
            <CountUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}
      </div>
    </section>
  );
}

