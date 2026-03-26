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
const REQUEST_HEADERS: HeadersInit = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
};
const REQUEST_TIMEOUT_MS = 10_000;

function toProduct(value: unknown): Product | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const ratingValue =
    candidate.rating && typeof candidate.rating === "object"
      ? (candidate.rating as Record<string, unknown>)
      : {};

  const id = Number(candidate.id);
  const title = String(candidate.title ?? "");
  const description = String(candidate.description ?? "");
  const category = String(candidate.category ?? "");
  const image = String(candidate.image ?? "");
  const price = Number(candidate.price);
  const rate = Number(ratingValue.rate ?? 0);
  const count = Number(ratingValue.count ?? 0);

  if (
    !Number.isFinite(id) ||
    id < 1 ||
    !title ||
    !description ||
    !category ||
    !image ||
    !Number.isFinite(price)
  ) {
    return null;
  }

  return {
    id,
    title,
    description,
    category,
    image,
    price,
    rating: {
      rate: Number.isFinite(rate) ? rate : 0,
      count: Number.isFinite(count) ? count : 0,
    },
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
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
  const payload = await fetchJson<unknown>(API_URL);
  if (!Array.isArray(payload)) {
    return [];
  }

  const products = payload
    .map((item) => toProduct(item))
    .filter((item): item is Product => item !== null);
  return products;
}

export async function getProductById(id: string): Promise<Product | null> {
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId < 1) {
    return null;
  }

  const payload = await fetchJson<unknown>(`${API_URL}/${productId}`);
  return toProduct(payload);
}
