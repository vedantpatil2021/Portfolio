/**
 * SkillsBackgroundStrip — icons travel along a custom SVG bezier path with rotation
 * To remove: delete this file + the import + <SkillsBackgroundStrip /> in Skills.tsx
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import AmazonwebservicesOriginalWordmark from "devicons-react/lib/icons/AmazonwebservicesOriginalWordmark";
import AzureOriginal from "devicons-react/lib/icons/AzureOriginal";
import TerraformOriginal from "devicons-react/lib/icons/TerraformOriginal";
import KubernetesOriginal from "devicons-react/lib/icons/KubernetesOriginal";
import DockerOriginal from "devicons-react/lib/icons/DockerOriginal";
import GithubactionsOriginal from "devicons-react/lib/icons/GithubactionsOriginal";
import JenkinsOriginal from "devicons-react/lib/icons/JenkinsOriginal";
import PrometheusOriginal from "devicons-react/lib/icons/PrometheusOriginal";
import GrafanaOriginal from "devicons-react/lib/icons/GrafanaOriginal";
import PythonOriginal from "devicons-react/lib/icons/PythonOriginal";
import JavascriptOriginal from "devicons-react/lib/icons/JavascriptOriginal";
import PostgresqlOriginal from "devicons-react/lib/icons/PostgresqlOriginal";
import MongodbOriginal from "devicons-react/lib/icons/MongodbOriginal";
import RedisOriginal from "devicons-react/lib/icons/RedisOriginal";
import ReactOriginal from "devicons-react/lib/icons/ReactOriginal";
import NodejsOriginal from "devicons-react/lib/icons/NodejsOriginal";
import FastapiOriginal from "devicons-react/lib/icons/FastapiOriginal";
import ArgocdOriginal from "devicons-react/lib/icons/ArgocdOriginal";
import HelmOriginal from "devicons-react/lib/icons/HelmOriginal";

gsap.registerPlugin(MotionPathPlugin);

const ICON_COMPONENTS = [
  AmazonwebservicesOriginalWordmark, AzureOriginal, TerraformOriginal,
  KubernetesOriginal, DockerOriginal, GithubactionsOriginal, JenkinsOriginal,
  PrometheusOriginal, GrafanaOriginal, PythonOriginal, JavascriptOriginal, PostgresqlOriginal, MongodbOriginal, RedisOriginal,
  ReactOriginal, NodejsOriginal, FastapiOriginal, ArgocdOriginal, HelmOriginal,
];

const MAX_COUNT = 44;
const DURATION = 24;
// Target gap (in real screen px) between icon centers along the path.
// Icons render at a fixed 20px size, so this must stay comfortably above
// that regardless of viewport width or the path's own coordinate scale.
const TARGET_SPACING_PX = 30;
const VIEWBOX_WIDTH = 1288;

const PATH_ID = "skills-motion-path";
const PATH_D =
  "M0.427917 215.881C65.0946 108.881 275.528 -73.0194 599.928 55.3806C924.328 183.781 1174.09 72.214 1258.43 0.38063";

export default function SkillsBackgroundStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const tweensRef = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function init() {
      if (!container) return;

      tweensRef.current.forEach((t) => t.kill());
      tweensRef.current = [];

      const W = container.offsetWidth || window.innerWidth;
      const pathEl = container.querySelector<SVGPathElement>(`#${PATH_ID}`);
      const pathLengthPx = pathEl ? pathEl.getTotalLength() * (W / VIEWBOX_WIDTH) : W;
      const count = Math.max(
        4,
        Math.min(MAX_COUNT, Math.floor(pathLengthPx / TARGET_SPACING_PX)),
      );

      iconsRef.current.forEach((el, i) => {
        if (!el) return;
        if (i >= count) {
          gsap.set(el, { autoAlpha: 0 });
          return;
        }
        gsap.set(el, { autoAlpha: 1 });
        const offset = i / count;
        const t = gsap.to(el, {
          motionPath: {
            path: `#${PATH_ID}`,
            align: `#${PATH_ID}`,
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
            start: offset,
            end: offset + 1,
          },
          duration: DURATION,
          ease: "none",
          repeat: -1,
        });
        tweensRef.current.push(t);
      });
    }

    init();

    const ro = new ResizeObserver(init);
    ro.observe(container);

    return () => {
      tweensRef.current.forEach((t) => t.kill());
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="skills-bg-strips" aria-hidden="true">
      <svg
        viewBox="-15 -60 1288 340"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id={PATH_ID}
          d={PATH_D}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0"
          className="text-ink"
        />
      </svg>

      {Array.from({ length: MAX_COUNT }, (_, i) => {
        const Icon = ICON_COMPONENTS[i % ICON_COMPONENTS.length];
        return (
          <span
            key={i}
            ref={(el) => { iconsRef.current[i] = el; }}
            className="icon-tile"
            style={{ position: "absolute", top: 0, left: 0, willChange: "transform" }}
          >
            <Icon size={20} />
          </span>
        );
      })}
    </div>
  );
}
