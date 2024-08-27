"use strict";

import { useEffect } from 'react';
import { useStore } from "../stores/useStore.js";
export const useRefRegister = (...ref) => {
  const setElementRef = useStore(s => s.setElementRef);
  useEffect(() => {
    setElementRef(...ref);
  }, [ref, setElementRef]);
};
//# sourceMappingURL=useRefRegister.js.map