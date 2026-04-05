import { motion } from "motion/react";
import { ArtifactCard } from "../components/ArtifactCard";
import type { Reward } from "../data/gameData";

interface ScoreEntry {
  playerName: string;
  score: bigint;
  levelReached: bigint;
}

interface GameOverScreenProps {
  playerName: string;
  score: number;
  level: number;
  rewards: Reward[];
  topScores: ScoreEntry[];
  onPlayAgain: () => void;
  onLeaderboard: () => void;
}

const PODIUM_COLORS = ["#FFD700", "#C0C0C0", "#CD7F32"];
const PODIUM_LABELS = ["1st", "2nd", "3rd"];

export function GameOverScreen({
  playerName,
  score,
  level,
  rewards,
  topScores,
  onPlayAgain,
  onLeaderboard,
}: GameOverScreenProps) {
  const podium = topScores.slice(0, 3);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-12 px-4"
      style={{ background: "#070A10" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <span className="text-5xl">🏆</span>
          <h1
            className="text-4xl font-black uppercase mt-3 mb-2"
            style={{
              fontFamily: "Cinzel, serif",
              color: "#FFD700",
              textShadow: "0 0 20px #FFD700, 0 0 40px #FFD70055",
            }}
          >
            Quest Complete
          </h1>
          <p style={{ color: "#A7B2C2" }}>Well played, {playerName}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div
            data-ocid="gameover.card"
            className="card-gothic p-5 text-center"
          >
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "#7E8898", fontFamily: "Cinzel, serif" }}
            >
              Final Score
            </p>
            <p
              className="text-4xl font-black"
              style={{
                fontFamily: "Cinzel, serif",
                color: "#46C8FF",
                textShadow: "0 0 15px #46C8FF55",
              }}
            >
              {score.toLocaleString()}
            </p>
          </div>
          <div className="card-gothic p-5 text-center">
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ color: "#7E8898", fontFamily: "Cinzel, serif" }}
            >
              Level Reached
            </p>
            <p
              className="text-4xl font-black"
              style={{
                fontFamily: "Cinzel, serif",
                color: "#FFD700",
                textShadow: "0 0 15px #FFD70055",
              }}
            >
              {level}
            </p>
          </div>
        </div>

        {/* Earned Artifacts */}
        {rewards.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-base font-bold uppercase mb-4 text-center tracking-widest"
              style={{ fontFamily: "Cinzel, serif", color: "#E9EEF6" }}
            >
              Artifacts Collected
            </h2>
            <div
              className="grid gap-3"
              style={{
                gridTemplateColumns: `repeat(${Math.min(rewards.length, 4)}, 1fr)`,
              }}
            >
              {rewards.map((r, i) => (
                <ArtifactCard key={r.level} reward={r} index={i} />
              ))}
            </div>
          </div>
        )}

        {rewards.length === 0 && (
          <div
            data-ocid="gameover.empty_state"
            className="card-gothic p-6 text-center mb-8"
          >
            <p style={{ color: "#7E8898" }}>
              No artifacts collected — reach Level 2 to earn rewards!
            </p>
          </div>
        )}

        {/* Top 3 leaderboard preview */}
        {podium.length > 0 && (
          <div className="mb-8">
            <h2
              className="text-base font-bold uppercase mb-4 text-center tracking-widest"
              style={{ fontFamily: "Cinzel, serif", color: "#E9EEF6" }}
            >
              Hall of Fame
            </h2>
            <div className="space-y-2">
              {podium.map((entry, i) => (
                <div
                  key={entry.playerName}
                  data-ocid={`gameover.item.${i + 1}`}
                  className="flex items-center gap-4 px-5 py-3 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #141C27 0%, #101722 100%)",
                    border: `1px solid ${PODIUM_COLORS[i]}33`,
                  }}
                >
                  <span
                    className="text-sm font-bold w-8 shrink-0"
                    style={{
                      fontFamily: "Cinzel, serif",
                      color: PODIUM_COLORS[i],
                    }}
                  >
                    {PODIUM_LABELS[i]}
                  </span>
                  <span className="flex-1 text-sm" style={{ color: "#E9EEF6" }}>
                    {entry.playerName}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#46C8FF" }}
                  >
                    {Number(entry.score).toLocaleString()}
                  </span>
                  <span className="text-xs" style={{ color: "#FFD700" }}>
                    Lv {Number(entry.levelReached)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <motion.button
            data-ocid="gameover.primary_button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="btn-gothic px-8 py-3 text-sm"
          >
            ⚡ Play Again
          </motion.button>
          <motion.button
            data-ocid="gameover.secondary_button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLeaderboard}
            className="btn-gothic-gold px-8 py-3 text-sm"
          >
            🏆 Leaderboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
