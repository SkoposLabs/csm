"use client";

import { useState } from "react";
import { useTheme } from "@/lib/contexts/theme-context";
import { ThemeName } from "@/types/theme";

export default function ThemeSwitcher() {
  const { themeName, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-switcher-container">
      {/* Toggle Button */}
      <button
        className="theme-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme selector"
      >
        CHANGE THEME {isOpen ? "▲" : "▼"}
      </button>

      {/* Theme Selector Panel */}
      {isOpen && (
        <div className="theme-switcher">
          <div className="theme-switcher-label">Theme:</div>
          <div className="theme-switcher-buttons">
            {availableThemes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  setTheme(theme.name);
                  setIsOpen(false);
                }}
                className={`theme-button ${
                  themeName === theme.name ? "active" : ""
                }`}
                aria-label={`Switch to ${theme.displayName} theme`}
              >
                {theme.displayName}
              </button>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .theme-switcher-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .theme-toggle-btn {
          background: var(--color-buttonBackground);
          color: var(--color-buttonText);
          border: 3px solid var(--color-panelBorder);
          padding: 12px 20px;
          cursor: pointer;
          font-family: var(--font-primary);
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all var(--transition-speed) var(--animation-timing);
          box-shadow: var(--box-shadow);
        }

        .theme-toggle-btn:hover {
          background: var(--color-buttonHover);
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.4);
        }

        .theme-toggle-btn:active {
          background: var(--color-buttonActive);
          transform: translate(1px, 1px);
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
        }

        .theme-switcher {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--color-panelBackground);
          border: var(--border-width) var(--border-style, solid)
            var(--color-panelBorder);
          padding: 12px 16px;
          box-shadow: var(--box-shadow);
          font-family: var(--font-primary);
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .theme-switcher-label {
          color: var(--color-textPrimary);
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
          text-shadow: var(--text-shadow);
        }

        .theme-switcher-buttons {
          display: flex;
          gap: 8px;
        }

        .theme-button {
          background: var(--color-buttonBackground);
          color: var(--color-buttonText);
          border: 2px solid var(--color-panelBorder);
          padding: 8px 16px;
          cursor: pointer;
          font-family: var(--font-primary);
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          transition: all var(--transition-speed) var(--animation-timing);
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
        }

        .theme-button:hover {
          background: var(--color-buttonHover);
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.3);
        }

        .theme-button:active {
          background: var(--color-buttonActive);
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
        }

        .theme-button.active {
          background: var(--color-accent2);
          color: var(--color-textPrimary);
          border-color: var(--color-accent1);
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          .theme-switcher-container {
            top: 10px;
            right: 10px;
          }

          .theme-toggle-btn {
            font-size: 12px;
            padding: 10px 16px;
          }

          .theme-switcher {
            flex-direction: column;
            gap: 8px;
            padding: 10px;
          }

          .theme-switcher-buttons {
            flex-direction: column;
            width: 100%;
          }

          .theme-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
