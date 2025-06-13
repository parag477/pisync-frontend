import { useState, useEffect, useCallback } from 'react';
import { fetchDevices, triggerDeviceSync, fetchErrorLogs } from '../services/api';

export function useDevices() {
  const [devices, setDevices] = useState([]);
  const [errorLogs, setErrorLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [syncing, setSyncing] = useState({});

  const loadDevices = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await fetchDevices();
      if (fetchError) throw new Error(fetchError);
      setDevices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadErrorLogs = useCallback(async () => {
    try {
      const { data, error: fetchError } = await fetchErrorLogs();
      if (fetchError) throw new Error(fetchError);
      setErrorLogs(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const handleSync = useCallback(async (deviceId) => {
    try {
      setSyncing(prev => ({ ...prev, [deviceId]: true }));
      const { data, error: syncError } = await triggerDeviceSync(deviceId);
      if (syncError) throw new Error(syncError);
      
      // Refresh both devices and error logs after sync
      await Promise.all([loadDevices(), loadErrorLogs()]);
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSyncing(prev => ({ ...prev, [deviceId]: false }));
    }
  }, [loadDevices, loadErrorLogs]);

  useEffect(() => {
    loadDevices();
    loadErrorLogs();
  }, [loadDevices, loadErrorLogs]);

  return {
    devices,
    errorLogs,
    loading,
    error,
    syncing,
    refreshDevices: loadDevices,
    refreshErrorLogs: loadErrorLogs,
    triggerSync: handleSync,
  };
}