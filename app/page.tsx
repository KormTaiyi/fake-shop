import Image from "next/image";
import Link from "next/link";
import { Headset, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import Card from "@/components/ui/Card";
import { getProducts } from "@/lib/products";

export const revalidate = 900;

const serviceHighlights = [
  {
    title: "Responsive",
    description: "Customer service available 24/7",
    Icon: Headset,
  },
  {
    title: "Secure",
    description: "Certified marketplace since 2017",
    Icon: ShieldCheck,
  },
  {
    title: "Shipping",
    description: "Free, fast, and reliable worldwide",
    Icon: Truck,
  },
  {
    title: "Transparent",
    description: "Hassle-free return policy",
    Icon: RotateCcw,
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  const totalCategories = Array.from(
    new Set(products.map((product) => product.category)),
  ).length;
  const averagePrice =
    products.length > 0
      ? products.reduce((sum, product) => sum + product.price, 0) /
        products.length
      : 0;

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl bg-[#e8ddd0] p-3 sm:p-5">
        <div className="rounded-2xl bg-[#f7f1e8] p-4 shadow-sm ring-1 ring-black/5 sm:p-6">
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Everyone&apos;s collection and style
              </h1>
              <p className="mt-4 max-w-md text-sm text-slate-600">
                This storefront uses real catalog data from Fake Store API and
                keeps the code easy for beginners to follow.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                >
                  Shop now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white/80"
                >
                  Contact us
                </Link>
              </div>

              <div className="mt-6 grid max-w-md grid-cols-3 gap-4 border-t border-black/10 pt-4">
                <div>
                  <p className="text-lg font-bold text-amber-700">
                    {products.length}+
                  </p>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Products
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-700">
                    {totalCategories}+
                  </p>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Categories
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-700">
                    ${averagePrice.toFixed(0)}+
                  </p>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Avg price
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="pointer-events-none absolute -bottom-3 -left-3 h-20 w-20 rounded-full bg-slate-900/85 blur-sm" />
              <Link
                href="/products"
                className="group relative block overflow-hidden rounded-2xl bg-[#eadfce] ring-1 ring-black/10"
              >
                <Image
                  src="/images/herosection_img.png"
                  alt="Fashion style hero image"
                  width={960}
                  height={700}
                  preload
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {serviceHighlights.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="flex items-start gap-3 rounded-xl px-1 py-2"
            >
              <div className="mt-0.5 rounded-full border border-slate-200 p-2 text-slate-700">
                <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-0.5 text-sm text-slate-600">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Featured products</h2>
            <p className="mt-1 text-sm text-slate-600">
              A few picks from the catalog.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-slate-700 underline"
          >
            See all
          </Link>
        </div>
        {featuredProducts.length === 0 ? (
          <Card>
            <p className="text-slate-600">
              Couldn&apos;t load products right now. Please try again.
            </p>
          </Card>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <Card key={product.id} className="p-4">
                <div className="relative h-44 rounded-xl bg-slate-100">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    fetchPriority={index < 2 ? "high" : "auto"}
                    className="object-contain p-4"
                  />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  {product.category}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-900">
                  {product.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-bold text-slate-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
                  >
                    View
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl bg-[#f7f1e8] px-6 py-8 text-black sm:px-8">
        <h2 className="text-2xl font-semibold">Need help with your order?</h2>
        <p className="mt-2 max-w-2xl">
          This is a demo project, but the layout follows what you&apos;d usually
          build in a real storefront.
        </p>
        <div className="mt-5">
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-gray-800 px-4 py-2 font-semibold text-gray-200"
          >
            Go to contact page
          </Link>
        </div>
      </section>
    </div>
  );
}
