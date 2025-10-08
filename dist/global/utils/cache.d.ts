import NodeCache from "node-cache";
declare class AppCache {
    private static instance;
    static getInstance(): NodeCache;
    static generateKey(prefix: string, params: Record<string, any>): string;
}
declare const _default: NodeCache;
export default _default;
export { AppCache };
