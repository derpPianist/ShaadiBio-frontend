"use client";
import { useRef, useEffect, ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { hydrateSelected } from "./profilesSlice";

const KEY = "selected-profile";

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  useEffect(() => {
    const store = storeRef.current!;

    // one-time cleanup of the old full-list cache; you can delete this line after one run
    try { sessionStorage.removeItem("profiles-cache"); } catch {}

    try {
      const raw = sessionStorage.getItem(KEY);
      store.dispatch(hydrateSelected(raw ? JSON.parse(raw) : null));
    } catch {
      store.dispatch(hydrateSelected(null));
    }

    return store.subscribe(() => {
      try {
        const { selected } = store.getState().profiles;
        if (selected) sessionStorage.setItem(KEY, JSON.stringify(selected));
        else sessionStorage.removeItem(KEY);
      } catch {}
    });
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}