import type { ElementRefType, Tour } from '../types';
interface StoreState {
    elementRefs: {
        [key: string]: React.RefObject<any> | null;
    };
    setElementRef: (...refs: ElementRefType[]) => void;
    tourStepIndex: number;
    setTourStepIndex: (tourStepIndex: number) => void;
    tours: Tour[];
    setTours: (tours: Tour[]) => void;
    availableTour: Tour | undefined;
    setAvailableTour: (availableTour: Tour | undefined) => void;
}
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StoreState>>;
export {};
//# sourceMappingURL=useStore.d.ts.map