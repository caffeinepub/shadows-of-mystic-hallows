import { useCallback, useEffect, useRef, useState } from "react";

export function useAmbientMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const gainRef = useRef<GainNode | null>(null);

  const stop = useCallback(() => {
    for (const n of nodesRef.current) {
      try {
        if (n instanceof OscillatorNode) n.stop();
      } catch {
        // already stopped
      }
    }
    nodesRef.current = [];
  }, []);

  const start = useCallback(() => {
    if (ctxRef.current) {
      ctxRef.current.close();
    }
    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(isMuted ? 0 : 0.18, ctx.currentTime);
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    const reverb = ctx.createConvolver();
    const length = ctx.sampleRate * 3;
    const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;
      }
    }
    reverb.buffer = impulse;
    reverb.connect(masterGain);

    const createTone = (
      freq: number,
      type: OscillatorType,
      gainVal: number,
      detune = 0,
    ) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.detune.setValueAtTime(detune, ctx.currentTime);
      g.gain.setValueAtTime(gainVal, ctx.currentTime);
      osc.connect(g);
      g.connect(reverb);
      g.connect(masterGain);
      osc.start();
      nodesRef.current.push(osc);
      return { osc, g };
    };

    // Mystic drone notes (Dorian-ish)
    createTone(110, "sine", 0.08);
    createTone(165, "sine", 0.05);
    createTone(220, "triangle", 0.04);
    createTone(247.5, "sine", 0.03, 5);
    createTone(330, "sine", 0.02);
    createTone(440, "triangle", 0.015, -8);
    createTone(880, "sine", 0.01, 12);
    createTone(55, "sine", 0.06);

    // LFO wobble
    const wobble = ctx.createOscillator();
    wobble.type = "sine";
    wobble.frequency.setValueAtTime(0.25, ctx.currentTime);
    const wobbleGain = ctx.createGain();
    wobbleGain.gain.setValueAtTime(8, ctx.currentTime);
    wobble.connect(wobbleGain);
    wobble.start();
    nodesRef.current.push(wobble);

    // Slow chime-like arpeggio
    const chimeNotes = [261.63, 293.66, 329.63, 392, 440, 349.23, 311.13];
    let noteIdx = 0;
    const playChime = () => {
      if (!ctxRef.current) return;
      const now = ctx.currentTime;
      const freq = chimeNotes[noteIdx % chimeNotes.length];
      noteIdx++;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq * 2, now);
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.04, now + 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      osc.connect(g);
      g.connect(reverb);
      osc.start(now);
      osc.stop(now + 2.5);
      nodesRef.current.push(osc);
    };

    const chimeInterval = setInterval(playChime, 2800);
    playChime();

    // Store cleanup for interval
    const intervalNode = {
      stop: () => clearInterval(chimeInterval),
    } as unknown as AudioNode;
    nodesRef.current.push(intervalNode);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.setTargetAtTime(
          next ? 0 : 0.18,
          ctxRef.current.currentTime,
          0.1,
        );
      }
      return next;
    });
  }, []);

  useEffect(() => {
    return () => {
      stop();
      ctxRef.current?.close();
    };
  }, [stop]);

  return { start, stop, toggleMute, isMuted };
}
