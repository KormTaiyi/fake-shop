import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { getProducts } from "@/lib/products";

const PRODUCTS_PER_PAGE = 6;

type ProductsPageProps = {
  searchParams: Promise<{ page?: string | string[]; category?: string | string[] }>;
};

function getSingleValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getPageNumber(rawPage: string | string[] | undefined) {
  const parsed = Number(getSingleValue(rawPage) ?? "1");

  if (!Number.isInteger(parsed) || parsed < 1) return 1;
  return parsed;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = getPageNumber(params.page);
  const selectedCategory = getSingleValue(params.category) ?? "";

  const products = await getProducts();
  const categories = Array.from(new Set(products.map((product) => product.category))).sort();
  const categoryCounts = products.reduce(
    (counts, product) => ({
      ...counts,
      [product.category]: (counts[product.category] ?? 0) + 1,
    }),
    {} as Record<string, number>
  );
  const hasSelectedCategory = categories.includes(selectedCategory);
  const categoryFilter = hasSelectedCategory ? selectedCategory : "";
  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const pageHref = (page: number, category = categoryFilter) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (category) params.set("category", category);
    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="mt-2 text-slate-600">
          Catalog data from `fakestoreapi.com`.
        </p>
      </header>

      {products.length === 0 ? (
        <Card>
          <p className="text-slate-600">Couldn&apos;t load products right now. Please try again.</p>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
          <aside className="rounded-2xl bg-slate-100 p-5 ring-1 ring-slate-200 lg:sticky lg:top-24">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-base font-semibold text-slate-900">Categories</h2>
              <p className="mt-1 text-xs text-slate-500">Only available filter is enabled.</p>
            </div>

            <div className="mt-4 space-y-2">
              <Link
                href="/products"
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-white/80"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-flex size-4 items-center justify-center rounded border text-[10px] font-bold leading-none ${
                      !categoryFilter
                        ? "border-orange-400 bg-orange-500 text-white"
                        : "border-slate-300 bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  All products
                </span>
                <span className="text-xs text-slate-500">{products.length}</span>
              </Link>

              {categories.map((category) => (
                <Link
                  key={category}
                  href={pageHref(1, category)}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-slate-700 hover:bg-white/80"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`inline-flex size-4 items-center justify-center rounded border text-[10px] font-bold leading-none ${
                        category === categoryFilter
                          ? "border-orange-400 bg-orange-500 text-white"
                          : "border-slate-300 bg-white text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    <span className="capitalize">{category}</span>
                  </span>
                  <span className="text-xs text-slate-500">{categoryCounts[category]}</span>
                </Link>
              ))}
            </div>
          </aside>

          <section className="space-y-6">
            <p className="text-sm text-slate-500">
              Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
              {categoryFilter ? ` in ${categoryFilter}` : ""}. Page {safePage} of {totalPages}
            </p>

            {filteredProducts.length === 0 ? (
              <Card>
                <p className="text-slate-700">No products found for this category.</p>
                <Link href="/products" className="mt-3 inline-block text-sm underline">
                  Clear filter
                </Link>
              </Card>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <Card key={product.id} className="p-4">
                    <div className="relative h-52 rounded-xl bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-contain p-5"
                      />
                    </div>

                    <p className="mt-4 text-xs uppercase tracking-wide text-slate-500">{product.category}</p>
                    <h2 className="mt-1 text-base font-semibold">{product.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Rating: {product.rating.rate} ({product.rating.count} reviews)
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <Link
                        href={`/products/${product.id}`}
                        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
                      >
                        Details
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredProducts.length > 0 && totalPages > 1 && (
              <nav
                aria-label="Product pagination"
                className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4"
              >
                {safePage > 1 ? (
                  <Link
                    href={pageHref(safePage - 1)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
                    Previous
                  </span>
                )}

                {pageNumbers.map((pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={pageHref(pageNumber)}
                    className={`rounded-md px-3 py-1.5 text-sm ${
                      pageNumber === safePage
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                ))}

                {safePage < totalPages ? (
                  <Link
                    href={pageHref(safePage + 1)}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
                    Next
                  </span>
                )}
              </nav>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
