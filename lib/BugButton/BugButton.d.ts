/// <reference types="react" />
interface DataPoint {
    key: string;
    value: string;
}
export declare const BugButton: ({ condition, categories, position, url, authToken, data, }: {
    condition: boolean;
    url: string;
    authToken: string;
    position: "top" | "right" | "left" | "bottom";
    data?: DataPoint[] | undefined;
    categories?: string[] | undefined;
}) => JSX.Element;
export {};
//# sourceMappingURL=BugButton.d.ts.map