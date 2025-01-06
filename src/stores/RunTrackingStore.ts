import { MetricType } from "~/types/MetricType/MetricType";
import { createStore } from "zustand/vanilla";
import { JsonIndexer } from "json-indexer";
import { type Shoe, type ShoeMetadata } from "~/types/Shoe/Shoe";

export type RunTrackingState = {
  fileDownload: string;
  fileName: string;
  validFileAvailable: boolean;
  name: string;
  metricType: MetricType;
  shoes: Shoe[];
  shoeIndex: Map<string, ShoeMetadata>;
  originalFile: File | null;
  isIndexLoading: boolean;
};

export type RunTrackingActions = {
  setFileDownload: (href: string) => void;
  setFileName: (fileName: string) => void;
  setValidFileAvailable: (available: boolean) => void;
  setName: (name: string) => void;
  setMetricType: (metricType: MetricType) => void;
  setShoes: (shoes: Shoe[]) => void;
  addShoe: (shoe: Shoe) => void;
  indexFromFile: (file: File) => Promise<void>;
  getShoeData: (id: string) => Promise<Shoe | null>;
};

export type RunTrackingStore = RunTrackingState & RunTrackingActions;

export const initRunTrackingStore = (): RunTrackingState => ({
  fileDownload: "",
  fileName: "",
  validFileAvailable: false,
  name: "",
  metricType: MetricType.MI,
  shoes: [],
  shoeIndex: new Map(),
  originalFile: null,
  isIndexLoading: false,
});

export const defaultInitState: RunTrackingState = {
  fileDownload: "",
  fileName: "",
  validFileAvailable: false,
  name: "",
  metricType: MetricType.MI,
  shoes: [],
  shoeIndex: new Map(),
  originalFile: null,
  isIndexLoading: false
};

export const createRunTrackingStore = (
  initState: RunTrackingState = defaultInitState
) => {
  return createStore<RunTrackingStore>((set, get) => ({
    ...initState,
    indexFromFile: async (file: File) => {
      set({ isIndexLoading: true });
      try {
        const indexer = new JsonIndexer(file);
        const shoeIndex = await indexer.index<ShoeMetadata>('shoes', ['name']);
        set({ shoeIndex, originalFile: file });
      } finally {
        set({ isIndexLoading: false });
      }
    },
    getShoeData: async (id: string) => {
      const { shoeIndex, originalFile } = get();
      if (!originalFile) return null;

      const metadata = shoeIndex.get(id);
      if (!metadata) return null;

      try {
        const chunk = originalFile.slice(
          metadata.filePosition,
          metadata.filePosition + metadata.length
        )
        return JSON.parse(await chunk.text()) as Shoe;
      } catch (e) {
        console.error('Failed to load shoe data:', e);
        return null;
      }
    },
    setFileDownload: (href: string) =>
      set((state) => ({
        ...state,
        fileDownload: href,
      })),
    setFileName: (fileName: string) =>
      set((state) => ({
        ...state,
        fileName,
      })),
    setValidFileAvailable: (available: boolean) =>
      set((state) => ({
        ...state,
        validFileAvailable: available,
      })),
    setName: (name: string) =>
      set((state) => ({
        ...state,
        name,
      })),
    setMetricType: (metricType: MetricType) =>
      set((state) => ({
        ...state,
        metricType,
      })),
    setShoes: (shoes: Shoe[]) =>
      set((state) => ({
        ...state,
        shoes,
      })),
    addShoe: (shoe: Shoe) =>
      set((state) => ({
        ...state,
        shoes: [...state.shoes, shoe],
      })),
  }));
};
