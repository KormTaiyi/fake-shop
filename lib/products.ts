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
const FALLBACK_IMAGE = "/images/herosection_img.png";
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Classic Cotton Tee",
    description: "Soft everyday t-shirt with a regular fit.",
    category: "men's clothing",
    image: FALLBACK_IMAGE,
    price: 18.99,
    rating: { rate: 4.4, count: 120 },
  },
  {
    id: 2,
    title: "Relaxed Denim Jacket",
    description: "Lightweight jacket for casual layering.",
    category: "women's clothing",
    image: FALLBACK_IMAGE,
    price: 44.5,
    rating: { rate: 4.6, count: 92 },
  },
  {
    id: 3,
    title: "Minimalist Silver Necklace",
    description: "Simple polished pendant with adjustable chain.",
    category: "jewelery",
    image: FALLBACK_IMAGE,
    price: 29.0,
    rating: { rate: 4.2, count: 67 },
  },
  {
    id: 4,
    title: "Wireless Noise-Cancel Headphones",
    description: "Over-ear headphones with up to 30 hours battery life.",
    category: "electronics",
    image: FALLBACK_IMAGE,
    price: 129.99,
    rating: { rate: 4.5, count: 205 },
  },
  {
    id: 5,
    title: "Slim Fit Chinos",
    description: "Comfort stretch chinos for work or weekend wear.",
    category: "men's clothing",
    image: FALLBACK_IMAGE,
    price: 36.0,
    rating: { rate: 4.1, count: 74 },
  },
  {
    id: 6,
    title: "Pleated Midi Dress",
    description: "Flowy midi dress with soft pleats and tie waist.",
    category: "women's clothing",
    image: FALLBACK_IMAGE,
    price: 58.75,
    rating: { rate: 4.7, count: 110 },
  },
  {
    id: 7,
    title: "Smartwatch Series X",
    description: "Fitness tracking, notifications, and heart-rate monitor.",
    category: "electronics",
    image: FALLBACK_IMAGE,
    price: 179.0,
    rating: { rate: 4.3, count: 138 },
  },
  {
    id: 8,
    title: "Gold Hoop Earrings",
    description: "Lightweight hoop earrings with secure clasp.",
    category: "jewelery",
    image: FALLBACK_IMAGE,
    price: 24.95,
    rating: { rate: 4.0, count: 53 },
  },
];
const REQUEST_HEADERS: HeadersInit = {
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
};
const REQUEST_TIMEOUT_MS = 10_000;

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Product>;
  if (
    typeof candidate.id !== "number" ||
    typeof candidate.title !== "string" ||
    typeof candidate.description !== "string" ||
    typeof candidate.category !== "string" ||
    typeof candidate.image !== "string" ||
    typeof candidate.price !== "number"
  ) {
    return false;
  }

  if (!candidate.rating || typeof candidate.rating !== "object") {
    return false;
  }

  const rating = candidate.rating as Partial<Product["rating"]>;
  return typeof rating.rate === "number" && typeof rating.count === "number";
}

function isProductArray(value: unknown): value is Product[] {
  return Array.isArray(value) && value.every(isProduct);
}

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
  const products = await fetchJson<unknown>(API_URL);
  if (isProductArray(products) && products.length > 0) {
    return products;
  }
  return FALLBACK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | null> {
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId < 1) {
    return null;
  }

  const product = await fetchJson<unknown>(`${API_URL}/${productId}`);
  if (isProduct(product)) {
    return product;
  }
  return FALLBACK_PRODUCTS.find((item) => item.id === productId) ?? null;
}
