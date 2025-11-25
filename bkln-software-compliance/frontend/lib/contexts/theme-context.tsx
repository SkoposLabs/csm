"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, ThemeName, THEMES } from "@/types/theme";

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "bkln-software-compliance-app-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>("vaporwave");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName;
    if (stored && THEMES[stored]) {
      setThemeName(stored);
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(THEME_STORAGE_KEY, themeName);
      applyThemeToDocument(THEMES[themeName]);
    }
  }, [themeName, mounted]);

  const theme = THEMES[themeName];
  const availableThemes = Object.values(THEMES);

  const value: ThemeContextType = {
    theme,
    themeName,
    setTheme: setThemeName,
    availableThemes,
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Apply theme CSS variables to document
function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;

  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply font variables
  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });

  // Apply effect variables
  root.style.setProperty(
    "--transition-speed",
    theme.effects.transitionSpeed
  );
  root.style.setProperty(
    "--animation-timing",
    theme.effects.animationTiming
  );
  root.style.setProperty("--border-width", theme.effects.borderWidth);
  root.style.setProperty("--border-radius", theme.effects.borderRadius);
  root.style.setProperty("--box-shadow", theme.effects.boxShadow);

  if (theme.effects.textShadow) {
    root.style.setProperty("--text-shadow", theme.effects.textShadow);
  }

  if (theme.effects.backdropBlur) {
    root.style.setProperty("--backdrop-blur", theme.effects.backdropBlur);
  }

  // Add special classes for effects
  root.classList.toggle("theme-glow", theme.effects.glow);
  root.classList.toggle("theme-scanlines", theme.effects.scanlines);
  root.classList.toggle("theme-pixelated", theme.effects.pixelated);
  root.classList.toggle("theme-animated", theme.effects.animated);

  // Set font family on body
  document.body.style.fontFamily = theme.fonts.primary;
}
