"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import type { BirthdayConfig, GalleryImage } from "@/content/birthday";
import styles from "./MemoryGallery.module.css";

interface Props {
  config: BirthdayConfig;
}

function ImagePlaceholder({ caption }: { caption: string }) {
  return (
    <div className={styles.placeholder} aria-label={caption}>
      <span className={styles.placeholderIcon} aria-hidden="true">♥</span>
      <span className={styles.placeholderCaption}>{caption}</span>
    </div>
  );
}

function GalleryCard({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: (i: number) => void;
}) {
  const [imgError, setImgError] = useState(false);
  const isPortrait = image.height > image.width;

  return (
    <motion.article
      className={`${styles.card} ${isPortrait ? styles.cardPortrait : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <button
        className={styles.cardBtn}
        onClick={() => onClick(index)}
        aria-label={`View photo: ${image.caption}`}
        id={`gallery-photo-${index}`}
      >
        <div className={styles.imageWrapper}>
          {imgError ? (
            <ImagePlaceholder caption={image.caption} />
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
              className={styles.image}
              onError={() => setImgError(true)}
              loading="lazy"
              style={{ objectFit: "cover" }}
            />
          )}
          <div className={styles.overlay} aria-hidden="true">
            <Expand className={styles.expandIcon} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.cardMeta}>
          <p className={styles.caption}>{image.caption}</p>
          {image.date && (
            <time className={styles.date} dateTime={image.date}>
              {image.date}
            </time>
          )}
        </div>
      </button>
    </motion.article>
  );
}

function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const image = images[activeIndex];

  useEffect(() => {
    setImgError(false);
  }, [activeIndex]);

  useEffect(() => {
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className={styles.lightboxBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`Viewing photo ${activeIndex + 1} of ${images.length}: ${image.caption}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={styles.lightboxContent}>
        {/* Close */}
        <button
          ref={closeRef}
          className={styles.lightboxClose}
          onClick={onClose}
          aria-label="Close photo viewer"
          id="lightbox-close"
        >
          <X size={22} aria-hidden="true" />
        </button>

        {/* Prev */}
        <button
          className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
          onClick={onPrev}
          aria-label="Previous photo"
          disabled={images.length <= 1}
          id="lightbox-prev"
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>

        {/* Image */}
        <div className={styles.lightboxImageWrap}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={styles.lightboxImageInner}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {imgError ? (
                <ImagePlaceholder caption={image.caption} />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="95vw"
                  style={{ objectFit: "contain" }}
                  onError={() => setImgError(true)}
                  priority
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next */}
        <button
          className={`${styles.lightboxNav} ${styles.lightboxNext}`}
          onClick={onNext}
          aria-label="Next photo"
          disabled={images.length <= 1}
          id="lightbox-next"
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>

        {/* Caption */}
        <div className={styles.lightboxCaption}>
          <p>{image.caption}</p>
          {image.date && <time>{image.date}</time>}
          <span className={styles.lightboxCounter} aria-live="polite">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MemoryGallery({ config }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setActiveIndex(i), []);
  const closeLightbox = useCallback(() => {
    const id = activeIndex !== null ? `gallery-photo-${activeIndex}` : null;
    setActiveIndex(null);
    if (id) setTimeout(() => document.getElementById(id)?.focus(), 50);
  }, [activeIndex]);
  const prev = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i - 1 + config.gallery.length) % config.gallery.length : 0)),
    [config.gallery.length]);
  const next = useCallback(() =>
    setActiveIndex((i) => (i !== null ? (i + 1) % config.gallery.length : 0)),
    [config.gallery.length]);

  if (config.gallery.length === 0) {
    return (
      <section className={`section ${styles.section}`} id="gallery">
        <div className="container">
          <div className="section-title">
            <span className="script-accent">our</span>
            <h2>Moments Together</h2>
          </div>
          <p className={styles.empty}>
            Add photos to <code>public/images/memories/</code> and update the gallery config to see them here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${styles.section}`} id="gallery" aria-label="Photo memories gallery">
      <div className="container">
        <div className="section-title">
          <span className="script-accent">our</span>
          <h2>Moments Together</h2>
        </div>

        <div className={styles.grid} role="list">
          {config.gallery.map((img, i) => (
            <div key={img.src} role="listitem">
              <GalleryCard image={img} index={i} onClick={openLightbox} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Lightbox
              images={config.gallery}
              activeIndex={activeIndex}
              onClose={closeLightbox}
              onPrev={prev}
              onNext={next}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
