"use client";

import Dashboard from "@/components/dashboard";
import WhitelistedSoftwarePanel from "@/components/whitelisted-software-panel";
import RecentUploadStatusPanel from "@/components/recent-upload-status-panel";
import PastUploadsPanel from "@/components/past-uploads-panel";

export default function Home() {
  return (
    <Dashboard>
      <div className="dashboard-grid">
        <RecentUploadStatusPanel />
        <PastUploadsPanel />
        <WhitelistedSoftwarePanel />
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        :global(.widget-large) {
          grid-column: span 2;
        }

        :global(.widget-small) {
          grid-column: span 1;
        }

        @media (max-width: 968px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          :global(.widget-large),
          :global(.widget-small) {
            grid-column: span 1;
          }
        }
      `}</style>
    </Dashboard>
  );
}
