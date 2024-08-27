import { useEffect } from 'react';
import { useStore } from '../stores/useStore';
import type { ElementRefType } from '../types';

export const useRefRegister = (...ref: ElementRefType[]) => {
  const setElementRef = useStore((s) => s.setElementRef);
  useEffect(() => {
    setElementRef(...ref);
  }, [ref, setElementRef]);
};
