import { extractPaths } from "../Assets";

export class ImageManager {
  private static instance: ImageManager;
  private imageCache: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<void>> = new Map();

  private constructor() {}

  public static getInstance(): ImageManager {
    if (!ImageManager.instance) {
      ImageManager.instance = new ImageManager();
    }
    return ImageManager.instance;
  }

  /**
   * Preloads a set of images given their sources.
   * Uses Promise.allSettled to continue even if some images fail.
   *
   * @param imageSources - The source(s) from which to extract image paths. The exact structure is determined by `extractPaths`.
   * @returns A promise that resolves when all images have been attempted.
   */
  public async preloadImages(imageSources: unknown): Promise<void> {
    const paths = (imageSources = extractPaths(imageSources));

    const preloadTasks = paths.map((src) => this.preloadImage(src));
    const results = await Promise.allSettled(preloadTasks);
    
    // Log failures but don't throw
    const failures = results.filter(r => r.status === 'rejected');
    if (failures.length > 0) {
      console.warn(`Failed to load ${failures.length} of ${paths.length} images`);
    }
  }

  private preloadImage(url: string): Promise<void> {
    if (!url) return Promise.resolve();
    // If already cached, skip
    if (this.imageCache.has(url)) return Promise.resolve();

    // If currently loading, return same promise
    if (this.loadingPromises.has(url)) return this.loadingPromises.get(url)!;

    // Otherwise, preload it with timeout
    const promise = new Promise<void>((resolve, reject) => {
      const img = new Image();
      const timeout = setTimeout(() => {
        this.loadingPromises.delete(url);
        reject(new Error(`Image load timeout: ${url}`));
      }, 10000); // 10 second timeout per image

      img.onload = () => {
        clearTimeout(timeout);
        this.imageCache.set(url, img);
        this.loadingPromises.delete(url);
        resolve();
      };

      img.onerror = (err) => {
        clearTimeout(timeout);
        console.warn("Failed to preload image:", url, err);
        this.loadingPromises.delete(url);
        reject(err);
      };

      img.src = url;
    });

    this.loadingPromises.set(url, promise);
    return promise;
  }
}
