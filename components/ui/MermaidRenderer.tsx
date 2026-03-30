"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidRendererProps {
  chart: string;
}

export function MermaidRenderer({ chart }: MermaidRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        themeVariables: {
          primaryColor: "#ffffff",
          primaryTextColor: "#1a1a1a",
          primaryBorderColor: "#1a1a1a",
          lineColor: "#1a1a1a",
          secondaryColor: "#f9f9f9",
          tertiaryColor: "#ffffff",
          fontSize: "14px",
          fontFamily: "monospace",
        },
        securityLevel: "loose",
      });

      const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
      mermaid.render(uniqueId, chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      }).catch(err => {
         console.error("Mermaid parsing error:", err);
      });
    }
  }, [chart]);

  return <div className="mermaid" ref={ref} />;
}
