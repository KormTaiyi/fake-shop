export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

const API_URL = "https://fakestoreapi.com/products";
const REVALIDATE_SECONDS = 60 * 15;
const REQUEST_HEADERS: HeadersInit = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
};
const REQUEST_TIMEOUT_MS = 10_000;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: REVALIDATE_SECONDS, tags: ["products"] },
      headers: REQUEST_HEADERS,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.error(`[products] Request failed (${res.status}) for ${url}`);
      return null;
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      console.error(
        `[products] Unexpected response type "${contentType}" for ${url}`,
      );
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`[products] Request crashed for ${url}`, error);
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  return (await fetchJson<Product[]>(API_URL)) ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId < 1) {
    return null;
  }

  return fetchJson<Product>(`${API_URL}/${productId}`);
}
