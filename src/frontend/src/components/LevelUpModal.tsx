import { AnimatePresence, motion } from "motion/react";
import type { Reward } from "../data/gameData";

interface LevelUpModalProps {
  level: number;
  reward: Reward | null;
  onContinue: () => void;
}

// Pre-compute particle positions to avoid array index key issues
const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: `p-${i}`,
  x: Math.cos((i / 24) * Math.PI * 2) * (150 + ((i * 7) % 100)),
  y: Math.sin((i / 24) * Math.PI * 2) * (150 + ((i * 13) % 100)),
  isGold: i % 2 === 0,
}));

export function LevelUpModal({ level, reward, onContinue }: LevelUpModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Particle burst overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: "50%",
                top: "50%",
                background: p.isGold ? "#FFD700" : "#46C8FF",
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: p.x,
                y: p.y,
                opacity: 0,
                scale: 0,
              }}
              transition={{ duration: 1.2, delay: 0.1 }}
            />
          ))}
        </div>

        <motion.div
          className="relative z-10 max-w-md w-full mx-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div
            className="rounded-2xl p-8 text-center"
            style={{
              background: "linear-gradient(135deg, #0e1a2e 0%, #0a1220 100%)",
              border: "2px solid #FFD70066",
              boxShadow: "0 0 60px #FFD70033, 0 0 120px #FFD70011",
            }}
          >
            {/* Level up text */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p
                className="text-sm tracking-[0.3em] uppercase mb-2"
                style={{ color: "#A7B2C2", fontFamily: "Cinzel, serif" }}
              >
                Achievement Unlocked
              </p>
              <h2
                className="text-5xl font-black mb-1"
                style={{
                  fontFamily: "Cinzel, serif",
                  color: "#FFD700",
                  textShadow: "0 0 20px #FFD700, 0 0 40px #FFD70066",
                }}
              >
                LEVEL UP!
              </h2>
              <p
                className="text-2xl font-bold mb-6"
                style={{ fontFamily: "Cinzel, serif", color: "#46C8FF" }}
              >
                Level {level} Reached
              </p>
            </motion.div>

            {/* Reward */}
            {reward && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
              >
                <div
                  className="rounded-xl p-4 mb-4 inline-block"
                  style={{
                    background:
                      "linear-gradient(135deg, #1a1208 0%, #241a08 100%)",
                    border: "1px solid #FFD70044",
                  }}
                >
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="w-24 h-24 object-contain mx-auto"
                  />
                </div>
                <div
                  className="inline-block text-xs px-3 py-1 rounded-full mb-2"
                  style={{
                    background:
                      reward.source === "harry-potter" ? "#1a1008" : "#0a1020",
                    border:
                      reward.source === "harry-potter"
                        ? "1px solid #FFD70066"
                        : "1px solid #46C8FF66",
                    color:
                      reward.source === "harry-potter" ? "#FFD700" : "#46C8FF",
                    fontFamily: "Cinzel, serif",
                  }}
                >
                  {reward.source === "harry-potter"
                    ? "⚡ Harry Potter"
                    : "🧛 Vampire Diaries"}
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ fontFamily: "Cinzel, serif", color: "#FFD700" }}
                >
                  {reward.name}
                </h3>
                <p className="text-sm" style={{ color: "#A7B2C2" }}>
                  {reward.description}
                </p>
              </motion.div>
            )}

            <motion.button
              data-ocid="levelup.continue_button"
              className="btn-gothic-gold px-8 py-3 text-sm font-semibold"
              onClick={onContinue}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Continue Quest
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
