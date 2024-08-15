import type { TourStep } from '../../types';
type ModalProps = {
    step: TourStep;
    onColse: () => void;
    tourStepIndex: number;
    setTourStepIndex: (to: number) => void;
};
export declare const Modal: ({ step, onColse, tourStepIndex, setTourStepIndex, }: ModalProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Modal.d.ts.map