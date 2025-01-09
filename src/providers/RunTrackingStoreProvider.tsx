"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import {
  type RunTrackingStore,
  createRunTrackingStore,
  initRunTrackingStore,
} from "~/stores/RunTrackingStore";

export const RunTrackingStoreContext =
  createContext<StoreApi<RunTrackingStore> | null>(null);

export interface RunTrackingStoreProviderProps {
  children: ReactNode;
}

export const RunTrackingStoreProvider = ({
  children,
}: RunTrackingStoreProviderProps) => {
  const storeRef = useRef<StoreApi<RunTrackingStore>>(undefined);
  if (!storeRef.current) {
    storeRef.current = createRunTrackingStore(initRunTrackingStore());
  }

  return (
    <RunTrackingStoreContext.Provider value={storeRef.current}>
      {children}
    </RunTrackingStoreContext.Provider>
  );
};

export const useRunTrackingStore = <T,>(
  selector: (store: RunTrackingStore) => T
): T => {
  const runTrackingStoreContext = useContext(RunTrackingStoreContext);

  if (!runTrackingStoreContext) {
    throw new Error(
      `useRunTrackingStore must be used within RunTrackingStoreProvider`
    );
  }

  return useStore(runTrackingStoreContext, selector);
};
