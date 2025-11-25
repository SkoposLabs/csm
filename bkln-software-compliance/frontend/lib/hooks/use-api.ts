import { useState, useEffect, useCallback } from "react";
import { apiClient } from "../api-client";
import {
  Application,
  Device,
  File,
  Status,
  Stats,
  InstallationReport,
  StatusType,
} from "@/types";

// Generic hook for API calls with loading and error states
export function useApiCall<T>(
  apiFunction: () => Promise<{ data: T }>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ==================== APPLICATION HOOKS ====================

export function useApplications() {
  const { data, loading, error, refetch } = useApiCall(
    apiClient.getApplications,
    []
  );

  return {
    applications: data?.data || [],
    total: data?.total || 0,
    loading,
    error,
    refetch,
  };
}

export function useApplication(applicationUuid: string) {
  return useApiCall(
    () => apiClient.getApplication(applicationUuid),
    [applicationUuid]
  );
}

export function useApplicationDevices(applicationUuid: string) {
  return useApiCall(
    () => apiClient.getApplicationDevices(applicationUuid),
    [applicationUuid]
  );
}

export function useUpdateApplicationStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (applicationUuid: string, status: StatusType) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.updateApplicationStatus(
        applicationUuid,
        status
      );
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update status";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
}

// ==================== DEVICE HOOKS ====================

export function useDevices() {
  const { data, loading, error, refetch } = useApiCall(
    apiClient.getDevices,
    []
  );

  return {
    devices: data?.data || [],
    total: data?.total || 0,
    loading,
    error,
    refetch,
  };
}

export function useDevice(deviceUuid: string) {
  return useApiCall(() => apiClient.getDevice(deviceUuid), [deviceUuid]);
}

export function useUpdateDevice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDevice = async (deviceUuid: string, ownerName: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.updateDevice(deviceUuid, ownerName);
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update device";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateDevice, loading, error };
}

// ==================== FILE HOOKS ====================

export function useUploadFile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: globalThis.File) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.uploadFile(file);
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to upload file";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
}

export function useDeleteFile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFile = async (fileUuid: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.deleteFile(fileUuid);
      return response.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete file";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteFile, loading, error };
}

export function useFileInstallationReports(fileUuid: string) {
  return useApiCall(
    () => apiClient.getFileInstallationReports(fileUuid),
    [fileUuid]
  );
}

// ==================== STATUS HOOKS ====================

export function useStatuses() {
  const { data, loading, error, refetch } = useApiCall(
    apiClient.getStatuses,
    []
  );

  return {
    statuses: data?.data || [],
    total: data?.total || 0,
    loading,
    error,
    refetch,
  };
}

// ==================== REPORT HOOKS ====================

export function useReport() {
  return useApiCall(apiClient.getReport, []);
}

// ==================== STATS HOOKS ====================

export function useStats() {
  return useApiCall(apiClient.getStats, []);
}
