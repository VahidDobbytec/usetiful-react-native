export type UsetifulResponse = {
    tours: Tour[];
};
export type Tour = {
    id: string;
    name: 'Vahid test';
    steps: TourStep[];
    targets: Target[];
};
export type ActionType = {
    id: string;
    styleType: 'Primary' | 'Secondary' | string;
    type: 'next' | 'close' | 'previous';
    value: string;
};
export type TourStep = {
    actions: ActionType[];
    content: string;
    id: string;
    title: string;
    type: 'modal' | 'pointer' | string;
    element: string;
};
export type Target = {
    type: 'address-simple' | string;
    url?: string;
};
export type ElementRefType = {
    key: string;
    ref: React.RefObject<any>;
};
//# sourceMappingURL=index.d.ts.map