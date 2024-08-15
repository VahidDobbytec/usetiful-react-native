import type { ActionType } from '../../types';
type ActionProps = {
    action: ActionType;
    setTourStepIndex: (to: number) => void;
    tourStepIndex: number;
    onColse: () => void;
};
export declare const USAction: ({ action, setTourStepIndex, tourStepIndex, onColse, }: ActionProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Action.d.ts.map