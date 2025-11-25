"use client";

import { useState, useMemo } from "react";
import { useApplications, useUpdateApplicationStatus } from "@/lib/hooks/use-api";
import { StatusType, Application } from "@/types";

export default function WhitelistedSoftwarePanel() {
  const { applications, loading, error, refetch } = useApplications();
  const { updateStatus, loading: updating } = useUpdateApplicationStatus();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusType | "all">("all");
  const [sortBy, setSortBy] = useState<"name" | "status">("name");

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = applications.filter((app) => {
      const matchesSearch = app.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || app.status.name === filterStatus;
      return matchesSearch && matchesFilter;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return a.status.name.localeCompare(b.status.name);
      }
    });

    return filtered;
  }, [applications, searchTerm, filterStatus, sortBy]);

  const handleStatusChange = async (appUuid: string, newStatus: StatusType) => {
    try {
      await updateStatus(appUuid, newStatus);
      await refetch();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (loading) {
    return (
      <div className="panel widget-large">
        <div className="panel-header">📋 Whitelisted Software</div>
        <div className="panel-body">
          <div className="loading">Loading applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="panel widget-large">
        <div className="panel-header">📋 Whitelisted Software</div>
        <div className="panel-body">
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="panel widget-large">
      <div className="panel-header">📋 Global Software Search</div>

      <div className="panel-body">
        {/* Controls */}
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <label className="filter-label">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as StatusType | "all")}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="whitelisted">Whitelisted</option>
              <option value="unidentified">Unidentified</option>
              <option value="flagged">Flagged</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
            </select>

            <label className="filter-label">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "status")}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Application List */}
        <div className="app-list">
          {filteredApplications.length === 0 ? (
            <div className="no-results">
              No applications found matching your criteria.
            </div>
          ) : (
            filteredApplications.map((app) => (
              <ApplicationCard
                key={app.uuid}
                application={app}
                onStatusChange={handleStatusChange}
                updating={updating}
              />
            ))
          )}
        </div>

        {/* Stats */}
        <div className="stats">
          <span>
            Showing {filteredApplications.length} of {applications.length} applications
          </span>
        </div>
      </div>

      <style jsx>{`
        .panel-body {
          padding: 0;
        }

        .controls {
          padding: 20px;
          background: var(--color-panelHeaderBackground);
          border-bottom: var(--border-width) solid var(--color-panelBorder);
        }

        .search-box {
          margin-bottom: 16px;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px;
          background: var(--color-background);
          border: 2px solid var(--color-panelBorder);
          color: var(--color-textPrimary);
          font-family: var(--font-primary);
          font-size: 16px;
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--color-accent2);
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.3),
            0 0 8px var(--color-accent2);
        }

        .filters {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }

        .filter-label {
          color: var(--color-textPrimary);
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
        }

        .filter-select {
          padding: 8px 12px;
          background: var(--color-buttonBackground);
          color: var(--color-buttonText);
          border: 2px solid var(--color-panelBorder);
          font-family: var(--font-primary);
          font-weight: bold;
          cursor: pointer;
          font-size: 14px;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--color-accent2);
        }

        .app-list {
          max-height: 500px;
          overflow-y: auto;
        }

        .no-results {
          padding: 40px 20px;
          text-align: center;
          color: var(--color-textSecondary);
          font-size: 16px;
        }

        .stats {
          padding: 12px 20px;
          background: var(--color-panelHeaderBackground);
          border-top: var(--border-width) solid var(--color-panelBorder);
          color: var(--color-textSecondary);
          font-size: 14px;
          text-align: right;
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

        @media (max-width: 768px) {
          .filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-select {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Application Card Component
function ApplicationCard({
  application,
  onStatusChange,
  updating,
}: {
  application: Application;
  onStatusChange: (uuid: string, status: StatusType) => void;
  updating: boolean;
}) {
  const [showVersions, setShowVersions] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<StatusType>(
    application.status.name
  );

  const handleStatusUpdate = () => {
    if (selectedStatus !== application.status.name) {
      onStatusChange(application.uuid, selectedStatus);
    }
  };

  return (
    <div className="app-card">
      <div className="app-header">
        <div className="app-info">
          <h3 className="app-name">{application.name}</h3>
          <span
            className={`status-badge status-${application.status.name}`}
          >
            {application.status.displayName}
          </span>
        </div>

        <button
          className="btn-small"
          onClick={() => setShowVersions(!showVersions)}
        >
          {showVersions ? "▲" : "▼"} Versions
        </button>
      </div>

      {showVersions && (
        <div className="app-details">
          <div className="versions">
            <strong>Versions:</strong>
            <ul>
              {application.versions.map((v, idx) => (
                <li key={idx}>
                  {v.version} (
                  {new Date(v.createdAt).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </div>

          <div className="status-update">
            <label>Update Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as StatusType)}
              className="status-select"
              disabled={updating}
            >
              <option value="whitelisted">Whitelist</option>
              <option value="unidentified">Unidentified</option>
              <option value="flagged">Flag</option>
              <option value="pending">Pending</option>
              <option value="blocked">Block</option>
            </select>
            <button
              className="btn-update"
              onClick={handleStatusUpdate}
              disabled={updating || selectedStatus === application.status.name}
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .app-card {
          border-bottom: 2px solid var(--color-panelBorder);
          transition: background var(--transition-speed);
        }

        .app-card:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
        }

        .app-info {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .app-name {
          font-size: 18px;
          font-weight: bold;
          color: var(--color-textPrimary);
          margin: 0;
        }

        .btn-small {
          background: var(--color-buttonBackground);
          color: var(--color-buttonText);
          border: 2px solid var(--color-panelBorder);
          padding: 6px 12px;
          cursor: pointer;
          font-family: var(--font-primary);
          font-weight: bold;
          font-size: 12px;
          transition: all var(--transition-speed);
        }

        .btn-small:hover {
          background: var(--color-buttonHover);
        }

        .app-details {
          padding: 0 20px 16px 20px;
          background: rgba(0, 0, 0, 0.2);
        }

        .versions {
          margin-bottom: 16px;
          color: var(--color-textSecondary);
          font-size: 14px;
        }

        .versions strong {
          color: var(--color-textPrimary);
        }

        .versions ul {
          margin: 8px 0 0 20px;
          padding: 0;
        }

        .versions li {
          margin: 4px 0;
        }

        .status-update {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .status-update label {
          color: var(--color-textPrimary);
          font-weight: bold;
          font-size: 14px;
        }

        .status-select {
          padding: 8px 12px;
          background: var(--color-background);
          color: var(--color-textPrimary);
          border: 2px solid var(--color-panelBorder);
          font-family: var(--font-primary);
          font-size: 14px;
        }

        .btn-update {
          background: var(--color-accent2);
          color: var(--color-textPrimary);
          border: 2px solid var(--color-panelBorder);
          padding: 8px 16px;
          cursor: pointer;
          font-family: var(--font-primary);
          font-weight: bold;
          font-size: 14px;
          transition: all var(--transition-speed);
        }

        .btn-update:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.3);
        }

        .btn-update:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .app-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .status-update {
            flex-direction: column;
            align-items: stretch;
          }

          .status-select,
          .btn-update {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
