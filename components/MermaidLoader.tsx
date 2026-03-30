'use client';

import { useEffect } from 'react';
import mermaid from 'mermaid';

export default function MermaidLoader() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#ffffff',
        primaryTextColor: '#1a1a1a',
        primaryBorderColor: '#1a1a1a',
        lineColor: '#1a1a1a',
        secondaryColor: '#f9f9f9',
        tertiaryColor: '#ffffff',
        fontSize: '14px',
        fontFamily: 'monospace'
      },
      securityLevel: 'loose',
    });

    // Run mermaid on any untyped mermaid divs
    mermaid.run();
  }, []);

  return null;
}
