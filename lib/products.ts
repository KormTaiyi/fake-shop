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
    return await fetch(url)
      .then((res) => res.json() as Promise<T>)
      .catch((error) => {
        console.error(`[products] Request crashed for ${url}`, error);
        return null;
      });
  } catch (error) {
    console.error(`[products] Request crashed for ${url}`, error);
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchJson<unknown>(API_URL);
  if (isProductArray(products)) {
    return products;
  }
  return [];
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
  return null;
}
