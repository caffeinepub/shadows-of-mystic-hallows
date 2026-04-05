import { motion } from "motion/react";
import type { Reward } from "../data/gameData";

interface ArtifactCardProps {
  reward: Reward;
  index: number;
}

export function ArtifactCard({ reward, index }: ArtifactCardProps) {
  const isHP = reward.source === "harry-potter";
  return (
    <motion.div
      data-ocid={`artifact.item.${index + 1}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl p-4 flex flex-col items-center text-center gap-2"
      style={{
        background: isHP
          ? "linear-gradient(135deg, #1a120a 0%, #0e0a05 100%)"
          : "linear-gradient(135deg, #0a1020 0%, #05080f 100%)",
        border: isHP ? "1px solid #FFD70033" : "1px solid #46C8FF33",
        boxShadow: isHP ? "0 0 20px #FFD70011" : "0 0 20px #46C8FF11",
      }}
    >
      <img
        src={reward.image}
        alt={reward.name}
        className="w-16 h-16 object-contain"
      />
      <div>
        <p
          className="text-xs font-semibold mb-0.5"
          style={{
            fontFamily: "Cinzel, serif",
            color: isHP ? "#FFD700" : "#46C8FF",
          }}
        >
          {reward.name}
        </p>
        <p className="text-xs leading-tight" style={{ color: "#7E8898" }}>
          {reward.description}
        </p>
      </div>
      <span
        className="text-xs px-2 py-0.5 rounded-full"
        style={{
          background: isHP ? "#FFD70011" : "#46C8FF11",
          color: isHP ? "#FFD700" : "#46C8FF",
          border: isHP ? "1px solid #FFD70044" : "1px solid #46C8FF44",
          fontFamily: "Cinzel, serif",
          fontSize: "0.6rem",
          letterSpacing: "0.1em",
        }}
      >
        {isHP ? "⚡ HP" : "🧛 TVD"}
      </span>
    </motion.div>
  );
}
