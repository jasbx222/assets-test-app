"use client";

import { useState, useCallback } from "react";
import axios from "axios";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const remove = useCallback(async (url: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
  if(!token)return null;
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (res.status >= 200 && res.status < 300) {
        setResponse("تم الحذف بنجاح");
      } else {
        setResponse("فشل في الحذف");
      }
    } catch (error: any) {
      setResponse(error?.response?.data?.message || "حدث خطأ أثناء الحذف");
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, response, loading };
};

export default useDelete;
