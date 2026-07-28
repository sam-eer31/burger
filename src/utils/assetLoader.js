class AssetLoader {
  constructor() {
    this.totalCount = 0;
    this.loadedCount = 0;
    this.subscribers = [];
  }

  addTotal(count) {
    this.totalCount += count;
    this.notify();
  }

  increment() {
    this.loadedCount++;
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notify() {
    const progress = this.totalCount === 0 ? 0 : Math.min(100, Math.round((this.loadedCount / this.totalCount) * 100));
    this.subscribers.forEach(sub => sub(progress));
  }
}

export const assetLoader = new AssetLoader();
