"use client";

import ThemeSwitcher from "./theme-switcher";
import CursorSparkles from "./cursor-sparkles";

export default function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <CursorSparkles />
      <ThemeSwitcher />

      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">
            <span className="title-icon">⚡</span>
            BKLN
            <span className="title-subtitle">Application Monitor</span>
          </h1>
          <p className="header-tagline">
            Internal Application Compliance
          </p>
        </div>
      </header>

      <main className="dashboard-main">{children}</main>

      <footer className="dashboard-footer">
        <p>BKLN v1.0.0 | made with ❤️ by bkln-core-eng</p>
      </footer>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .dashboard-header {
          background: var(--color-panelBackground);
          border-bottom: var(--border-width) solid var(--color-panelBorder);
          box-shadow: var(--box-shadow);
          padding: 24px 32px;
          position: relative;
          z-index: 100;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-title {
          font-size: 48px;
          font-weight: bold;
          color: var(--color-textPrimary);
          text-transform: uppercase;
          letter-spacing: 4px;
          margin: 0;
          text-shadow: var(--text-shadow);
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .title-icon {
          font-size: 56px;
          animation: pulse 2s ease-in-out infinite;
        }

        .title-subtitle {
          font-size: 18px;
          color: var(--color-textSecondary);
          letter-spacing: 2px;
          margin-left: 8px;
        }

        .header-tagline {
          font-size: 14px;
          color: var(--color-textSecondary);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 8px 0 0 0;
          font-family: var(--font-secondary);
        }

        .dashboard-main {
          flex: 1;
          padding: 32px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
        }

        .dashboard-footer {
          background: var(--color-panelBackground);
          border-top: var(--border-width) solid var(--color-panelBorder);
          padding: 16px 32px;
          text-align: center;
          color: var(--color-textSecondary);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @media (max-width: 768px) {
          .dashboard-header {
            padding: 16px 20px;
          }

          .header-title {
            font-size: 32px;
            letter-spacing: 2px;
          }

          .title-icon {
            font-size: 40px;
          }

          .title-subtitle {
            font-size: 14px;
            width: 100%;
            margin-left: 0;
          }

          .header-tagline {
            font-size: 12px;
          }

          .dashboard-main {
            padding: 20px 16px;
          }

          .dashboard-footer {
            padding: 12px 20px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
