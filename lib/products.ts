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

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: REVALIDATE_SECONDS, tags: ["products"] },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
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
