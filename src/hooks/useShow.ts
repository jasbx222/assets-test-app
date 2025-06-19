import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { getDecryptedToken } from "./getDecryptedToken";

export default function useShow<T>(url: string, id: any) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const token = getDecryptedToken();
      if (!token) return;
      setLoading(true);

      const res = await axios.get(`${url}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json; charset=UTF-8",
        },
      });

      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [url, id]);

  useEffect(() => {
    if (id) fetchData();
  }, [fetchData]);

  return { data, loading, refetch: fetchData };
}
