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
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };

        const tokenName = decodedToken?.name;
        const tokenIdentity = decodedToken.sub || decodedToken.jti;

        if (tokenIdentity) {
          setIdentity(tokenIdentity);
        }

        if (tokenName) {
          setName(tokenName);
        }
      } catch (error) {
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