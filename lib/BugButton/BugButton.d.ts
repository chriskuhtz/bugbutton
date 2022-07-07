/// <reference types="react" />
import "./bugButton.css";
interface DataPoint {
    key: string;
    value: string;
}
declare const BugButton: ({ condition, categories, position, url, authToken, data, }: {
    condition: boolean;
    url: string;
    authToken: string;
    position: "top" | "right" | "left" | "bottom";
    data?: DataPoint[] | undefined;
    categories?: string[] | undefined;
}) => JSX.Element;
export default BugButton;
//# sourceMappingURL=BugButton.d.ts.map