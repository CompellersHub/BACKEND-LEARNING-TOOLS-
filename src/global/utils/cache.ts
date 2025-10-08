import NodeCache from "node-cache";

class AppCache {
  private static instance: NodeCache;

  static getInstance(): NodeCache {
    if (!AppCache.instance) {
      AppCache.instance = new NodeCache({
        stdTTL: 3600, // 1 hour cache
        checkperiod: 600, // 10 minutes cleanup
        useClones: false, // better performance
      });
    }
    return AppCache.instance;
  }

  static generateKey(prefix: string, params: Record<string, any>): string {
    return `${prefix}:${JSON.stringify(params)}`;
  }
}

export default AppCache.getInstance();
export { AppCache };
