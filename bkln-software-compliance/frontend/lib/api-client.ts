import {
  File,
  Device,
  Application,
  Status,
  InstallationReport,
  Stats,
  StatusType,
  UploadFileResponse,
  UpdateApplicationStatusResponse,
  UpdateDeviceResponse,
  DeleteFileResponse,
  ApiResponse,
  ApiListResponse,
} from "@/types";
import {
  MOCK_FILES,
  MOCK_DEVICES,
  MOCK_APPLICATIONS,
  MOCK_STATUSES,
  generateInstallationReports,
  generateStats,
  delay,
} from "./mock-data";

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";
const USE_MOCK_DATA = true; // Set to false when real API is available
const MOCK_DELAY = 400; // Simulate network delay in ms

// In-memory storage for mock data (simulates database)
let mockFiles = [...MOCK_FILES];
let mockDevices = [...MOCK_DEVICES];
let mockApplications = [...MOCK_APPLICATIONS];
const mockStatuses = [...MOCK_STATUSES];

// Helper to simulate API response
async function mockApiCall<T>(data: T): Promise<ApiResponse<T>> {
  await delay(MOCK_DELAY);
  return {
    data,
    timestamp: new Date().toISOString(),
  };
}

// ==================== FILE ENDPOINTS ====================

/**
 * POST /file
 * Upload a new report file
 */
export async function uploadFile(
  file: globalThis.File
): Promise<ApiResponse<UploadFileResponse>> {
  if (USE_MOCK_DATA) {
    const newFileUuid = `file-${Date.now()}`;
    const newFile: File = {
      uuid: newFileUuid,
      uploadDate: new Date().toISOString(),
      deviceUuid: mockDevices[0].uuid,
      device: mockDevices[0],
    };
    mockFiles.unshift(newFile);

    return mockApiCall({
      fileUuid: newFileUuid,
      message: "File uploaded successfully",
    });
  }

  // Real API implementation
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/file`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

/**
 * DELETE /file
 * Delete a file and all associated installation reports
 */
export async function deleteFile(
  fileUuid: string
): Promise<ApiResponse<DeleteFileResponse>> {
  if (USE_MOCK_DATA) {
    mockFiles = mockFiles.filter((f) => f.uuid !== fileUuid);

    return mockApiCall({
      success: true,
      message: "File deleted successfully",
    });
  }

  const response = await fetch(`${API_BASE_URL}/file?uuid=${fileUuid}`, {
    method: "DELETE",
  });

  return response.json();
}

/**
 * GET /file/{file_uuid}
 * Get all installation reports for a file
 */
export async function getFileInstallationReports(
  fileUuid: string
): Promise<ApiResponse<InstallationReport[]>> {
  if (USE_MOCK_DATA) {
    const file = mockFiles.find((f) => f.uuid === fileUuid);
    if (!file || !file.device) {
      return mockApiCall([]);
    }

    const reports: InstallationReport[] =
      file.device.applications?.map((installation) => ({
        device: file.device!.uuid,
        owner: file.device!.ownerName,
        serialNumber: file.device!.serialNumber,
        applicationName: installation.application.name,
        applicationVersion: installation.version,
        status: installation.application.status.name,
      })) || [];

    return mockApiCall(reports);
  }

  const response = await fetch(`${API_BASE_URL}/file/${fileUuid}`);
  return response.json();
}

// ==================== APPLICATION ENDPOINTS ====================

/**
 * GET /applications
 * Get list of all applications
 */
export async function getApplications(): Promise<
  ApiResponse<ApiListResponse<Application>>
> {
  if (USE_MOCK_DATA) {
    return mockApiCall({
      data: mockApplications,
      total: mockApplications.length,
    });
  }

  const response = await fetch(`${API_BASE_URL}/applications`);
  return response.json();
}

/**
 * GET /applications/{application_uuid}
 * Get application with versions and creation dates
 */
export async function getApplication(
  applicationUuid: string
): Promise<ApiResponse<Application | null>> {
  if (USE_MOCK_DATA) {
    const app = mockApplications.find((a) => a.uuid === applicationUuid);
    return mockApiCall(app || null);
  }

  const response = await fetch(
    `${API_BASE_URL}/applications/${applicationUuid}`
  );
  return response.json();
}

/**
 * GET /applications/{application_uuid}/devices
 * Get devices with this application installed
 */
export async function getApplicationDevices(
  applicationUuid: string
): Promise<ApiResponse<Device[]>> {
  if (USE_MOCK_DATA) {
    const devicesWithApp = mockDevices.filter((device) =>
      device.applications?.some(
        (installation) => installation.application.uuid === applicationUuid
      )
    );

    return mockApiCall(devicesWithApp);
  }

  const response = await fetch(
    `${API_BASE_URL}/applications/${applicationUuid}/devices`
  );
  return response.json();
}

/**
 * POST /applications/{application_uuid}/status
 * Update status for all versions of an application
 */
export async function updateApplicationStatus(
  applicationUuid: string,
  status: StatusType
): Promise<ApiResponse<UpdateApplicationStatusResponse>> {
  if (USE_MOCK_DATA) {
    const appIndex = mockApplications.findIndex(
      (a) => a.uuid === applicationUuid
    );

    if (appIndex === -1) {
      throw new Error("Application not found");
    }

    const newStatus = mockStatuses.find((s) => s.name === status);
    if (!newStatus) {
      throw new Error("Invalid status");
    }

    mockApplications[appIndex] = {
      ...mockApplications[appIndex],
      status: newStatus,
    };

    return mockApiCall({
      success: true,
      applicationUuid,
      newStatus: status,
    });
  }

  const response = await fetch(
    `${API_BASE_URL}/applications/${applicationUuid}/status`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );

  return response.json();
}

// ==================== DEVICE ENDPOINTS ====================

/**
 * GET /devices
 * Get list of all devices
 */
export async function getDevices(): Promise<
  ApiResponse<ApiListResponse<Device>>
> {
  if (USE_MOCK_DATA) {
    return mockApiCall({
      data: mockDevices,
      total: mockDevices.length,
    });
  }

  const response = await fetch(`${API_BASE_URL}/devices`);
  return response.json();
}

/**
 * GET /devices/{device_uuid}
 * Get device with all installed applications
 */
export async function getDevice(
  deviceUuid: string
): Promise<ApiResponse<Device | null>> {
  if (USE_MOCK_DATA) {
    const device = mockDevices.find((d) => d.uuid === deviceUuid);
    return mockApiCall(device || null);
  }

  const response = await fetch(`${API_BASE_URL}/devices/${deviceUuid}`);
  return response.json();
}

/**
 * PATCH /devices/{device_uuid}
 * Update device owner name
 */
export async function updateDevice(
  deviceUuid: string,
  ownerName: string
): Promise<ApiResponse<UpdateDeviceResponse>> {
  if (USE_MOCK_DATA) {
    const deviceIndex = mockDevices.findIndex((d) => d.uuid === deviceUuid);

    if (deviceIndex === -1) {
      throw new Error("Device not found");
    }

    mockDevices[deviceIndex] = {
      ...mockDevices[deviceIndex],
      ownerName,
    };

    return mockApiCall({
      success: true,
      device: mockDevices[deviceIndex],
    });
  }

  const response = await fetch(`${API_BASE_URL}/devices/${deviceUuid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ownerName }),
  });

  return response.json();
}

// ==================== STATUS ENDPOINTS ====================

/**
 * GET /statuses
 * Get all available statuses
 */
export async function getStatuses(): Promise<
  ApiResponse<ApiListResponse<Status>>
> {
  if (USE_MOCK_DATA) {
    return mockApiCall({
      data: mockStatuses,
      total: mockStatuses.length,
    });
  }

  const response = await fetch(`${API_BASE_URL}/statuses`);
  return response.json();
}

// ==================== REPORT ENDPOINTS ====================

/**
 * GET /report
 * Get full report from most recent file
 */
export async function getReport(): Promise<
  ApiResponse<InstallationReport[]>
> {
  if (USE_MOCK_DATA) {
    const reports = generateInstallationReports();
    return mockApiCall(reports);
  }

  const response = await fetch(`${API_BASE_URL}/report`);
  return response.json();
}

// ==================== STATS ENDPOINTS ====================

/**
 * GET /stats
 * Get homepage statistics
 */
export async function getStats(): Promise<ApiResponse<Stats>> {
  if (USE_MOCK_DATA) {
    const stats = generateStats();
    return mockApiCall(stats);
  }

  const response = await fetch(`${API_BASE_URL}/stats`);
  return response.json();
}

// Export all functions
export const apiClient = {
  // File operations
  uploadFile,
  deleteFile,
  getFileInstallationReports,

  // Application operations
  getApplications,
  getApplication,
  getApplicationDevices,
  updateApplicationStatus,

  // Device operations
  getDevices,
  getDevice,
  updateDevice,

  // Status operations
  getStatuses,

  // Report operations
  getReport,

  // Stats operations
  getStats,
};
