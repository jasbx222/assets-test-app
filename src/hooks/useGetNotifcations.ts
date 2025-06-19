'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getDecryptedToken } from './getDecryptedToken';

const useGetnotific = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getDecryptedToken()
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json; charset=UTF-8',
          },
        });
        if (res.status >= 200 && res.status < 300) {
          setData(res.data.data);
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // refresh every 3 seconds
    // const interval = setInterval(fetchData, 3000);
    // return () => clearInterval(interval);
  }, [url]);

  return { data, loading };
};

export default useGetnotific;
