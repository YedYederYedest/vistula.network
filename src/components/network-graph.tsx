"use client";

import { useEffect, useRef, useMemo } from "react";
import { members, getConnections } from "@/data/students";

interface NodePos {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  profilePic?: string;
  img?: HTMLImageElement;
}

const NODE_RADIUS = 18;
const REPULSION = 3500;
const ATTRACTION = 0.012;
const DAMPING = 0.82;
const CENTER_PULL = 0.004;

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<NodePos[]>([]);
  const frameRef = useRef<number>(0);
  const connections = useMemo(() => getConnections(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    nodesRef.current = members.map((m) => ({
      id: m.id,
      x: W / 2 + (Math.random() - 0.5) * W * 0.6,
      y: H / 2 + (Math.random() - 0.5) * H * 0.6,
      vx: 0,
      vy: 0,
      profilePic: m.profilePic,
    }));

    nodesRef.current.forEach((node) => {
      if (node.profilePic) {
        const img = new Image();
        img.src = node.profilePic;
        img.onload = () => { node.img = img; };
      }
    });

    const simulate = () => {
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = REPULSION / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          nodes[i].vx -= fx;
          nodes[i].vy -= fy;
          nodes[j].vx += fx;
          nodes[j].vy += fy;
        }
      }

      connections.forEach(({ fromId, toId }) => {
        const a = nodes.find((n) => n.id === fromId);
        const b = nodes.find((n) => n.id === toId);
        if (!a || !b) return;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        a.vx += dx * ATTRACTION;
        a.vy += dy * ATTRACTION;
        b.vx -= dx * ATTRACTION;
        b.vy -= dy * ATTRACTION;
      });

      nodes.forEach((n) => {
        n.vx += (W / 2 - n.x) * CENTER_PULL;
        n.vy += (H / 2 - n.y) * CENTER_PULL;
        n.vx *= DAMPING;
        n.vy *= DAMPING;
        n.x = Math.max(NODE_RADIUS, Math.min(W - NODE_RADIUS, n.x + n.vx));
        n.y = Math.max(NODE_RADIUS, Math.min(H - NODE_RADIUS, n.y + n.vy));
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const nodes = nodesRef.current;

      connections.forEach(({ fromId, toId }) => {
        const a = nodes.find((n) => n.id === fromId);
        const b = nodes.find((n) => n.id === toId);
        if (!a || !b) return;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "rgba(255,255,255,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      nodes.forEach((node) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.closePath();

        if (node.img) {
          ctx.clip();
          ctx.filter = "grayscale(100%) brightness(0.75)";
          ctx.drawImage(
            node.img,
            node.x - NODE_RADIUS,
            node.y - NODE_RADIUS,
            NODE_RADIUS * 2,
            NODE_RADIUS * 2
          );
          ctx.filter = "none";
        } else {
          ctx.fillStyle = "#2a2a2a";
          ctx.fill();
        }

        ctx.restore();

        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    };

    const tick = () => {
      simulate();
      draw();
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [connections]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}
