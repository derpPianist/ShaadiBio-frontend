"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const OauthSuccess = () => {
  const params = useSearchParams();
  const { setAccessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const accessToken = params.get("accessToken");
    const id = params.get("id");

    if (accessToken) {
      setAccessToken(accessToken);
      router.replace(`/dashboard?id=${encodeURIComponent(id ?? "")}`);
    } else {
      router.replace("/login");
    }
  }, []);

  return null;
};

export default OauthSuccess;