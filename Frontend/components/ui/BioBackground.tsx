"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle bioinformatics/forensics hero backdrop, drawn on a canvas:
 *  - a drifting "genomics network" of connected nodes
 *  - a slow DNA double-helix ribbon
 *  - faint scrolling ATCG sequence tickers (top & bottom)
 * Cyan/blue, low opacity, sits behind the hero text. Pure code (no assets).
 */
export default function BioBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const canvas = el; // non-null declared type, so nested closures keep the narrowing
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx = context;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = [];
    const NODE_COUNT = 44;

    const seq = "ACCAGTCAAGTTCAAAGTTGCAGGTTAGTCATGCAACGGAT";
    const seqLong = seq.repeat(10);

    function init() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodes.length === 0) {
        for (let i = 0; i < NODE_COUNT; i++) {
          nodes.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.22,
            vy: (Math.random() - 0.5) * 0.22,
          });
        }
      }
    }

    function strokePath(pts: Array<[number, number]>) {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.stroke();
    }

    function drawHelix(phase: number) {
      const cy = h * 0.5;
      const amp = Math.min(h * 0.17, 64);
      const waves = Math.max(5, w / 150);
      const steps = 64;
      const strandA: Array<[number, number]> = [];
      const strandB: Array<[number, number]> = [];
      for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * w;
        const ang = (i / steps) * Math.PI * 2 * waves + phase * 1.6;
        strandA.push([x, cy + Math.sin(ang) * amp]);
        strandB.push([x, cy + Math.sin(ang + Math.PI) * amp]);
      }
      // rungs (fade with depth for a 3D feel)
      ctx.lineWidth = 1;
      for (let i = 0; i <= steps; i += 2) {
        const depth = (Math.sin((i / steps) * Math.PI * 2 * waves + phase * 1.6) + 1) / 2;
        ctx.strokeStyle = `rgba(56,189,248,${0.04 + depth * 0.09})`;
        ctx.beginPath();
        ctx.moveTo(strandA[i][0], strandA[i][1]);
        ctx.lineTo(strandB[i][0], strandB[i][1]);
        ctx.stroke();
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(34,211,238,0.15)";
      strokePath(strandA);
      ctx.strokeStyle = "rgba(59,130,246,0.15)";
      strokePath(strandB);
    }

    let t = 0;
    function frame() {
      t += 0.006;
      ctx.clearRect(0, 0, w, h);

      // genomics network
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      const maxDist = Math.min(165, w * 0.17);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxDist) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / maxDist) * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = "rgba(34,211,238,0.45)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }

      drawHelix(t);

      // faint scrolling sequence tickers
      ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillStyle = "rgba(56,189,248,0.06)";
      const unit = ctx.measureText(seq).width;
      const off = (t * 26) % unit;
      ctx.fillText(seqLong, -off, 22);
      ctx.fillText(seqLong, -unit + off, h - 12);

      if (!reduce) raf = requestAnimationFrame(frame);
    }

    init();
    if (reduce) frame();
    else raf = requestAnimationFrame(frame);

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      init();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
