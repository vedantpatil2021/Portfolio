import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";
import { useBackgroundMusic } from "../../lib/backgroundMusic";

export function BackgroundMusicToggle() {
  const { muted, toggle } = useBackgroundMusic();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Unmute background music" : "Mute background music"}
      className="fixed bottom-6 left-6 z-40 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-hairline bg-canvas/90 text-ink shadow-lg backdrop-blur-md transition-colors duration-200 hover:bg-surface-tint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      {muted ? <SpeakerSlashIcon size={18} /> : <SpeakerHighIcon size={18} />}
    </button>
  );
}
