"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { getDecryptedToken } from "./getDecryptedToken";

const usePutClosedMsg = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoad] = useState<boolean>(false);

  const update = useCallback(async (url: string) => {
    setLoad(true);
    setResponse(""); 
    try {
      const token =getDecryptedToken()
  if(!token)return null;
      const res = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status >= 200 && res.status < 300) {
        setResponse("تم التعديل بنجاح");
      } else {
        setResponse("حدث خطأ أثناء التعديل");
      }
    } catch (error: any) {
      console.error("Put error:", error);
      setResponse("تأكد من الاتصال بالإنترنت أو أن البيانات مستخدمة بالفعل");
    } finally {
      setLoad(false);
    }
  }, []);

  return { update, response, loading };
};

export default usePutClosedMsg;
