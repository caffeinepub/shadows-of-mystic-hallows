import { motion } from "motion/react";

interface ScoreEntry {
  playerName: string;
  score: bigint;
  levelReached: bigint;
}

interface LeaderboardScreenProps {
  scores: ScoreEntry[];
  isLoading: boolean;
  onPlayAgain: () => void;
}

const RANK_STYLES = [
  {
    color: "#FFD700",
    bg: "rgba(255,215,0,0.06)",
    border: "rgba(255,215,0,0.25)",
    label: "👑",
  },
  {
    color: "#C0C0C0",
    bg: "rgba(192,192,192,0.06)",
    border: "rgba(192,192,192,0.2)",
    label: "🥈",
  },
  {
    color: "#CD7F32",
    bg: "rgba(205,127,50,0.06)",
    border: "rgba(205,127,50,0.2)",
    label: "🥉",
  },
];

export function LeaderboardScreen({
  scores,
  isLoading,
  onPlayAgain,
}: LeaderboardScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center py-12 px-4"
      style={{ background: "#070A10" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-black uppercase mb-2"
            style={{
              fontFamily: "Cinzel, serif",
              color: "#FFD700",
              textShadow: "0 0 20px #FFD700, 0 0 40px #FFD70055",
            }}
          >
            Hall of Legends
          </h1>
          <p style={{ color: "#A7B2C2", fontSize: "0.85rem" }}>
            The bravest souls who mastered Mystic Hallows
          </p>
          <div className="flex items-center gap-3 justify-center mt-3">
            <div
              className="h-px w-16"
              style={{
                background: "linear-gradient(to right, transparent, #FFD70066)",
              }}
            />
            <span style={{ color: "#FFD700" }}>★</span>
            <div
              className="h-px w-16"
              style={{
                background: "linear-gradient(to left, transparent, #FFD70066)",
              }}
            />
          </div>
        </div>

        {isLoading ? (
          <div
            data-ocid="leaderboard.loading_state"
            className="card-gothic p-12 text-center"
          >
            <p style={{ color: "#46C8FF" }}>Loading the Hall of Legends...</p>
          </div>
        ) : scores.length === 0 ? (
          <div
            data-ocid="leaderboard.empty_state"
            className="card-gothic p-12 text-center"
          >
            <p style={{ color: "#7E8898" }}>No legends yet — be the first!</p>
          </div>
        ) : (
          <div data-ocid="leaderboard.table" className="space-y-2">
            {scores.map((entry, i) => {
              const rankStyle = RANK_STYLES[i] ?? {
                color: "#A7B2C2",
                bg: "transparent",
                border: "rgba(38,50,68,0.5)",
                label: `${i + 1}`,
              };
              return (
                <motion.div
                  key={entry.playerName}
                  data-ocid={`leaderboard.item.${i + 1}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl"
                  style={{
                    background:
                      i < 3
                        ? rankStyle.bg
                        : "linear-gradient(135deg, #141C27 0%, #101722 100%)",
                    border: `1px solid ${rankStyle.border}`,
                  }}
                >
                  <span
                    className="text-sm font-bold w-8 text-center shrink-0"
                    style={{
                      fontFamily: "Cinzel, serif",
                      color: rankStyle.color,
                    }}
                  >
                    {rankStyle.label}
                  </span>
                  <span
                    className="flex-1 font-medium"
                    style={{ color: "#E9EEF6" }}
                  >
                    {entry.playerName}
                  </span>
                  <div className="flex items-center gap-4">
                    <span
                      className="text-sm font-bold"
                      style={{ color: "#46C8FF", fontFamily: "Cinzel, serif" }}
                    >
                      {Number(entry.score).toLocaleString()}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: "#1a1208",
                        border: "1px solid #FFD70033",
                        color: "#FFD700",
                      }}
                    >
                      Lv {Number(entry.levelReached)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-8">
          <motion.button
            data-ocid="leaderboard.primary_button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPlayAgain}
            className="btn-gothic px-10 py-3 text-sm"
          >
            ⚡ Begin New Quest
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
