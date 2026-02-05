"use client";

import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        console.log("🔑 Creating token for:", hostIdentity);
        const viewerToken = await createViewerToken(hostIdentity);
        console.log("✅ Token created successfully");
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const tokenName = decodedToken?.name;
        const tokenIdentity = decodedToken.sub || decodedToken.jti; // FIX: Use sub as fallback

        if (tokenIdentity) {
          setIdentity(tokenIdentity);
        }

        if (tokenName) {
          setName(tokenName);
        }
        
        console.log("✅ Token decoded - Name:", tokenName, "Identity:", tokenIdentity);
      } catch (error) {
        console.error("❌ Token creation failed:", error);
        toast.error("Something went wrong");
      }
    };

    createToken();
  }, [hostIdentity]);

  return {
    token,
    name,
    identity,
  };
};