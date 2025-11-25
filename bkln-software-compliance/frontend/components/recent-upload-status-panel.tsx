"use client";

import { useState, useMemo } from "react";
import { useStats, useApplications, useDevices } from "@/lib/hooks/use-api";

export default function RecentUploadStatusPanel() {
  const { data: stats, loading, error } = useStats();
  const { applications } = useApplications();
  const { devices } = useDevices();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get unidentified applications with their devices
  const unidentifiedAppsWithDevices = useMemo(() => {
    const unidentifiedApps = applications.filter(
      (app) => app.status.name === "unidentified"
    );

    const result = unidentifiedApps.flatMap((app) => {
      const devicesWithApp = devices.filter((device) =>
        device.applications?.some(
          (installation) => installation.application.uuid === app.uuid
        )
      );

      return devicesWithApp.map((device) => {
        const installation = device.applications?.find(
          (inst) => inst.application.uuid === app.uuid
        );
        return {
          appName: app.name,
          appVersion: installation?.version || "Unknown",
          deviceSerial: device.serialNumber,
          deviceOwner: device.ownerName,
        };
      });
    });

    return result;
  }, [applications, devices]);

  // Pagination
  const totalPages = Math.ceil(unidentifiedAppsWithDevices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = unidentifiedAppsWithDevices.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="panel widget-small">
        <div className="panel-header">📊 Recent Upload Status</div>
        <div className="panel-body">
          <div className="loading">Loading stats...</div>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="panel widget-small">
        <div className="panel-header">📊 Recent Upload Status</div>
        <div className="panel-body">
          <div className="error">Error loading stats</div>
        </div>
      </div>
    );
  }

  const isHealthy = stats.unidentifiedCount === 0;
  const mostRecentFile = stats.mostRecentFile;

  return (
    <div className="panel widget-small">
      <div className="panel-header">📊 Recent Upload Status</div>

      <div className="panel-body">
        {/* Status Indicator */}
        <div className={`status-indicator ${isHealthy ? "healthy" : "alert"}`}>
          <div className="status-icon">{isHealthy ? "✓" : "⚠"}</div>
          <div className="status-message">
            {isHealthy ? (
              <span className="status-good">0 Unidentified Applications</span>
            ) : (
              <span className="status-bad">
                {stats.unidentifiedCount} Unidentified Application
                {stats.unidentifiedCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Recent Upload Info */}
        {mostRecentFile && (
          <div className="upload-info">
            <h4>Most Recent Upload</h4>
            <div className="info-row">
              <span className="info-label">Date:</span>
              <span className="info-value">
                {new Date(mostRecentFile.uploadDate).toLocaleString()}
              </span>
            </div>
            {mostRecentFile.device && (
              <>
                <div className="info-row">
                  <span className="info-label">Device:</span>
                  <span className="info-value">
                    {mostRecentFile.device.serialNumber}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Owner:</span>
                  <span className="info-value">
                    {mostRecentFile.device.ownerName}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-value">{stats.totalApplications}</div>
            <div className="stat-label">Total Apps</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.totalDevices}</div>
            <div className="stat-label">Devices</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats.whitelistedCount}</div>
            <div className="stat-label">Whitelisted</div>
          </div>
        </div>

        {/* Unidentified Applications Table */}
        {!isHealthy && unidentifiedAppsWithDevices.length > 0 && (
          <div className="unidentified-table-container">
            <h4 className="table-title">Unidentified Applications Details</h4>
            <div className="table-wrapper">
              <table className="unidentified-table">
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Device</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, idx) => (
                    <tr key={`${item.deviceSerial}-${item.appName}-${idx}`}>
                      <td className="app-name-cell">{item.appName}</td>
                      <td className="serial-cell">{item.deviceSerial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  ◀ Prev
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next ▶
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .panel-body {
          padding: 20px;
        }

        .status-indicator {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border: 3px solid;
          margin-bottom: 20px;
          background: rgba(0, 0, 0, 0.2);
        }

        .status-indicator.healthy {
          border-color: var(--color-success);
        }

        .status-indicator.alert {
          border-color: var(--color-error);
          animation: pulse-border 2s ease-in-out infinite;
        }

        .status-icon {
          font-size: 48px;
          line-height: 1;
        }

        .status-indicator.healthy .status-icon {
          color: var(--color-success);
        }

        .status-indicator.alert .status-icon {
          color: var(--color-error);
          animation: pulse 2s ease-in-out infinite;
        }

        .status-message {
          flex: 1;
          font-size: 18px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .status-good {
          color: var(--color-success);
          text-shadow: 0 0 10px var(--color-success);
        }

        .status-bad {
          color: var(--color-error);
          text-shadow: 0 0 10px var(--color-error);
        }

        .upload-info {
          margin-bottom: 20px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid var(--color-panelBorder);
        }

        .upload-info h4 {
          margin: 0 0 12px 0;
          color: var(--color-textPrimary);
          font-size: 14px;
          text-transform: uppercase;
          border-bottom: 2px solid var(--color-panelBorder);
          padding-bottom: 8px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          font-size: 14px;
        }

        .info-label {
          color: var(--color-textSecondary);
          font-weight: bold;
        }

        .info-value {
          color: var(--color-textPrimary);
          text-align: right;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .stat-item {
          text-align: center;
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid var(--color-panelBorder);
        }

        .stat-value {
          font-size: 32px;
          font-weight: bold;
          color: var(--color-accent2);
          text-shadow: 0 0 8px var(--color-accent2);
          line-height: 1;
        }

        .stat-label {
          font-size: 11px;
          color: var(--color-textSecondary);
          text-transform: uppercase;
          margin-top: 4px;
          letter-spacing: 1px;
        }

        .loading,
        .error {
          padding: 40px 20px;
          text-align: center;
          font-size: 16px;
        }

        .error {
          color: var(--color-error);
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes pulse-border {
          0%,
          100% {
            border-color: var(--color-error);
            box-shadow: 0 0 0 rgba(255, 0, 85, 0.5);
          }
          50% {
            border-color: var(--color-error);
            box-shadow: 0 0 20px var(--color-error);
          }
        }

        .unidentified-table-container {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px solid var(--color-panelBorder);
        }

        .table-title {
          margin: 0 0 12px 0;
          color: var(--color-textPrimary);
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .table-wrapper {
          overflow-x: auto;
          background: rgba(0, 0, 0, 0.3);
          border: 2px solid var(--color-panelBorder);
        }

        .unidentified-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .unidentified-table thead {
          background: var(--color-panelHeaderBackground);
        }

        .unidentified-table th {
          padding: 12px;
          text-align: left;
          color: var(--color-textPrimary);
          font-weight: bold;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1px;
          border-bottom: 2px solid var(--color-panelBorder);
        }

        .unidentified-table td {
          padding: 12px;
          color: var(--color-textPrimary);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .unidentified-table tbody tr:hover {
          background: rgba(255, 0, 85, 0.1);
        }

        .unidentified-table tbody tr:last-child td {
          border-bottom: none;
        }

        .app-name-cell {
          font-weight: bold;
          color: var(--color-error);
        }

        .serial-cell {
          font-family: var(--font-mono);
          font-size: 13px;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding: 12px;
          background: rgba(0, 0, 0, 0.2);
          border: 2px solid var(--color-panelBorder);
        }

        .page-btn {
          background: var(--color-buttonBackground);
          color: var(--color-buttonText);
          border: 2px solid var(--color-panelBorder);
          padding: 8px 16px;
          cursor: pointer;
          font-family: var(--font-primary);
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          transition: all var(--transition-speed);
        }

        .page-btn:hover:not(:disabled) {
          background: var(--color-buttonHover);
          transform: translateY(-2px);
        }

        .page-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .page-info {
          color: var(--color-textPrimary);
          font-weight: bold;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .status-indicator {
            flex-direction: column;
            text-align: center;
          }

          .quick-stats {
            grid-template-columns: 1fr;
          }

          .unidentified-table {
            font-size: 12px;
          }

          .unidentified-table th,
          .unidentified-table td {
            padding: 8px 6px;
          }

          .pagination {
            flex-direction: column;
            gap: 12px;
          }

          .page-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
