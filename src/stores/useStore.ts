import { create } from 'zustand';
import type { ElementRefType, Tour } from '../types';

interface StoreState {
  elementRefs: { [key: string]: React.RefObject<any> | null };
  setElementRef: (...refs: ElementRefType[]) => void;
  tourStepIndex: number;
  setTourStepIndex: (tourStepIndex: number) => void;
  tours: Tour[];
  setTours: (tours: Tour[]) => void;
  availableTour: Tour | undefined;
  setAvailableTour: (availableTour: Tour | undefined) => void;
}

export const useStore = create<StoreState>((set) => ({
  elementRefs: {},
  setElementRef: (...refs) => {
    set((state) => {
      const updateRefs = { ...state.elementRefs };
      refs.forEach(({ key, ref }) => {
        updateRefs[key] = ref;
      });
      console.log('====updateRefs=====>', updateRefs);
      return { ...state, elementRefs: updateRefs };
    });
  },
  tourStepIndex: 0,
  setTourStepIndex: (tourStepIndex) => {
    set((state) => {
      if (
        state.availableTour &&
        state.availableTour.steps.length - 1 >= tourStepIndex &&
        tourStepIndex >= 0
      ) {
        return { ...state, tourStepIndex };
      } else {
        return { ...state };
      }
    });
  },
  tours: [],
  setTours: (tours) => set({ tours }),
  availableTour: undefined,
  setAvailableTour: (availableTour) => set({ availableTour }),
}));
