import {
  File,
  Device,
  Application,
  Status,
  InstallationReport,
  Stats,
  StatusType,
  ApplicationVersion,
} from "@/types";

// Mock statuses
export const MOCK_STATUSES: Status[] = [
  {
    id: "1",
    name: "whitelisted",
    displayName: "Whitelisted",
    color: "#00ff88",
    description: "Approved and safe applications",
  },
  {
    id: "2",
    name: "unidentified",
    displayName: "Unidentified",
    color: "#ff0055",
    description: "Unknown or unverified applications",
  },
  {
    id: "3",
    name: "flagged",
    displayName: "Flagged",
    color: "#ffaa00",
    description: "Applications requiring attention",
  },
  {
    id: "4",
    name: "pending",
    displayName: "Pending Review",
    color: "#00d9ff",
    description: "Awaiting security review",
  },
  {
    id: "5",
    name: "blocked",
    displayName: "Blocked",
    color: "#ff0000",
    description: "Prohibited applications",
  },
];

// Mock applications
export const MOCK_APPLICATIONS: Application[] = [
  {
    uuid: "app-1",
    name: "Google Chrome",
    versions: [
      { version: "120.0.6099.109", createdAt: "2024-01-15T10:30:00Z" },
      { version: "119.0.6045.159", createdAt: "2023-12-20T14:20:00Z" },
    ],
    status: MOCK_STATUSES[0], // whitelisted
  },
  {
    uuid: "app-2",
    name: "Visual Studio Code",
    versions: [
      { version: "1.85.2", createdAt: "2024-01-10T09:15:00Z" },
      { version: "1.85.1", createdAt: "2023-12-28T16:45:00Z" },
    ],
    status: MOCK_STATUSES[0], // whitelisted
  },
  {
    uuid: "app-3",
    name: "Slack",
    versions: [{ version: "4.36.140", createdAt: "2024-01-18T11:00:00Z" }],
    status: MOCK_STATUSES[0], // whitelisted
  },
  {
    uuid: "app-4",
    name: "Unknown Crypto Miner",
    versions: [{ version: "2.1.0", createdAt: "2024-01-20T08:30:00Z" }],
    status: MOCK_STATUSES[1], // unidentified
  },
  {
    uuid: "app-5",
    name: "SuspiciousApp.exe",
    versions: [{ version: "1.0.0", createdAt: "2024-01-21T15:20:00Z" }],
    status: MOCK_STATUSES[1], // unidentified
  },
  {
    uuid: "app-6",
    name: "Docker Desktop",
    versions: [
      { version: "4.27.1", createdAt: "2024-01-12T13:30:00Z" },
      { version: "4.27.0", createdAt: "2024-01-05T10:00:00Z" },
    ],
    status: MOCK_STATUSES[0], // whitelisted
  },
  {
    uuid: "app-7",
    name: "Postman",
    versions: [{ version: "10.21.0", createdAt: "2024-01-14T12:00:00Z" }],
    status: MOCK_STATUSES[0], // whitelisted
  },
  {
    uuid: "app-8",
    name: "Outdated Java Runtime",
    versions: [{ version: "8u201", createdAt: "2019-01-15T10:00:00Z" }],
    status: MOCK_STATUSES[2], // flagged
  },
  {
    uuid: "app-9",
    name: "TeamViewer",
    versions: [{ version: "15.49.5", createdAt: "2024-01-16T14:30:00Z" }],
    status: MOCK_STATUSES[3], // pending
  },
  {
    uuid: "app-10",
    name: "TorBrowser",
    versions: [{ version: "13.0.8", createdAt: "2024-01-19T09:45:00Z" }],
    status: MOCK_STATUSES[4], // blocked
  },
];

// Mock devices
export const MOCK_DEVICES: Device[] = [
  {
    uuid: "device-1",
    ownerName: "John Doe",
    serialNumber: "SN-2024-001-XYZ",
    applications: [
      {
        application: MOCK_APPLICATIONS[0],
        version: "120.0.6099.109",
        installedAt: "2024-01-15T10:30:00Z",
      },
      {
        application: MOCK_APPLICATIONS[1],
        version: "1.85.2",
        installedAt: "2024-01-10T09:15:00Z",
      },
      {
        application: MOCK_APPLICATIONS[2],
        version: "4.36.140",
        installedAt: "2024-01-18T11:00:00Z",
      },
    ],
  },
  {
    uuid: "device-2",
    ownerName: "Jane Smith",
    serialNumber: "SN-2024-002-ABC",
    applications: [
      {
        application: MOCK_APPLICATIONS[0],
        version: "119.0.6045.159",
        installedAt: "2023-12-20T14:20:00Z",
      },
      {
        application: MOCK_APPLICATIONS[3],
        version: "2.1.0",
        installedAt: "2024-01-20T08:30:00Z",
      },
      {
        application: MOCK_APPLICATIONS[4],
        version: "1.0.0",
        installedAt: "2024-01-21T15:20:00Z",
      },
    ],
  },
  {
    uuid: "device-3",
    ownerName: "Bob Johnson",
    serialNumber: "SN-2024-003-DEF",
    applications: [
      {
        application: MOCK_APPLICATIONS[5],
        version: "4.27.1",
        installedAt: "2024-01-12T13:30:00Z",
      },
      {
        application: MOCK_APPLICATIONS[6],
        version: "10.21.0",
        installedAt: "2024-01-14T12:00:00Z",
      },
      {
        application: MOCK_APPLICATIONS[7],
        version: "8u201",
        installedAt: "2019-01-15T10:00:00Z",
      },
    ],
  },
];

// Mock files
export const MOCK_FILES: File[] = [
  {
    uuid: "file-1",
    uploadDate: "2024-01-21T16:30:00Z",
    deviceUuid: "device-2",
    device: MOCK_DEVICES[1],
  },
  {
    uuid: "file-2",
    uploadDate: "2024-01-20T10:15:00Z",
    deviceUuid: "device-1",
    device: MOCK_DEVICES[0],
  },
  {
    uuid: "file-3",
    uploadDate: "2024-01-19T14:45:00Z",
    deviceUuid: "device-3",
    device: MOCK_DEVICES[2],
  },
  {
    uuid: "file-4",
    uploadDate: "2024-01-18T09:00:00Z",
    deviceUuid: "device-1",
    device: MOCK_DEVICES[0],
  },
];

// Generate installation reports
export function generateInstallationReports(): InstallationReport[] {
  const reports: InstallationReport[] = [];

  MOCK_DEVICES.forEach((device) => {
    device.applications?.forEach((installation) => {
      reports.push({
        device: device.uuid,
        owner: device.ownerName,
        serialNumber: device.serialNumber,
        applicationName: installation.application.name,
        applicationVersion: installation.version,
        status: installation.application.status.name,
      });
    });
  });

  return reports;
}

// Generate stats
export function generateStats(): Stats {
  const unidentifiedCount = MOCK_APPLICATIONS.filter(
    (app) => app.status.name === "unidentified"
  ).length;

  const whitelistedCount = MOCK_APPLICATIONS.filter(
    (app) => app.status.name === "whitelisted"
  ).length;

  const flaggedCount = MOCK_APPLICATIONS.filter(
    (app) => app.status.name === "flagged"
  ).length;

  return {
    mostRecentFile: MOCK_FILES[0],
    unidentifiedCount,
    totalApplications: MOCK_APPLICATIONS.length,
    totalDevices: MOCK_DEVICES.length,
    whitelistedCount,
    flaggedCount,
    lastUploadDate: MOCK_FILES[0]?.uploadDate || null,
  };
}

// Helper to add delay for realistic API simulation
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
