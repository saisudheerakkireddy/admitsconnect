/// <reference types="vite/client" />

// SVG imports as React components
declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// Regular SVG imports as URLs
declare module '*.svg' {
  const content: string;
  export default content;
}

