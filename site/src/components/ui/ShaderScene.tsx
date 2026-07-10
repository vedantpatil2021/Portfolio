import { GrainGradient, ImageDithering, MeshGradient } from "@paper-design/shaders-react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "../../lib/theme";
import type { ShaderVariant } from "./ShaderPanel";
import vedantImg from "../../../assets/vedant-img.png";

const LIGHT_COLORS = ["#FAFAF9", "#FFEDD5", "#FDBA74", "#C2410C"];
const DARK_COLORS = ["#0C0A09", "#292524", "#7C2D12", "#FB923C"];

export default function ShaderScene({ variant }: { variant: ShaderVariant }) {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const colors = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;
  const speed = shouldReduceMotion ? 0 : 0.2;

  if (variant === "photo") {
    return (
      <ImageDithering
        className="h-full w-full"
        image={vedantImg}
        fit="cover"
        colorBack={theme === "dark" ? DARK_COLORS[0] : LIGHT_COLORS[1]}
        colorFront={theme === "dark" ? DARK_COLORS[3] : "#292524"}
        colorHighlight={theme === "dark" ? DARK_COLORS[2] : LIGHT_COLORS[3]}
        colorSteps={5}
        type="8x8"
        size={1.5}
        speed={0}
      />
    );
  }

  if (variant === "hero" || variant === "portrait") {
    return (
      <MeshGradient
        className="h-full w-full"
        colors={colors}
        distortion={0.85}
        swirl={0.3}
        speed={speed}
      />
    );
  }

  return (
    <GrainGradient
      className="h-full w-full"
      colorBack={colors[0]}
      colors={colors.slice(1)}
      shape={variant === "project-a" ? "wave" : "ripple"}
      softness={0.6}
      intensity={0.4}
      speed={speed}
    />
  );
}
