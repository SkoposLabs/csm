"use client";

import { useState, useRef } from "react";
import { useUploadFile, useDeleteFile } from "@/lib/hooks/use-api";
import { MOCK_FILES } from "@/lib/mock-data";

export default function PastUploadsPanel() {
  const [files, setFiles] = useState(MOCK_FILES);
  const { uploadFile, loading: uploading } = useUploadFile();
  const { deleteFile, loading: deleting } = useDeleteFile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (file: File) => {
    try {
      const result = await uploadFile(file);
      // Refresh files list - in real app this would refetch from API
      window.location.reload();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleDelete = async (fileUuid: string) => {
    if (!confirm("Are you sure you want to delete this upload?")) {
      return;
    }

    try {
      await deleteFile(fileUuid);
      setFiles((prev) => prev.filter((f) => f.uuid !== fileUuid));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete file. Please try again.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="panel widget-small">
      <div className="panel-header">📁 Past Uploads</div>

      <div className="panel-body">
        {/* Upload Zone */}
        <div
          className={`upload-zone ${dragOver ? "drag-over" : ""}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            style={{ display: "none" }}
            accept=".csv,.json,.txt"
          />

          {uploading ? (
            <div className="upload-message">
              <div className="spinner"></div>
              <p>Uploading...</p>
            </div>
          ) : (
            <div className="upload-message">
              <div className="upload-icon">⬆</div>
              <p>
                <strong>Click to upload</strong> or drag and drop
              </p>
              <p className="upload-hint">CSV, JSON, or TXT files</p>
            </div>
          )}
        </div>

        {/* Files List */}
        <div className="files-list">
          <h4 className="list-title">Upload History</h4>
          {files.length === 0 ? (
            <div className="no-files">No uploads yet</div>
          ) : (
            files.map((file) => (
              <div key={file.uuid} className="file-item">
                <div className="file-info">
                  <div className="file-header">
                    <span className="file-icon">📄</span>
                    <span className="file-id">{file.uuid}</span>
                  </div>
                  <div className="file-meta">
                    <span>
                      {new Date(file.uploadDate).toLocaleString()}
                    </span>
                    {file.device && (
                      <span className="file-device">
                        {file.device.ownerName} ({file.device.serialNumber})
                      </span>
                    )}
                  </div>
                </div>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(file.uuid)}
                  disabled={deleting}
                >
                  {deleting ? "..." : "✕"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .panel-body {
          padding: 20px;
        }

        .upload-zone {
          border: 3px dashed var(--color-panelBorder);
          padding: 32px 20px;
          text-align: center;
          cursor: pointer;
          transition: all var(--transition-speed);
          background: rgba(0, 0, 0, 0.2);
          margin-bottom: 20px;
        }

        .upload-zone:hover {
          border-color: var(--color-accent2);
          background: rgba(0, 0, 0, 0.3);
          transform: scale(1.02);
        }

        .upload-zone.drag-over {
          border-color: var(--color-accent2);
          background: rgba(0, 217, 255, 0.1);
          box-shadow: 0 0 20px var(--color-accent2);
        }

        .upload-message {
          color: var(--color-textPrimary);
        }

        .upload-icon {
          font-size: 48px;
          margin-bottom: 12px;
          animation: bounce 2s ease-in-out infinite;
        }

        .upload-message p {
          margin: 8px 0;
          font-size: 14px;
        }

        .upload-message strong {
          color: var(--color-accent2);
          text-transform: uppercase;
          font-weight: bold;
        }

        .upload-hint {
          color: var(--color-textSecondary);
          font-size: 12px;
        }

        .spinner {
          width: 48px;
          height: 48px;
          margin: 0 auto 12px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: var(--color-accent2);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .files-list {
          min-height: 400px;
          max-height: 500px;
          overflow-y: scroll;
          border: 3px solid var(--color-panelBorder);
          background: rgba(0, 0, 0, 0.2);
          padding: 12px;
          box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .files-list::-webkit-scrollbar {
          width: 18px;
        }

        .files-list::-webkit-scrollbar-track {
          background: var(--color-backgroundSecondary);
          border: 3px solid var(--color-panelBorder);
          box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.5);
        }

        .files-list::-webkit-scrollbar-thumb {
          background: var(--color-buttonBackground);
          border: 3px solid var(--color-panelBorder);
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.4);
          min-height: 40px;
        }

        .files-list::-webkit-scrollbar-thumb:hover {
          background: var(--color-buttonHover);
          box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.4);
        }

        .files-list::-webkit-scrollbar-thumb:active {
          background: var(--color-buttonActive);
        }

        .files-list::-webkit-scrollbar-button {
          background: var(--color-buttonBackground);
          border: 3px solid var(--color-panelBorder);
          height: 20px;
          display: block;
        }

        .files-list::-webkit-scrollbar-button:vertical:decrement {
          border-bottom-width: 1px;
        }

        .files-list::-webkit-scrollbar-button:vertical:increment {
          border-top-width: 1px;
        }

        .files-list::-webkit-scrollbar-button:hover {
          background: var(--color-buttonHover);
        }

        .files-list::-webkit-scrollbar-button:active {
          background: var(--color-buttonActive);
        }

        .list-title {
          margin: 0 0 12px 0;
          padding-bottom: 8px;
          border-bottom: 2px solid var(--color-panelBorder);
          color: var(--color-textPrimary);
          font-size: 14px;
          text-transform: uppercase;
        }

        .no-files {
          padding: 20px;
          text-align: center;
          color: var(--color-textSecondary);
          font-size: 14px;
        }

        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          margin-bottom: 8px;
          background: var(--color-panelBackground);
          border: 2px solid var(--color-panelBorder);
          transition: all var(--transition-speed);
          box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.3);
        }

        .file-item:hover {
          background: rgba(0, 0, 0, 0.4);
          transform: translateX(-2px);
        }

        .file-info {
          flex: 1;
          min-width: 0;
        }

        .file-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .file-icon {
          font-size: 20px;
        }

        .file-id {
          font-weight: bold;
          color: var(--color-textPrimary);
          font-size: 14px;
          font-family: var(--font-mono);
        }

        .file-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12px;
          color: var(--color-textSecondary);
        }

        .file-device {
          color: var(--color-accent2);
        }

        .btn-delete {
          background: var(--color-error);
          color: #ffffff;
          border: 2px solid var(--color-panelBorder);
          width: 32px;
          height: 32px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          transition: all var(--transition-speed);
          flex-shrink: 0;
        }

        .btn-delete:hover:not(:disabled) {
          background: #cc0044;
          transform: scale(1.1);
        }

        .btn-delete:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .file-item {
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .btn-delete {
            width: 100%;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
}
