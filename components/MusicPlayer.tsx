"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Music, Disc3 } from "lucide-react";
import type { BirthdayConfig } from "@/content/birthday";
import styles from "./MusicPlayer.module.css";

interface Props {
  config: BirthdayConfig;
}

export default function MusicPlayer({ config }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);

  if (!config.music) return null;
  const { src, title, artist } = config.music;

  // Sync duration whenever audio metadata or buffer changes
  const updateDuration = useCallback(() => {
    const audio = audioRef.current;
    if (audio && Number.isFinite(audio.duration) && audio.duration > 0) {
      setDuration(audio.duration);
    }
  }, []);

  // Try auto-play on mount (since user just clicked the open surprise button)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaying(true);
        })
        .catch(() => {
          // If browser policy blocks autoplay, wait for direct click
          setPlaying(false);
        });
    }
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || error) return;
    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        await audio.play();
        setPlaying(true);
      }
    } catch {
      setError(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted((m) => !m);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    if (audio.duration && Number.isFinite(audio.duration) && audio.duration > 0) {
      setProgress((audio.currentTime / audio.duration) * 100);
      if (duration === 0) setDuration(audio.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const val = Number(e.target.value);
    audio.currentTime = (val / 100) * audio.duration;
    setProgress(val);
    setCurrentTime(audio.currentTime);
  };

  const formatTime = (s: number) => {
    if (!s || isNaN(s) || !Number.isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, "0")}`;
  };

  const scrollToPlayer = () => {
    document.getElementById("music-player")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hidden audio element shared between controls */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={updateDuration}
        onDurationChange={updateDuration}
        onCanPlay={updateDuration}
        onError={() => setError(true)}
        onEnded={() => setPlaying(false)}
        preload="auto"
      />

      {/* Persistent floating music pill (so the song plays as they scroll) */}
      <aside className={styles.floatingPill} aria-label="Quick music player">
        <button
          onClick={scrollToPlayer}
          className={styles.floatingInfoBtn}
          title="Scroll to music section"
          type="button"
        >
          <Disc3
            size={22}
            className={`${styles.floatingDisc} ${playing ? styles.spinning : ""}`}
            aria-hidden="true"
          />
          <span className={styles.floatingTrack}>
            <strong className={styles.floatingTitle}>{title}</strong>
            <span className={styles.floatingArtist}>{artist}</span>
          </span>
        </button>

        <button
          onClick={toggle}
          className={styles.floatingPlayBtn}
          aria-label={playing ? "Pause music" : "Play music"}
          type="button"
        >
          {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
        </button>
      </aside>

      {/* Dedicated Soundtrack Section */}
      <section
        className={`section ${styles.section}`}
        id="music-player"
        aria-label="Music player"
      >
        <div className="container">
          <div className="section-title">
            <span className="script-accent">just for you</span>
            <h2>Our Soundtrack</h2>
          </div>

          <div className={styles.player} role="region" aria-label="Audio player controls">
            {/* Icon */}
            <div className={styles.iconWrap} aria-hidden="true">
              <Music className={styles.musicIcon} />
            </div>

            {/* Track info */}
            <div className={styles.trackInfo}>
              <p className={styles.trackTitle}>{title}</p>
              {artist && <p className={styles.trackArtist}>{artist}</p>}
            </div>

            {error ? (
              <p className={styles.errorMsg} role="alert">
                Could not load the audio track. Please verify <code>public/audio/tu-chahiye.mp3</code>.
              </p>
            ) : (
              <>
                {/* Progress */}
                <div className={styles.progressWrap}>
                  <span className={styles.timeLabel} aria-hidden="true">
                    {formatTime(currentTime)}
                  </span>
                  <label className="sr-only" htmlFor="audio-seek">
                    Playback position, {formatTime(currentTime)} of {formatTime(duration)}
                  </label>
                  <input
                    id="audio-seek"
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={progress}
                    onChange={handleSeek}
                    className={styles.range}
                    aria-label="Seek audio"
                  />
                  <span className={styles.timeLabel} aria-hidden="true">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Controls */}
                <div className={styles.controls}>
                  <button
                    onClick={toggle}
                    className={styles.playBtn}
                    aria-label={playing ? "Pause music" : "Play music"}
                    id="music-play-btn"
                    type="button"
                  >
                    {playing ? (
                      <Pause size={24} aria-hidden="true" />
                    ) : (
                      <Play size={24} aria-hidden="true" />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className={styles.muteBtn}
                    aria-label={muted ? "Unmute" : "Mute"}
                    aria-pressed={muted}
                    id="music-mute-btn"
                    type="button"
                  >
                    {muted ? (
                      <VolumeX size={18} aria-hidden="true" />
                    ) : (
                      <Volume2 size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
