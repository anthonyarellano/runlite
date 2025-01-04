import { createStore } from "zustand/vanilla";
import { MetricType } from "~/types/MetricType/MetricType";
import { Shoe, ShoeMetadata } from "~/types/Shoe/Shoe";

const SHOES_ARRAY_BUFFER = '"shoes":';
const DEFAULT_CHUNK_SIZE = 1024 * 1024;

export type RunTrackingState = {
  fileDownload: string;
  fileName: string;
  validFileAvailable: boolean;
  name: string;
  metricType: MetricType;
  shoes: Shoe[];
  shoeIndex: Map<string, ShoeMetadata>;
  originalFile: File | null;
  isLoading: boolean;
};

export type RunTrackingActions = {
  setFileDownload: (href: string) => void;
  setFileName: (fileName: string) => void;
  setValidFileAvailable: (available: boolean) => void;
  setName: (name: string) => void;
  setMetricType: (metricType: MetricType) => void;
  setShoes: (shoes: Shoe[]) => void;
  addShoe: (shoe: Shoe) => void;
  initializeFromFile: (file: File) => Promise<void>;
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
  isLoading: false,
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
  isLoading: false
};

export const createRunTrackingStore = (
  initState: RunTrackingState = defaultInitState
) => {
  return createStore<RunTrackingStore>((set, get) => ({
    ...initState,
    initializeFromFile: async (file: File) => {
      set({ isLoading: true });
      try {
        let offset = 0;  // For chunking through file
        let buffer = '';
        const shoeIndex = new Map<string, ShoeMetadata>();
        let inShoesArray = false;
        let contentPosition = 0;  // Track actual position in file content
    
        while (offset < file.size) {
          const chunk = file.slice(offset, offset + DEFAULT_CHUNK_SIZE);
          const text = await chunk.text();
          buffer += text;
    
          if (!inShoesArray && buffer.includes('"shoes":')) {
            inShoesArray = true;
            const arrayStart = buffer.indexOf('[', buffer.indexOf('"shoes":'));
            contentPosition = offset + arrayStart;
            buffer = buffer.slice(arrayStart);
          }
    
          if (inShoesArray) {
            let bracketCount = 0;
            let startPos = 0;
    
            for (let i = 0; i < buffer.length; i++) {
              const char = buffer[i];
              
              if (char === "{") {
                if (bracketCount === 0) startPos = i;
                bracketCount++;
              } else if (char === "}") {
                bracketCount--;
                if (bracketCount === 0) {
                  const shoeStr = buffer.substring(startPos, i + 1);
                  try {
                    const shoe = JSON.parse(shoeStr);
                    shoeIndex.set(shoe.id, {
                      id: shoe.id,
                      name: shoe.name,
                      filePosition: contentPosition + startPos,
                      length: shoeStr.length
                    });
                  } catch (e) {
                    console.error('Failed to parse shoe:', e);
                  }
                }
              }
            }
    
            const lastOpenBracket = buffer.lastIndexOf('{');
            if (lastOpenBracket !== -1) {
              contentPosition += lastOpenBracket;
              buffer = buffer.slice(lastOpenBracket);
            } else {
              buffer = '';
            }
          }
    
          offset += DEFAULT_CHUNK_SIZE;
        }

        set({ shoeIndex, originalFile: file });
      } finally {
        set({ isLoading: false });
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
        return JSON.parse(await chunk.text());
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
