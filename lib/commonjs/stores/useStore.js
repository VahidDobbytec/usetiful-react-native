"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStore = void 0;
var _zustand = require("zustand");
const useStore = exports.useStore = (0, _zustand.create)(set => ({
  elementRefs: {},
  setElementRef: (...refs) => {
    set(state => {
      const updateRefs = {
        ...state.elementRefs
      };
      refs.forEach(({
        key,
        ref
      }) => {
        updateRefs[key] = ref;
      });
      return {
        ...state,
        elementRefs: updateRefs
      };
    });
  },
  tourStepIndex: 0,
  setTourStepIndex: tourStepIndex => {
    set(state => {
      if (state.availableTour && state.availableTour.steps.length - 1 >= tourStepIndex && tourStepIndex >= 0) {
        return {
          ...state,
          tourStepIndex
        };
      } else {
        return {
          ...state
        };
      }
    });
  },
  tours: [],
  setTours: tours => set({
    tours
  }),
  availableTour: undefined,
  setAvailableTour: availableTour => set({
    availableTour
  })
}));
//# sourceMappingURL=useStore.js.map