import { useEffect, useRef } from "react";

// Served from public/ at the site root.
const fortressUrl = "/fortress.webp";

/**
 * Hero key visual: a static ASCII "sky fortress" image with a canvas particle
 * overlay (falling debris + sparkles) spawning along the island's underside.
 * Ported from docs/floating_ascii_fortress_animation_v2.html.
 *
 * Respects prefers-reduced-motion: no falling debris, only a few soft static
 * glints (the prototype's "paused" state).
 */
export default function FloatingFortress() {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!stage || !img || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let sparkles: Spark[] = [];
    let raf = 0;
    let previous = performance.now();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // The art never moves. Particles begin on the island's lower silhouette,
    // given as normalized (0..1) points of the image.
    function islandUndersideY(xn: number) {
      const pts = [
        [0.09, 0.555],
        [0.14, 0.605],
        [0.2, 0.685],
        [0.28, 0.755],
        [0.36, 0.805],
        [0.43, 0.855],
        [0.5, 0.915],
        [0.57, 0.855],
        [0.64, 0.805],
        [0.72, 0.755],
        [0.8, 0.685],
        [0.86, 0.605],
        [0.91, 0.555],
      ];
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        if (xn >= a[0] && xn <= b[0]) {
          const f = (xn - a[0]) / (b[0] - a[0]);
          return a[1] + (b[1] - a[1]) * f;
        }
      }
      return 0.57;
    }

    function makeParticle(): Particle {
      const xn = rand(0.105, 0.895);
      return {
        x: xn * W,
        y: islandUndersideY(xn) * H + rand(-2, 3),
        vx: rand(-4, 4),
        vy: rand(22, 68),
        size: rand(1, 3),
        rot: rand(0, 6.28),
        spin: rand(-1.5, 1.5),
        life: 0,
        max: rand(2.0, 4.4),
        kind: Math.random() < 0.72 ? "debris" : "glint",
        tone: Math.random(),
      };
    }

    function makeSpark(): Spark {
      const xn = rand(0.11, 0.89);
      return {
        x: xn * W,
        y: islandUndersideY(xn) * H + rand(0, 18),
        phase: rand(0, 6.28),
        speed: rand(0.7, 2),
        size: rand(1, 3.2),
        life: rand(0, 1),
      };
    }

    function resize() {
      const r = stage!.getBoundingClientRect();
      W = r.width;
      H = r.height;
      if (!W || !H) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = [];
      sparkles = [];
      const count = Math.max(18, Math.round(W / 24));
      for (let i = 0; i < count; i++) particles.push(makeParticle());
      for (let i = 0; i < Math.max(24, Math.round(W / 18)); i++)
        sparkles.push(makeSpark());
    }

    function drawSpark(p: Spark, t: number) {
      const pulse = (Math.sin(t * p.speed + p.phase) + 1) / 2;
      if (pulse < 0.76) return;
      const alpha = (pulse - 0.76) * 2.8;
      ctx!.save();
      ctx!.globalAlpha = Math.min(0.9, alpha);
      ctx!.strokeStyle = p.phase % 2 ? "#77bfd2" : "#c4a27e";
      ctx!.lineWidth = 0.8;
      const r = p.size * (0.7 + pulse);
      ctx!.beginPath();
      ctx!.moveTo(p.x - r * 2, p.y);
      ctx!.lineTo(p.x + r * 2, p.y);
      ctx!.moveTo(p.x, p.y - r * 2);
      ctx!.lineTo(p.x, p.y + r * 2);
      if (p.size > 2) {
        ctx!.moveTo(p.x - r, p.y - r);
        ctx!.lineTo(p.x + r, p.y + r);
        ctx!.moveTo(p.x + r, p.y - r);
        ctx!.lineTo(p.x - r, p.y + r);
      }
      ctx!.stroke();
      ctx!.restore();
    }

    function drawParticle(p: Particle, dt: number) {
      p.life += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.spin * dt;
      if (p.life > p.max || p.y > H + 12 || p.x < -20 || p.x > W + 20) {
        Object.assign(p, makeParticle());
        return;
      }
      const fade = Math.min(1, p.life * 2, (p.max - p.life) * 1.8);
      ctx!.save();
      ctx!.globalAlpha = Math.max(0, fade) * (p.kind === "glint" ? 0.75 : 0.7);
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      if (p.kind === "debris") {
        ctx!.strokeStyle = p.tone > 0.65 ? "#8aa0a7" : "#aab7bb";
        ctx!.lineWidth = 0.8;
        ctx!.beginPath();
        ctx!.moveTo(-p.size * 1.8, -p.size * 0.6);
        ctx!.lineTo(p.size * 1.4, -p.size);
        ctx!.lineTo(p.size * 1.1, p.size * 0.8);
        ctx!.lineTo(-p.size, p.size * 1.1);
        ctx!.closePath();
        ctx!.stroke();
        if (p.size > 2) {
          ctx!.fillStyle = "#d8e0e2";
          ctx!.fill();
        }
      } else {
        ctx!.strokeStyle = "#75b8ca";
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(-p.size * 2, 0);
        ctx!.lineTo(p.size * 2, 0);
        ctx!.moveTo(0, -p.size * 2);
        ctx!.lineTo(0, p.size * 2);
        ctx!.stroke();
        ctx!.fillStyle = "#9dcbd6";
        ctx!.fillRect(-0.7, -0.7, 1.4, 1.4);
      }
      ctx!.restore();
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (!W || !H) return;
      const dt = Math.min(0.04, (now - previous) / 1000);
      previous = now;
      ctx!.clearRect(0, 0, W, H);
      if (!reduce) {
        for (const p of particles) drawParticle(p, dt);
        for (const p of sparkles) {
          p.life += dt;
          drawSpark(p, now * 0.001 + p.life * 0.2);
        }
      } else {
        // A few soft static glints only.
        for (const p of sparkles.slice(0, 8)) drawSpark(p, now * 0.001);
      }
    }

    const ro =
      "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(stage);
    else window.addEventListener("resize", resize);

    const onLoad = () => resize();
    img.addEventListener("load", onLoad);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      img.removeEventListener("load", onLoad);
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <figure
      aria-label="ASCII art of a floating city fortress"
      className="static lg:absolute lg:right-[-40px] lg:top-[-40px] z-0 m-0 flex flex-col gap-2 w-full lg:w-[620px] max-w-full"
    >
      <div ref={stageRef} className="relative leading-none">
        <img
          ref={imgRef}
          src={fortressUrl}
          alt="Detailed ASCII art of a floating futuristic city"
          className="block w-full h-auto select-none"
          draggable={false}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
    </figure>
  );
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  life: number;
  max: number;
  kind: "debris" | "glint";
  tone: number;
}

interface Spark {
  x: number;
  y: number;
  phase: number;
  speed: number;
  size: number;
  life: number;
}
