import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LevelUpModal } from "../components/LevelUpModal";
import { shuffleArray } from "../data/gameData";
import type { Question, Reward } from "../data/gameData";
import {
  getLevelFromXP,
  getLevelProgress,
  getRewardForLevel,
  getXPForNextLevel,
} from "../data/gameData";

const TIMER_SECONDS = 20;

interface QuizScreenProps {
  questions: Question[];
  isMuted: boolean;
  onToggleMute: () => void;
  onGameEnd: (score: number, level: number, rewards: Reward[]) => void;
}

type AnswerState = "idle" | "correct" | "wrong";

export function QuizScreen({
  questions,
  isMuted,
  onToggleMute,
  onGameEnd,
}: QuizScreenProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [xp, setXp] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [earnedRewards, setEarnedRewards] = useState<Reward[]>([]);
  const [levelUpData, setLevelUpData] = useState<{
    level: number;
    reward: Reward | null;
  } | null>(null);
  const [xpFloats, setXpFloats] = useState<
    { id: number; amount: number; x: number; y: number }[]
  >([]);
  const [waitingForModal, setWaitingForModal] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>(() =>
    questions[0] ? shuffleArray(questions[0].options) : [],
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevLevelRef = useRef(1);
  const xpFloatIdRef = useRef(0);
  const answerBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isRevealingRef = useRef(false);
  const answerStateRef = useRef<AnswerState>("idle");

  const currentQuestion = questions[currentIdx];
  const level = getLevelFromXP(xp);
  const nextLevelXP = getXPForNextLevel(level);
  const levelPct = getLevelProgress(xp);
  const isHP = currentQuestion?.source === "harry-potter";

  // Re-shuffle options whenever the question index changes
  useEffect(() => {
    if (currentQuestion) {
      setShuffledOptions(shuffleArray(currentQuestion.options));
    }
  }, [currentQuestion]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(TIMER_SECONDS);
    isRevealingRef.current = false;
    answerStateRef.current = "idle";
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  // Auto-handle timer expiry using refs to avoid stale closure
  useEffect(() => {
    if (
      timeLeft === 0 &&
      !isRevealingRef.current &&
      answerStateRef.current === "idle"
    ) {
      isRevealingRef.current = true;
      answerStateRef.current = "wrong";
      setIsRevealing(true);
      setAnswerState("wrong");
      setSelectedAnswer(null);
      setStreak(0);
      setTimeout(() => {
        setCurrentIdx((prev) => {
          const next = prev + 1;
          if (next >= questions.length) {
            setTimeout(
              () => onGameEnd(score, getLevelFromXP(xp), earnedRewards),
              300,
            );
          }
          return next < questions.length ? next : prev;
        });
        setAnswerState("idle");
        setSelectedAnswer(null);
        setIsRevealing(false);
      }, 2200);
    }
  }, [timeLeft, questions.length, score, xp, earnedRewards, onGameEnd]);

  useEffect(() => {
    if (!waitingForModal) {
      startTimer();
    }
    return stopTimer;
  }, [waitingForModal, startTimer, stopTimer]);

  // Level up detection
  useEffect(() => {
    const newLevel = getLevelFromXP(xp);
    if (newLevel > prevLevelRef.current) {
      const reward = getRewardForLevel(newLevel);
      prevLevelRef.current = newLevel;
      if (reward) {
        setEarnedRewards((prev) => [...prev, reward]);
      }
      stopTimer();
      setWaitingForModal(true);
      setLevelUpData({ level: newLevel, reward });
    }
  }, [xp, stopTimer]);

  const addXPFloat = (amount: number) => {
    const id = ++xpFloatIdRef.current;
    const x = 50 + (Math.random() - 0.5) * 40;
    const y = 30 + Math.random() * 20;
    setXpFloats((prev) => [...prev, { id, amount, x, y }]);
    setTimeout(
      () => setXpFloats((prev) => prev.filter((f) => f.id !== id)),
      1300,
    );
  };

  const advanceQuestion = useCallback(
    (
      currentScore: number,
      currentXp: number,
      currentRewards: Reward[],
      fromIdx: number,
    ) => {
      const nextIdx = fromIdx + 1;
      if (nextIdx >= questions.length) {
        setTimeout(
          () =>
            onGameEnd(currentScore, getLevelFromXP(currentXp), currentRewards),
          300,
        );
      } else {
        setCurrentIdx(nextIdx);
        setAnswerState("idle");
        setSelectedAnswer(null);
        setIsRevealing(false);
      }
    },
    [questions.length, onGameEnd],
  );

  const handleAnswer = (answer: string) => {
    if (isRevealing || answerState !== "idle") return;
    stopTimer();
    isRevealingRef.current = true;
    answerStateRef.current =
      answer === currentQuestion.correctAnswer ? "correct" : "wrong";
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setAnswerState(correct ? "correct" : "wrong");
    setIsRevealing(true);

    let newScore = score;
    let newXp = xp;
    const newRewards = earnedRewards;

    if (correct) {
      const bonusXP = timeLeft * 10;
      const earned = 100 + bonusXP;
      setStreak((prev) => prev + 1);
      newScore = score + earned;
      newXp = xp + earned;
      setScore(newScore);
      setXp(newXp);
      addXPFloat(earned);
    } else {
      setStreak(0);
    }

    setTimeout(
      () => advanceQuestion(newScore, newXp, newRewards, currentIdx),
      2000,
    );
  };

  const handleModalContinue = () => {
    setLevelUpData(null);
    setWaitingForModal(false);
    setAnswerState("idle");
    setSelectedAnswer(null);
    setIsRevealing(false);
    isRevealingRef.current = false;
    answerStateRef.current = "idle";

    const nextIdx = currentIdx + 1;
    if (nextIdx >= questions.length) {
      onGameEnd(score, getLevelFromXP(xp), earnedRewards);
    } else {
      setCurrentIdx(nextIdx);
    }
  };

  const getButtonClass = (option: string) => {
    if (!isRevealing) return "answer-btn";
    if (option === currentQuestion.correctAnswer) return "answer-btn revealed";
    if (option === selectedAnswer && option !== currentQuestion.correctAnswer)
      return "answer-btn wrong";
    return "answer-btn";
  };

  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerDanger = timeLeft <= 5;

  if (!currentQuestion) return null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#070A10" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-4 md:px-8 py-3 border-b"
        style={{ background: "#0A0F18", borderColor: "#1C2A3A" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">🛡️</span>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-wider leading-none"
              style={{
                fontFamily: "Cinzel, serif",
                color: "#E9EEF6",
                fontSize: "0.65rem",
              }}
            >
              Shadows of
            </p>
            <p
              className="text-xs font-bold uppercase tracking-wider leading-none"
              style={{
                fontFamily: "Cinzel, serif",
                color: "#46C8FF",
                fontSize: "0.65rem",
              }}
            >
              Mystic Hallows
            </p>
          </div>
        </div>

        {/* Level + XP */}
        <div className="flex flex-col items-center min-w-[140px]">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-xs font-bold"
              style={{ fontFamily: "Cinzel, serif", color: "#FFD700" }}
            >
              Lv {level}
            </span>
            <span className="text-xs" style={{ color: "#A7B2C2" }}>
              {xp} XP
            </span>
          </div>
          <div
            className="w-full h-1.5 rounded-full"
            style={{ background: "#1a2535" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${levelPct}%`,
                background: "linear-gradient(90deg, #FFD700, #FFC94A)",
                boxShadow: "0 0 6px #FFD70066",
              }}
            />
          </div>
          <p
            className="text-xs mt-0.5"
            style={{ color: "#7E8898", fontSize: "0.6rem" }}
          >
            Next: {nextLevelXP} XP
          </p>
        </div>

        <div className="flex items-center gap-3">
          {streak >= 2 && <span className="streak-badge">🔥 {streak}x</span>}
          <button
            type="button"
            data-ocid="quiz.toggle"
            onClick={onToggleMute}
            className="rounded-full w-8 h-8 flex items-center justify-center text-sm transition-all"
            style={{
              background: "#141C27",
              border: "1px solid #263244",
              color: isMuted ? "#7E8898" : "#46C8FF",
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
      </header>

      {/* Progress bar */}
      <div
        className="px-4 md:px-8 py-2"
        style={{ background: "#0A0F18", borderBottom: "1px solid #1C2A3A" }}
      >
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <span
            className="text-xs"
            style={{
              color: "#7E8898",
              minWidth: 90,
              fontFamily: "Cinzel, serif",
            }}
          >
            Q {currentIdx + 1} / {questions.length}
          </span>
          <div
            className="flex-1 h-1.5 rounded-full"
            style={{ background: "#1a2535" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentIdx + 1) / questions.length) * 100}%`,
                background: "linear-gradient(90deg, #46C8FF, #8FE7FF)",
                boxShadow: "0 0 6px #46C8FF44",
              }}
            />
          </div>
          <span
            className="text-xs"
            style={{ color: "#FFD700", minWidth: 60, textAlign: "right" }}
          >
            🏆 {score}
          </span>
        </div>
      </div>

      {/* Main quiz area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-6">
        <div className="w-full max-w-3xl">
          {/* Source badge */}
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 flex items-center gap-2"
          >
            <span
              className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full"
              style={{
                background: isHP ? "#1a0e00" : "#0a0a1e",
                border: isHP ? "1px solid #FFD70066" : "1px solid #46C8FF44",
                color: isHP ? "#FFD700" : "#46C8FF",
                fontFamily: "Cinzel, serif",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
              }}
            >
              {isHP ? "⚡ HARRY POTTER" : "🧛 VAMPIRE DIARIES"}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "#1a1a2e",
                border: "1px solid #263244",
                color:
                  currentQuestion.difficulty === "expert"
                    ? "#ef4444"
                    : "#f97316",
                fontSize: "0.65rem",
              }}
            >
              {currentQuestion.difficulty.toUpperCase()}
            </span>
          </motion.div>

          {/* Question card */}
          <motion.div
            key={`q-${currentQuestion.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-gothic p-6 mb-5 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{
                background: isHP
                  ? "linear-gradient(90deg, transparent, #FFD700, transparent)"
                  : "linear-gradient(90deg, transparent, #46C8FF, transparent)",
              }}
            />
            <h2
              className="text-lg md:text-xl font-semibold leading-relaxed"
              style={{ color: "#E9EEF6" }}
            >
              {currentQuestion.question}
            </h2>
          </motion.div>

          {/* Timer */}
          <div className="mb-5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs" style={{ color: "#7E8898" }}>
                Time remaining
              </span>
              <span
                className="text-sm font-bold"
                style={{
                  fontFamily: "Cinzel, serif",
                  color: timerDanger ? "#ef4444" : "#46C8FF",
                }}
              >
                {timeLeft}s
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-full"
              style={{ background: "#1a2535" }}
            >
              <div
                className={`timer-bar${timerDanger ? " danger" : ""}`}
                style={{ width: `${timerPct}%` }}
              />
            </div>
          </div>

          {/* Answers grid */}
          <div
            data-ocid="quiz.panel"
            className="grid grid-cols-1 md:grid-cols-2 gap-3 relative"
          >
            {/* XP floats */}
            {xpFloats.map((f) => (
              <div
                key={f.id}
                className="xp-float-text"
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
              >
                +{f.amount} XP
              </div>
            ))}

            {shuffledOptions.map((option, oi) => (
              <button
                type="button"
                key={option}
                ref={(el) => {
                  answerBtnRefs.current[oi] = el;
                }}
                data-ocid={`quiz.button.${oi + 1}`}
                className={getButtonClass(option)}
                onClick={() => handleAnswer(option)}
                disabled={isRevealing}
              >
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs mr-2 shrink-0"
                  style={{
                    background: "#263244",
                    color: "#A7B2C2",
                    fontFamily: "Cinzel, serif",
                  }}
                >
                  {String.fromCharCode(65 + oi)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Level up modal */}
      <AnimatePresence>
        {levelUpData && (
          <LevelUpModal
            level={levelUpData.level}
            reward={levelUpData.reward}
            onContinue={handleModalContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
