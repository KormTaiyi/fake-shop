import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Card from "@/components/ui/Card";
import { getProductById } from "@/lib/products";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <Card className="p-6">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative min-h-72 rounded-2xl bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {product.category}
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-tight">
            {product.title}
          </h1>
          <p className="mt-4 text-slate-700">{product.description}</p>
          <div className="mt-5 space-y-2">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-slate-600">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/products"
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-100"
            >
              Back to products
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
