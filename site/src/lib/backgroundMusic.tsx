import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface BackgroundMusicContextValue {
  muted: boolean;
  toggle: () => void;
}

const BackgroundMusicContext = createContext<
  BackgroundMusicContextValue | undefined
>(undefined);

const TRACK_URL = "/mochamusic-gumdrop-405670.mp3";
const TARGET_VOLUME = 0.5;
const FADE_SECONDS = 1.5;

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);
  const contextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const readyRef = useRef<Promise<void> | null>(null);

  function ensureStarted(): Promise<void> {
    if (!readyRef.current) {
      readyRef.current = (async () => {
        const ctx = new AudioContext();
        contextRef.current = ctx;

        const response = await fetch(TRACK_URL);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await ctx.decodeAudioData(arrayBuffer);

        const gain = ctx.createGain();
        gain.gain.value = 0;
        gain.connect(ctx.destination);
        gainRef.current = gain;

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(gain);
        source.start();

        // Best-effort: if the browser already grants autoplay for this page
        // (e.g. a returning visitor with a high media-engagement score), this
        // resumes immediately with no gesture needed. If blocked, it silently
        // stays suspended and the gesture listener below takes over.
        ctx.resume().catch(() => {});

        if (!mutedRef.current) {
          gain.gain.linearRampToValueAtTime(
            TARGET_VOLUME,
            ctx.currentTime + FADE_SECONDS,
          );
        }
      })();
    }
    return readyRef.current;
  }

  useEffect(() => {
    // Best-effort autoplay: prime and start the engine immediately on load.
    void ensureStarted();

    const gestureEvents = ["pointerdown", "keydown", "click", "touchend"] as const;

    function removeGestureListeners() {
      for (const eventName of gestureEvents) {
        window.removeEventListener(eventName, handleInteraction, true);
      }
    }

    // Browsers block audible playback until a user gesture. As soon as one
    // happens anywhere on the page, silently resume the already-primed
    // context so playback continues without needing a click on the icon.
    function handleInteraction() {
      const ctx = contextRef.current;
      if (!ctx) return;
      if (ctx.state === "running") {
        removeGestureListeners();
        return;
      }
      void ctx.resume().then(removeGestureListeners);
    }

    for (const eventName of gestureEvents) {
      // Capture phase: fires before any element in the tree can stop
      // propagation, so this always sees the very first gesture.
      window.addEventListener(eventName, handleInteraction, true);
    }

    return () => {
      for (const eventName of gestureEvents) {
        window.removeEventListener(eventName, handleInteraction, true);
      }
    };
  }, []);

  async function toggle() {
    const next = !mutedRef.current;
    mutedRef.current = next;
    setMuted(next);

    await ensureStarted();
    const ctx = contextRef.current;
    const gain = gainRef.current;
    if (!ctx || !gain) return;

    if (ctx.state !== "running") {
      void ctx.resume();
    }

    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(
      next ? 0 : TARGET_VOLUME,
      now + FADE_SECONDS,
    );
  }

  return (
    <BackgroundMusicContext.Provider value={{ muted, toggle }}>
      {children}
    </BackgroundMusicContext.Provider>
  );
}

export function useBackgroundMusic(): BackgroundMusicContextValue {
  const ctx = useContext(BackgroundMusicContext);
  if (!ctx) {
    throw new Error(
      "useBackgroundMusic must be used within a BackgroundMusicProvider",
    );
  }
  return ctx;
}
