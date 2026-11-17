"use client";
import { PostHog } from "posthog-js";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const AnalyticsContext = createContext<PostHog | null>(null);

export function useAnalytics(): PostHog | null {
  return useContext(AnalyticsContext);
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<PostHog | null>(null);

  useEffect(() => {
    const posthog = new PostHog();
    posthog.init("phc_yyfZKMnF44Gu7oHNc5H8E6KDL6fNHD5cGmE2GbBUnLca", {
      autocapture: true,
      ui_host: "https://eu.i.posthog.com",
      api_host: "https://m.vercel.click",
      defaults: "2026-06-25",
      person_profiles: "always",
      persistence: "localStorage",
      loaded: () => {
        setClient(posthog);
      },
    });

    () => posthog.shutdown();
  }, []);

  return (
    <AnalyticsContext.Provider value={client}>
      {children}
    </AnalyticsContext.Provider>
  );
}
