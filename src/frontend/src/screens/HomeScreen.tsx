import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ParticleField } from "../components/ParticleField";

interface HomeScreenProps {
  onStart: (name: string) => void;
  totalGamesPlayed: number;
}

export function HomeScreen({ onStart, totalGamesPlayed }: HomeScreenProps) {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => {
    if (!playerName.trim()) {
      setError("Enter your name to begin");
      return;
    }
    setError("");
    onStart(playerName.trim());
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleStart();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center top, #0B1830 0%, #070A10 50%, #030608 100%)",
        }}
      />
      <ParticleField count={55} />

      {/* Hero image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1300x500.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
          style={{ objectPosition: "center top" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(7,10,16,0.4) 0%, rgba(7,10,16,0.6) 60%, rgba(7,10,16,1) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-auto px-6 text-center">
        {/* Crest */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <span className="text-5xl">🛡️</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-black uppercase mb-2"
          style={{
            fontFamily: "Cinzel, serif",
            color: "#E9EEF6",
            textShadow: "0 0 30px #46C8FF55, 0 2px 4px rgba(0,0,0,0.8)",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
          }}
        >
          SHADOWS OF
          <br />
          <span
            style={{
              color: "#46C8FF",
              textShadow: "0 0 20px #46C8FF, 0 0 40px #46C8FF55",
            }}
          >
            MYSTIC HALLOWS
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm tracking-[0.3em] uppercase mb-2"
          style={{ color: "#A7B2C2", fontFamily: "Cinzel, serif" }}
        >
          Harry Potter × The Vampire Diaries
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-3 justify-center mb-6"
        >
          <div
            className="h-px w-16"
            style={{
              background: "linear-gradient(to right, transparent, #46C8FF66)",
            }}
          />
          <span style={{ color: "#46C8FF" }}>★</span>
          <div
            className="h-px w-16"
            style={{
              background: "linear-gradient(to left, transparent, #46C8FF66)",
            }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base mb-8 max-w-lg mx-auto"
          style={{ color: "#A7B2C2", lineHeight: 1.7 }}
        >
          40 impossible questions from the darkest corners of Hogwarts and
          Mystic Falls. Only true die-hard fans survive. Do you dare enter?
        </motion.p>

        {/* Name input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-4"
        >
          <input
            data-ocid="home.input"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter your wizard name..."
            maxLength={30}
            className="w-full max-w-sm mx-auto block px-5 py-3 rounded-full text-center text-sm"
            style={{
              background: "rgba(14,22,36,0.8)",
              border: "1px solid #263244",
              color: "#E9EEF6",
              outline: "none",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.05em",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#46C8FF66";
              e.currentTarget.style.boxShadow = "0 0 12px #46C8FF22";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#263244";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          {error && (
            <p
              data-ocid="home.error_state"
              className="text-xs mt-2"
              style={{ color: "#ef4444" }}
            >
              {error}
            </p>
          )}
        </motion.div>

        {/* CTA */}
        <motion.button
          data-ocid="home.primary_button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleStart}
          className="btn-gothic px-10 py-4 text-base font-semibold inline-block"
          style={{
            fontSize: "0.9rem",
            letterSpacing: "0.15em",
          }}
        >
          ⚡ BEGIN YOUR QUEST
        </motion.button>

        {/* Games played */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-xs"
          style={{ color: "#7E8898" }}
        >
          <span style={{ color: "#46C8FF" }}>
            {totalGamesPlayed.toLocaleString()}
          </span>{" "}
          brave souls have entered these halls
        </motion.p>

        {/* Decorative elements */}
        <div className="flex justify-center gap-6 mt-4">
          <span className="text-2xl opacity-40">🪄</span>
          <span className="text-2xl opacity-40">🧛</span>
          <span className="text-2xl opacity-40">🐍</span>
        </div>
      </div>
    </div>
  );
}
