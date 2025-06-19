'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getDecryptedToken } from './getDecryptedToken';

const useGet = <T>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
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
        if (res.status >= 200) {
          setData(res.data.data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchData();
    // // make it refresh every 5 seconds/
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 5000);
    // return () => clearInterval(interval);
  }, []);
  return { data, loading };
};
export default useGet;
