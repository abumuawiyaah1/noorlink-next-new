declare global {
  interface R2ObjectBody {
    body: ReadableStream;
    json<T>(): Promise<T>;
    httpMetadata?: { contentType?: string };
  }

  interface R2Bucket {
    get(key: string): Promise<R2ObjectBody | null>;
    put(
      key: string,
      value: ArrayBuffer | ReadableStream | string,
      options?: {
        httpMetadata?: { contentType?: string };
      },
    ): Promise<unknown>;
    delete(key: string): Promise<void>;
  }

  interface CloudflareEnv {
    SOCIAL_ASSETS?: R2Bucket;
    SOCIAL_HUB_PASSWORD?: string;
    SOCIAL_HUB_SESSION_SECRET?: string;
  }
}

export {};
