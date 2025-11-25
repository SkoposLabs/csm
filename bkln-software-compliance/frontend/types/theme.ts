// Theme types for retro/vaporwave styling

export type ThemeName = "vaporwave" | "space-odyssey" | "geocities";

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  effects: ThemeEffects;
}

export interface ThemeColors {
  // Background colors
  background: string;
  backgroundSecondary: string;
  backgroundPattern?: string; // For textures/patterns

  // Panel/Card colors
  panelBackground: string;
  panelBorder: string;
  panelShadow: string;
  panelHeaderBackground: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textAccent: string;

  // Interactive elements
  buttonBackground: string;
  buttonText: string;
  buttonHover: string;
  buttonActive: string;

  // Status colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Accent colors (for highlights, borders, etc.)
  accent1: string;
  accent2: string;
  accent3: string;
  accent4: string;
}

export interface ThemeFonts {
  primary: string; // Main font family
  secondary: string; // Secondary font family
  mono: string; // Monospace font
  heading: string; // Font for headings
}

export interface ThemeEffects {
  // Visual effects
  glow: boolean;
  scanlines: boolean;
  pixelated: boolean;
  animated: boolean;

  // Animation settings
  transitionSpeed: string; // e.g., "0.3s"
  animationTiming: string; // e.g., "ease-in-out"

  // Border styles
  borderWidth: string;
  borderRadius: string;
  borderStyle: "solid" | "dashed" | "dotted" | "double" | "groove" | "ridge";

  // Shadow effects
  boxShadow: string;
  textShadow?: string;

  // Other effects
  backdropBlur?: string;
  gradient?: string;
}

// Predefined themes
export const THEMES: Record<ThemeName, Theme> = {
  vaporwave: {
    name: "vaporwave",
    displayName: "Vaporwave Dream",
    colors: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      backgroundSecondary: "#764ba2",
      panelBackground: "#ff6ec7",
      panelBorder: "#00d9ff",
      panelShadow: "0 8px 32px rgba(255, 110, 199, 0.4)",
      panelHeaderBackground: "#ff4da6",
      textPrimary: "#ffffff",
      textSecondary: "#e0e0ff",
      textAccent: "#00ffff",
      buttonBackground: "#00d9ff",
      buttonText: "#1a0033",
      buttonHover: "#00ffff",
      buttonActive: "#00b8d4",
      success: "#00ff88",
      warning: "#ffaa00",
      error: "#ff0055",
      info: "#00d9ff",
      accent1: "#ff6ec7",
      accent2: "#00d9ff",
      accent3: "#b388ff",
      accent4: "#ff4da6",
    },
    fonts: {
      primary: "'Courier New', 'Courier', monospace",
      secondary: "'Arial', sans-serif",
      mono: "'Courier New', monospace",
      heading: "'Impact', 'Arial Black', sans-serif",
    },
    effects: {
      glow: true,
      scanlines: false,
      pixelated: false,
      animated: true,
      transitionSpeed: "0.3s",
      animationTiming: "ease-in-out",
      borderWidth: "3px",
      borderRadius: "0px",
      borderStyle: "solid",
      boxShadow: "5px 5px 0px rgba(0, 0, 0, 0.3)",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
      backdropBlur: "8px",
    },
  },
  "space-odyssey": {
    name: "space-odyssey",
    displayName: "Space Odyssey",
    colors: {
      background: "#000000",
      backgroundSecondary: "#0a0a0a",
      backgroundPattern: "radial-gradient(white 1px, transparent 1px)",
      panelBackground: "rgba(10, 10, 30, 0.8)",
      panelBorder: "#00ff00",
      panelShadow: "0 0 20px rgba(0, 255, 0, 0.5)",
      panelHeaderBackground: "#001a00",
      textPrimary: "#00ff00",
      textSecondary: "#00cc00",
      textAccent: "#ffff00",
      buttonBackground: "#ff6600",
      buttonText: "#000000",
      buttonHover: "#ff8800",
      buttonActive: "#cc5500",
      success: "#00ff00",
      warning: "#ffff00",
      error: "#ff0000",
      info: "#00ccff",
      accent1: "#ff6600",
      accent2: "#00ff00",
      accent3: "#0099ff",
      accent4: "#ff00ff",
    },
    fonts: {
      primary: "'Orbitron', 'Courier New', monospace",
      secondary: "'Orbitron', sans-serif",
      mono: "'Space Mono', monospace",
      heading: "'Orbitron', 'Impact', sans-serif",
    },
    effects: {
      glow: true,
      scanlines: false,
      pixelated: false,
      animated: true,
      transitionSpeed: "0.4s",
      animationTiming: "ease-out",
      borderWidth: "2px",
      borderRadius: "8px",
      borderStyle: "solid",
      boxShadow: "0 0 20px currentColor",
      textShadow: "0 0 10px currentColor",
    },
  },
  geocities: {
    name: "geocities",
    displayName: "Geocities Classic",
    colors: {
      background: "#00ffff",
      backgroundSecondary: "#ffff00",
      panelBackground: "#ffffff",
      panelBorder: "#ff00ff",
      panelShadow: "5px 5px 0px #000000",
      panelHeaderBackground: "#ff0000",
      textPrimary: "#000000",
      textSecondary: "#333333",
      textAccent: "#ff00ff",
      buttonBackground: "#ff0000",
      buttonText: "#ffff00",
      buttonHover: "#cc0000",
      buttonActive: "#990000",
      success: "#00ff00",
      warning: "#ffff00",
      error: "#ff0000",
      info: "#0000ff",
      accent1: "#ff0000",
      accent2: "#00ff00",
      accent3: "#0000ff",
      accent4: "#ff00ff",
    },
    fonts: {
      primary: "'Comic Sans MS', 'Chalkboard', cursive",
      secondary: "'Arial', sans-serif",
      mono: "'Courier New', monospace",
      heading: "'Impact', 'Arial Black', sans-serif",
    },
    effects: {
      glow: false,
      scanlines: false,
      pixelated: true,
      animated: true,
      transitionSpeed: "0.2s",
      animationTiming: "linear",
      borderWidth: "4px",
      borderRadius: "0px",
      borderStyle: "ridge",
      boxShadow: "5px 5px 0px #000000",
      textShadow: "2px 2px 0px #ffffff",
    },
  },
};
