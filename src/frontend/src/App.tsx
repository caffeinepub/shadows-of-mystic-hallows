import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { ALL_QUESTIONS, shuffleArray } from "./data/gameData";
import type { Reward } from "./data/gameData";
import { useActor } from "./hooks/useActor";
import { useAmbientMusic } from "./hooks/useAmbientMusic";
import { GameOverScreen } from "./screens/GameOverScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { LeaderboardScreen } from "./screens/LeaderboardScreen";
import { QuizScreen } from "./screens/QuizScreen";

type Screen = "home" | "quiz" | "gameover" | "leaderboard";

interface ScoreEntry {
  playerName: string;
  score: bigint;
  levelReached: bigint;
  timestamp: bigint;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [playerName, setPlayerName] = useState("");
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    shuffleArray(ALL_QUESTIONS),
  );
  const [finalScore, setFinalScore] = useState(0);
  const [finalLevel, setFinalLevel] = useState(1);
  const [finalRewards, setFinalRewards] = useState<Reward[]>([]);
  const musicStarted = useRef(false);
  const queryClient = useQueryClient();

  const { actor, isFetching } = useActor();
  const { start: startMusic, toggleMute, isMuted } = useAmbientMusic();

  const { data: topScores = [] } = useQuery<ScoreEntry[]>({
    queryKey: ["topScores"],
    queryFn: async () => {
      if (!actor) return [];
      const scores = await actor.getTopScores();
      return scores as ScoreEntry[];
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });

  const { data: totalGamesPlayed = BigInt(0) } = useQuery<bigint>({
    queryKey: ["totalGamesPlayed"],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getTotalGamesPlayed();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60000,
  });

  const handleStart = useCallback(
    (name: string) => {
      setPlayerName(name);
      setShuffledQuestions(shuffleArray(ALL_QUESTIONS));
      setScreen("quiz");
      if (!musicStarted.current) {
        musicStarted.current = true;
        startMusic();
      }
    },
    [startMusic],
  );

  const handleGameEnd = useCallback(
    async (score: number, level: number, rewards: Reward[]) => {
      setFinalScore(score);
      setFinalLevel(level);
      setFinalRewards(rewards);
      setScreen("gameover");
      try {
        if (actor) {
          await actor.submitScore(playerName, BigInt(score), BigInt(level));
          queryClient.invalidateQueries({ queryKey: ["topScores"] });
        }
      } catch (e) {
        console.error("Failed to submit score", e);
      }
    },
    [actor, playerName, queryClient],
  );

  const handlePlayAgain = useCallback(() => {
    setShuffledQuestions(shuffleArray(ALL_QUESTIONS));
    setFinalScore(0);
    setFinalLevel(1);
    setFinalRewards([]);
    setScreen("home");
  }, []);

  const handleGoLeaderboard = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ["topScores"] });
    setScreen("leaderboard");
  }, [queryClient]);

  return (
    <div className="min-h-screen" style={{ background: "#070A10" }}>
      <AnimatePresence mode="wait">
        {screen === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HomeScreen
              onStart={handleStart}
              totalGamesPlayed={Number(totalGamesPlayed)}
            />
          </motion.div>
        )}
        {screen === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <QuizScreen
              questions={shuffledQuestions}
              isMuted={isMuted}
              onToggleMute={toggleMute}
              onGameEnd={handleGameEnd}
            />
          </motion.div>
        )}
        {screen === "gameover" && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <GameOverScreen
              playerName={playerName}
              score={finalScore}
              level={finalLevel}
              rewards={finalRewards}
              topScores={topScores}
              onPlayAgain={handlePlayAgain}
              onLeaderboard={handleGoLeaderboard}
            />
          </motion.div>
        )}
        {screen === "leaderboard" && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LeaderboardScreen
              scores={topScores}
              isLoading={false}
              onPlayAgain={handlePlayAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer
        className="text-center py-4 text-xs"
        style={{ color: "#7E8898", borderTop: "1px solid #1a2535" }}
      >
        © {new Date().getFullYear()}. Built with{" "}
        <span style={{ color: "#ef4444" }}>&#10084;</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noreferrer"
          style={{ color: "#46C8FF" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
