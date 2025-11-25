// Core data models based on API specification

export interface File {
  uuid: string;
  uploadDate: string; // ISO 8601 date string
  deviceUuid: string;
  device?: Device;
}

export interface Device {
  uuid: string;
  ownerName: string;
  serialNumber: string;
  applications?: ApplicationInstallation[];
}

export interface Application {
  uuid: string;
  name: string;
  versions: ApplicationVersion[];
  status: Status;
}

export interface ApplicationVersion {
  version: string;
  createdAt: string; // ISO 8601 date string
}

export interface ApplicationInstallation {
  application: Application;
  version: string;
  installedAt?: string;
}

export interface Status {
  id: string;
  name: StatusType;
  displayName: string;
  color: string; // Hex color code
  description?: string;
}

export type StatusType =
  | "whitelisted"
  | "unidentified"
  | "flagged"
  | "pending"
  | "blocked";

export interface InstallationReport {
  device: string;
  owner: string;
  serialNumber: string;
  applicationName: string;
  applicationVersion: string;
  status: StatusType;
}

export interface Stats {
  mostRecentFile: File | null;
  unidentifiedCount: number;
  totalApplications: number;
  totalDevices: number;
  whitelistedCount: number;
  flaggedCount: number;
  lastUploadDate: string | null;
}

// API Request/Response types

export interface UploadFileRequest {
  file: File;
  deviceUuid?: string;
}

export interface UploadFileResponse {
  fileUuid: string;
  message: string;
}

export interface UpdateApplicationStatusRequest {
  status: StatusType;
}

export interface UpdateApplicationStatusResponse {
  success: boolean;
  applicationUuid: string;
  newStatus: StatusType;
}

export interface UpdateDeviceRequest {
  ownerName: string;
}

export interface UpdateDeviceResponse {
  success: boolean;
  device: Device;
}

export interface DeleteFileResponse {
  success: boolean;
  message: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  data: T;
  error?: string;
  timestamp: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page?: number;
  pageSize?: number;
}

// Filter and search types
export interface ApplicationFilters {
  status?: StatusType;
  search?: string;
  sortBy?: "name" | "status" | "deviceCount";
  sortOrder?: "asc" | "desc";
}

export interface DeviceFilters {
  search?: string;
  sortBy?: "ownerName" | "serialNumber" | "lastSeen";
  sortOrder?: "asc" | "desc";
}

export interface FileFilters {
  deviceUuid?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: "uploadDate" | "deviceUuid";
  sortOrder?: "asc" | "desc";
}
