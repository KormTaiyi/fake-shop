import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50/90 py-4 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight">
            Fake Shop
          </Link>
        </div>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
