import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

function categoryHref(category: string) {
  const params = new URLSearchParams({ category });
  return `/products?${params.toString()}`;
}

const topCategories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-slate-200 pt-10 pb-5 text-slate-600">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
        <div>
          <p className="text-2xl font-bold tracking-tight text-slate-900">
            Fake Shop
          </p>
          <p className="mt-3 max-w-sm text-sm text-slate-500">
            Beginner-friendly demo storefront built with Next.js and data from
            Fake Store API.
          </p>

          <ul className="mt-5 space-y-2.5 text-sm">
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-slate-500" aria-hidden="true" />
              <span>+855 976868568</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="text-slate-500" aria-hidden="true" />
              <span>korm.taiyi289@gmail.com</span>
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin size={16} className="text-slate-500" aria-hidden="true" />
              <span>Kouk Khleang, Sen Sok, Phnom Penh</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Quick Links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-slate-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Top Categories
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {topCategories.map((category) => (
              <li key={category}>
                <Link
                  href={categoryHref(category)}
                  className="transition-colors hover:text-slate-900"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-4">
        <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {year} Fake Shop. Demo project.</p>
          <p>Data source: fakestoreapi.com</p>
        </div>
      </div>
    </footer>
  );
}
